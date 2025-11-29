#!/usr/bin/env node

/**
 * New Project Generator Script
 *
 * Usage: npm run new-project -- --url=<website-url> --name=<project-name>
 *
 * This script:
 * 1. Scrapes the provided URL for content and images
 * 2. Uses OpenAI GPT-4 to generate project content
 * 3. Downloads relevant images
 * 4. Creates a new project route with all necessary files
 *
 * Requirements:
 * - OPENAI_API_KEY environment variable must be set
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};

  for (const arg of args) {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      parsed[key] = value || true;
    }
  }

  return parsed;
}

// Fetch HTML content from URL
async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Handle redirects
        const redirectUrl = new URL(response.headers.location, url).href;
        fetchPage(redirectUrl).then(resolve).catch(reject);
        return;
      }

      let data = '';
      response.on('data', (chunk) => (data += chunk));
      response.on('end', () => resolve(data));
    });

    request.on('error', reject);
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Extract text content and images from HTML
function parseHTML(html, baseUrl) {
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Extract meta description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const description = descMatch ? descMatch[1].trim() : '';

  // Extract headings
  const headings = [];
  const headingRegex = /<h[1-6][^>]*>([^<]*(?:<[^>]+>[^<]*)*)<\/h[1-6]>/gi;
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, '').trim();
    if (text) headings.push(text);
  }

  // Extract paragraphs
  const paragraphs = [];
  const pRegex = /<p[^>]*>([^<]*(?:<[^>]+>[^<]*)*)<\/p>/gi;
  while ((match = pRegex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, '').trim();
    if (text && text.length > 20) paragraphs.push(text);
  }

  // Extract images
  const images = [];
  const imgRegex = /<img[^>]*src=["']([^"']+)["'][^>]*>/gi;
  while ((match = imgRegex.exec(html)) !== null) {
    let imgUrl = match[1];
    // Convert relative URLs to absolute
    if (!imgUrl.startsWith('http')) {
      imgUrl = new URL(imgUrl, baseUrl).href;
    }
    // Filter out small images, icons, and tracking pixels
    if (!imgUrl.includes('icon') && !imgUrl.includes('logo') && !imgUrl.includes('pixel')) {
      images.push(imgUrl);
    }
  }

  // Also check for og:image
  const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i);
  if (ogImageMatch) {
    let ogImage = ogImageMatch[1];
    if (!ogImage.startsWith('http')) {
      ogImage = new URL(ogImage, baseUrl).href;
    }
    images.unshift(ogImage); // Add to beginning as it's usually the main image
  }

  // Extract body text (simplified)
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyText = bodyMatch
    ? bodyMatch[1]
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 5000)
    : '';

  return {
    title,
    description,
    headings: headings.slice(0, 10),
    paragraphs: paragraphs.slice(0, 20),
    images: [...new Set(images)].slice(0, 10), // Dedupe and limit
    bodyText,
  };
}

// Call OpenAI API to generate project content
async function generateContent(scrapedData, projectName, url) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }

  const prompt = `You are helping create a portfolio project page. Based on the following scraped website data, generate content for a project showcase.

Website URL: ${url}
Title: ${scrapedData.title}
Description: ${scrapedData.description}
Headings: ${scrapedData.headings.join(', ')}
Sample paragraphs: ${scrapedData.paragraphs.slice(0, 5).join('\n')}
Body text excerpt: ${scrapedData.bodyText.slice(0, 2000)}

Generate a JSON response with the following structure:
{
  "title": "A compelling project title (max 80 chars)",
  "description": "A 1-2 sentence description of the project (max 200 chars)",
  "roles": ["Role 1", "Role 2", "Role 3", "Role 4"], // 3-6 roles/technologies used
  "sections": [
    {
      "heading": "Section heading",
      "content": "2-3 sentences describing this aspect of the project",
      "layout": "text", // "text" for text only, "image" for text with full-width image, "columns" for text with sidebar images
      "imageAlt": "Description of what the image shows" // only if layout is "image" or "columns"
    }
  ], // 4-6 sections, alternate between layouts for visual variety. At least 2 should have images.
  "homePage": {
    "title": "Short catchy title for home page (max 50 chars)",
    "description": "One sentence description for home page preview (max 120 chars)",
    "modelType": "laptop" // or "phone" - choose "phone" if it's primarily a mobile app, otherwise "laptop"
  }
}

Make the content professional and highlight the technical achievements and impact. Focus on what was built and the outcomes.
For modelType: use "phone" only if this is primarily a mobile app (iOS/Android). For websites, web apps, dashboards, SaaS products, use "laptop".
For sections: create visually rich pages by using "image" layout for sections where showing a screenshot would help, and "columns" for feature highlights.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a technical writer helping create portfolio content. Always respond with valid JSON only, no markdown.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  try {
    return JSON.parse(content);
  } catch {
    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Failed to parse OpenAI response as JSON');
  }
}

// Download an image
async function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        const redirectUrl = new URL(response.headers.location, url).href;
        downloadImage(redirectUrl, destPath).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(destPath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(destPath);
      });
      fileStream.on('error', reject);
    });

    request.on('error', reject);
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Download timeout'));
    });
  });
}

// Get file extension from URL or content type
function getImageExtension(url) {
  const urlPath = new URL(url).pathname;
  const ext = path.extname(urlPath).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
    return ext;
  }
  return '.jpg'; // Default
}

// Take screenshots of the website using Puppeteer
async function takeScreenshots(url, assetsDir) {
  const screenshots = [];

  console.log('   Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    // Desktop viewport for main screenshots
    await page.setViewport({ width: 1920, height: 1080 });

    console.log('   Loading page...');
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });

    // Wait a bit for any animations/lazy loading
    await new Promise((r) => setTimeout(r, 2000));

    // Screenshot 1: Hero/above the fold (desktop)
    const heroPath = path.join(assetsDir, 'screenshot-hero.png');
    await page.screenshot({
      path: heroPath,
      type: 'png',
    });
    screenshots.push({ filename: 'screenshot-hero.png', type: 'hero' });
    console.log('   ✅ Captured: hero screenshot (desktop)');

    // Screenshot 2: Full page (desktop) - useful for showing the whole site
    const fullPath = path.join(assetsDir, 'screenshot-full.png');
    await page.screenshot({
      path: fullPath,
      type: 'png',
      fullPage: true,
    });
    screenshots.push({ filename: 'screenshot-full.png', type: 'full' });
    console.log('   ✅ Captured: full page screenshot');

    // Scroll down and take another screenshot (middle section)
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await new Promise((r) => setTimeout(r, 1000));
    const section1Path = path.join(assetsDir, 'screenshot-section1.png');
    await page.screenshot({
      path: section1Path,
      type: 'png',
    });
    screenshots.push({ filename: 'screenshot-section1.png', type: 'section' });
    console.log('   ✅ Captured: section 1 screenshot');

    // Scroll more and take another screenshot
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await new Promise((r) => setTimeout(r, 1000));
    const section2Path = path.join(assetsDir, 'screenshot-section2.png');
    await page.screenshot({
      path: section2Path,
      type: 'png',
    });
    screenshots.push({ filename: 'screenshot-section2.png', type: 'section' });
    console.log('   ✅ Captured: section 2 screenshot');

    // Mobile viewport screenshot
    await page.setViewport({ width: 375, height: 812 });
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });
    await new Promise((r) => setTimeout(r, 2000));

    const mobilePath = path.join(assetsDir, 'screenshot-mobile.png');
    await page.screenshot({
      path: mobilePath,
      type: 'png',
    });
    screenshots.push({ filename: 'screenshot-mobile.png', type: 'mobile' });
    console.log('   ✅ Captured: mobile screenshot');

  } catch (error) {
    console.log(`   ⚠️  Screenshot error: ${error.message}`);
  } finally {
    await browser.close();
  }

  return screenshots;
}

// Create slug from project name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Convert slug to camelCase for JS variable names
function toCamelCase(slug) {
  return slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

// Generate the JSX route file
function generateJSXFile(projectName, slug, content, allImages) {
  const sections = content.sections || [];
  const varName = toCamelCase(slug);

  // Find specific image types
  const heroImage = allImages.find((img) => img.type === 'hero') || allImages[0];
  const sectionImages = allImages.filter((img) => img.type === 'section' || img.type === 'full');
  const mobileImage = allImages.find((img) => img.type === 'mobile');

  // Create image imports
  const imageImportStatements = allImages
    .map((img, i) => {
      const imgVarName = `${varName}Image${i}`;
      return `import ${imgVarName} from '~/assets/${slug}/${img.filename}';`;
    })
    .join('\n');

  // Generate sections with images distributed throughout
  let imageIndex = 1; // Start at 1 since 0 is the hero
  const sectionComponents = sections
    .map((section, index) => {
      const isLight = index % 2 === 1;
      const lightProp = isLight ? ' light' : '';
      const layout = section.layout || 'text';
      const imageAlt = section.imageAlt || section.heading;

      // Check if this section should have an image
      const hasImage = (layout === 'image' || layout === 'columns') && imageIndex < allImages.length;
      const currentImageVar = hasImage ? `${varName}Image${imageIndex}` : null;
      if (hasImage) imageIndex++;

      if (layout === 'columns' && hasImage) {
        // Column layout with sidebar image
        return `
        <ProjectSection${lightProp}>
          <ProjectSectionColumns>
            <ProjectSectionContent>
              <ProjectTextRow>
                <ProjectSectionHeading>${section.heading}</ProjectSectionHeading>
                <ProjectSectionText>
                  ${section.content}
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={\`\${${currentImageVar}} 350w, \${${currentImageVar}} 700w\`}
                width={350}
                height={750}
                placeholder={${currentImageVar}}
                alt="${imageAlt.replace(/"/g, '\\"')}"
                sizes={\`(max-width: \${media.mobile}px) 200px, 343px\`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>`;
      } else if (layout === 'image' && hasImage) {
        // Full width image section
        return `
        <ProjectSection${lightProp}>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>${section.heading}</ProjectSectionHeading>
              <ProjectSectionText>
                ${section.content}
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={\`\${${currentImageVar}} 800w, \${${currentImageVar}} 1920w\`}
              width={800}
              height={500}
              placeholder={${currentImageVar}}
              alt="${imageAlt.replace(/"/g, '\\"')}"
              sizes={\`(max-width: \${media.mobile}px) 100vw, 80vw\`}
            />
          </ProjectSectionContent>
        </ProjectSection>`;
      } else {
        // Text only section
        return `
        <ProjectSection${lightProp}>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>${section.heading}</ProjectSectionHeading>
              <ProjectSectionText>
                ${section.content}
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>`;
      }
    })
    .join('\n');

  const backgroundVar = heroImage ? `${varName}Image0` : 'placeholderBg';

  const heroImageSection = heroImage
    ? `
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={\`\${${varName}Image0} 800w, \${${varName}Image0} 1920w\`}
              width={800}
              height={500}
              placeholder={${varName}Image0}
              alt="${content.title.replace(/"/g, '\\"')}"
              sizes={\`(max-width: \${media.mobile}px) 100vw, (max-width: \${media.tablet}px) 90vw, 80vw\`}
            />
          </ProjectSectionContent>
        </ProjectSection>
`
    : '';

  const lines = [
    `import { Footer } from '~/components/footer';`,
    `import { Image } from '~/components/image';`,
    `import {`,
    `  ProjectBackground,`,
    `  ProjectContainer,`,
    `  ProjectHeader,`,
    `  ProjectImage,`,
    `  ProjectSection,`,
    `  ProjectSectionColumns,`,
    `  ProjectSectionContent,`,
    `  ProjectSectionHeading,`,
    `  ProjectSectionText,`,
    `  ProjectTextRow,`,
    `} from '~/layouts/project';`,
    `import { Fragment } from 'react';`,
    `import { media } from '~/utils/style';`,
    `import { baseMeta } from '~/utils/meta';`,
    `import styles from './${slug}.module.css';`,
  ];

  if (imageImportStatements) {
    lines.push(imageImportStatements);
  }

  lines.push('');
  lines.push(`const title = '${content.title.replace(/'/g, "\\'")}';`);
  lines.push(`const description = '${content.description.replace(/'/g, "\\'")}';`);
  lines.push(`const roles = [${content.roles.map((r) => `'${r.replace(/'/g, "\\'")}'`).join(', ')}];`);
  lines.push('');
  lines.push(`export const meta = () => {`);
  lines.push(`  return baseMeta({ title, description, prefix: 'Projects' });`);
  lines.push(`};`);
  lines.push('');
  lines.push(`export const ${projectName} = () => {`);
  lines.push(`  return (`);
  lines.push(`    <Fragment>`);
  lines.push(`      <ProjectContainer className={styles.${varName}}>`);
  lines.push(`        <ProjectBackground`);
  lines.push(`          src={${backgroundVar}}`);
  lines.push('          srcSet={`${' + backgroundVar + '} 1280w, ${' + backgroundVar + '} 2560w`}');
  lines.push(`          width={1280}`);
  lines.push(`          height={800}`);
  lines.push(`          placeholder={${backgroundVar}}`);
  lines.push(`          opacity={0.8}`);
  lines.push(`        />`);
  lines.push(`        <ProjectHeader`);
  lines.push(`          title={title}`);
  lines.push(`          description={description}`);
  lines.push(`          roles={roles}`);
  lines.push(`        />`);

  if (heroImageSection) {
    lines.push(heroImageSection);
  }

  lines.push(sectionComponents);
  lines.push(`      </ProjectContainer>`);
  lines.push(`      <Footer />`);
  lines.push(`    </Fragment>`);
  lines.push(`  );`);
  lines.push(`};`);
  lines.push('');

  return lines.join('\n');
}

// Generate CSS module file
function generateCSSFile(slug) {
  const varName = toCamelCase(slug);
  return `.${varName} {
  /* Project-specific styles */
}

.columns {
  margin: 20px 0 60px;
}

.sidebarImages {
  display: grid;
  grid-template-columns: repeat(6, [col] 1fr);
  align-items: center;

  @media (--mediaTablet) {
    padding: 0 80px;
    margin-top: 60px;
  }

  @media (--mediaMobile) {
    padding: 0 20px;
    margin-top: 40px;
  }
}

.sidebarImage {
  &:first-child {
    grid-column: col 1 / span 4;
    grid-row: 1;
    position: relative;
    top: 5%;
    opacity: 0.4;
  }

  &:last-child {
    grid-column: col 3 / span 4;
    grid-row: 1;
    position: relative;
    top: -5%;
  }
}
`;
}

// Generate route.js file
function generateRouteFile(projectName, slug) {
  return `export { ${projectName} as default, meta } from './${slug}';
`;
}

// Update home.jsx to add new project at the top
function updateHomePage(slug, content, heroImage) {
  const homeJsxPath = path.join(rootDir, 'app', 'routes', 'home', 'home.jsx');
  let homeContent = fs.readFileSync(homeJsxPath, 'utf-8');

  const varName = toCamelCase(slug);
  const homePage = content.homePage || {
    title: content.title,
    description: content.description,
    modelType: 'laptop',
  };

  // Use the hero screenshot filename
  const imageFilename = heroImage ? heroImage.filename : 'screenshot-hero.png';

  // Add import for the new project's texture
  const newImport = `import ${varName}Texture from '~/assets/${slug}/${imageFilename}';
import ${varName}TexturePlaceholder from '~/assets/${slug}/${imageFilename}';`;

  // Find the last texture import and add after it
  const lastImportMatch = homeContent.match(/import [a-zA-Z]+Texture(?:Placeholder)? from '~\/assets\/[^']+';/g);
  if (lastImportMatch) {
    const lastImport = lastImportMatch[lastImportMatch.length - 1];
    homeContent = homeContent.replace(lastImport, `${lastImport}\n${newImport}`);
  }

  // Count existing project refs and add new one
  const projectRefMatches = homeContent.match(/const project(One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten) = useRef\(\);/g) || [];
  const refNames = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
  const newRefName = refNames[projectRefMatches.length];
  const lastRefName = refNames[projectRefMatches.length - 1];

  // Add new ref after details ref
  homeContent = homeContent.replace(
    `const project${lastRefName} = useRef();`,
    `const project${lastRefName} = useRef();\n  const project${newRefName} = useRef();`
  );

  // Update sections array to include new project
  const sectionsRegex = /const sections = \[([^\]]+)\];/;
  const sectionsMatch = homeContent.match(sectionsRegex);
  if (sectionsMatch) {
    const currentSections = sectionsMatch[1].trim();
    // Insert new project ref before details
    const updatedSections = currentSections.replace(
      /, details/,
      `, project${newRefName}, details`
    );
    homeContent = homeContent.replace(sectionsRegex, `const sections = [${updatedSections}];`);
  }

  // Find existing ProjectSummary components and shift their indices
  // We need to increment all existing project indices by 1
  // Process in reverse order to avoid replacing index={1} before index={10}
  for (let i = projectRefMatches.length; i >= 1; i--) {
    const oldIndex = i;
    const newIndex = i + 1;

    // Replace id="project-X" with id="project-X+1"
    const oldId = `id="project-${oldIndex}"`;
    const newId = `id="project-${newIndex}"`;
    homeContent = homeContent.replace(new RegExp(oldId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newId);

    // Replace index={X} with index={X+1} - be careful to match exactly
    const oldIndexProp = `index={${oldIndex}}`;
    const newIndexProp = `index={${newIndex}}`;
    // Use word boundary-like matching to avoid partial replacements
    homeContent = homeContent.replace(new RegExp(`index=\\{${oldIndex}\\}`, 'g'), `index={${newIndex}}`);
  }

  // Also update ref assignments (projectOne -> projectTwo, etc.) but we need to be careful
  // Actually, let's just add the new project and update the indices, keeping existing refs

  // Determine alternate prop based on position (first project is not alternate)
  const isAlternate = false; // New project is always first, so not alternate

  // Generate phone or laptop texture config
  let textureConfig;
  if (homePage.modelType === 'phone') {
    textureConfig = `{
            srcSet: \`\${${varName}Texture} 375w, \${${varName}Texture} 750w\`,
            placeholder: ${varName}TexturePlaceholder,
          }`;
  } else {
    textureConfig = `{
              srcSet: \`\${${varName}Texture} 800w, \${${varName}Texture} 1920w\`,
              placeholder: ${varName}TexturePlaceholder,
            }`;
  }

  // Create the new ProjectSummary component
  const newProjectSummary = `<ProjectSummary
        id="project-1"
        sectionRef={project${newRefName}}
        visible={visibleSections.includes(project${newRefName}.current)}
        index={1}
        title="${homePage.title.replace(/"/g, '\\"')}"
        description="${homePage.description.replace(/"/g, '\\"')}"
        buttonText="View project"
        buttonLink="/projects/${slug}"
        model={{
          type: '${homePage.modelType}',
          alt: '${homePage.title.replace(/'/g, "\\'")}',
          textures: [
            ${textureConfig},
          ],
        }}
      />
      `;

  // Insert new ProjectSummary before the first existing one
  homeContent = homeContent.replace(
    /<ProjectSummary\s+id="project-2"/,
    `${newProjectSummary}<ProjectSummary
        id="project-2"`
  );

  fs.writeFileSync(homeJsxPath, homeContent);
  return true;
}

// Main function
async function main() {
  const args = parseArgs();

  if (!args.url) {
    console.error('Usage: npm run new-project -- --url=<website-url> [--name=<project-name>]');
    console.error('');
    console.error('Options:');
    console.error('  --url    The URL of the website to scrape (required)');
    console.error('  --name   The project name (optional, will be derived from URL if not provided)');
    console.error('');
    console.error('Environment:');
    console.error('  OPENAI_API_KEY must be set');
    process.exit(1);
  }

  const url = args.url;

  console.log(`\n🔍 Scraping ${url}...\n`);

  // Fetch and parse the page
  let html;
  try {
    html = await fetchPage(url);
  } catch (error) {
    console.error(`❌ Failed to fetch page: ${error.message}`);
    process.exit(1);
  }

  const scrapedData = parseHTML(html, url);
  console.log(`✅ Found: "${scrapedData.title}"`);
  console.log(`   ${scrapedData.images.length} images, ${scrapedData.paragraphs.length} paragraphs\n`);

  // Derive project name
  let projectName = args.name;
  if (!projectName) {
    // Try to create from title or URL
    projectName = scrapedData.title
      ? scrapedData.title.split(/[|\-–—]/)[0].trim()
      : new URL(url).hostname.replace(/^www\./, '').split('.')[0];
  }

  // Convert to PascalCase for component name
  const componentName = projectName
    .split(/[\s-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

  const slug = createSlug(projectName);

  console.log(`📝 Project name: ${componentName}`);
  console.log(`   Slug: ${slug}\n`);

  // Generate content with OpenAI
  console.log('🤖 Generating content with OpenAI GPT-4...\n');
  let content;
  try {
    content = await generateContent(scrapedData, projectName, url);
  } catch (error) {
    console.error(`❌ Failed to generate content: ${error.message}`);
    process.exit(1);
  }

  console.log(`✅ Generated: "${content.title}"`);
  console.log(`   Roles: ${content.roles.join(', ')}`);
  console.log(`   Sections: ${content.sections.length}\n`);

  // Create directories
  const projectDir = path.join(rootDir, 'app', 'routes', `projects.${slug}`);
  const assetsDir = path.join(rootDir, 'app', 'assets', slug);

  if (fs.existsSync(projectDir)) {
    console.error(`❌ Project directory already exists: ${projectDir}`);
    process.exit(1);
  }

  fs.mkdirSync(projectDir, { recursive: true });
  fs.mkdirSync(assetsDir, { recursive: true });

  console.log(`📁 Created directories:`);
  console.log(`   ${projectDir}`);
  console.log(`   ${assetsDir}\n`);

  // Take screenshots of the website
  console.log('📸 Taking screenshots...\n');
  const screenshots = await takeScreenshots(url, assetsDir);

  // Also try to download any images found on the page as backup
  console.log('\n📥 Downloading additional images...\n');
  const downloadedImages = [];

  for (let i = 0; i < Math.min(scrapedData.images.length, 3); i++) {
    const imgUrl = scrapedData.images[i];
    const ext = getImageExtension(imgUrl);
    const filename = `image-${i}${ext}`;
    const destPath = path.join(assetsDir, filename);

    try {
      await downloadImage(imgUrl, destPath);
      downloadedImages.push({ url: imgUrl, filename, path: destPath });
      console.log(`   ✅ Downloaded: ${filename}`);
    } catch (error) {
      console.log(`   ⚠️  Failed to download ${imgUrl}: ${error.message}`);
    }
  }

  // Combine screenshots and downloaded images
  const allImages = [...screenshots, ...downloadedImages];
  console.log('');

  // Generate files
  console.log('📄 Generating project files...\n');

  const jsxContent = generateJSXFile(componentName, slug, content, allImages);
  const cssContent = generateCSSFile(slug);
  const routeContent = generateRouteFile(componentName, slug);

  fs.writeFileSync(path.join(projectDir, `${slug}.jsx`), jsxContent);
  fs.writeFileSync(path.join(projectDir, `${slug}.module.css`), cssContent);
  fs.writeFileSync(path.join(projectDir, 'route.js'), routeContent);

  console.log(`   ✅ Created: ${slug}.jsx`);
  console.log(`   ✅ Created: ${slug}.module.css`);
  console.log(`   ✅ Created: route.js\n`);

  // Update home page
  console.log('🏠 Adding project to home page...\n');
  try {
    // Find the hero screenshot to use for the home page
    const heroImage = allImages.find((img) => img.type === 'hero') || allImages[0];
    updateHomePage(slug, content, heroImage);
    console.log('   ✅ Updated home.jsx\n');
  } catch (error) {
    console.log(`   ⚠️  Failed to update home page: ${error.message}`);
    console.log('   You may need to manually add the project to home.jsx\n');
  }

  console.log('🎉 Project created successfully!\n');
  console.log(`   View at: /projects/${slug}`);
  console.log(`   Home page: Project added as first item`);
  console.log(`   Edit: app/routes/projects.${slug}/${slug}.jsx\n`);
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
