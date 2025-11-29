import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { Fragment } from 'react';
import { media } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import styles from './ancient-bots.module.css';
import ancientBotsImage0 from '~/assets/ancient-bots/screenshot-hero.png';
import ancientBotsImage1 from '~/assets/ancient-bots/screenshot-full.png';
import ancientBotsImage2 from '~/assets/ancient-bots/screenshot-section1.png';
import ancientBotsImage3 from '~/assets/ancient-bots/screenshot-section2.png';
import ancientBotsImage4 from '~/assets/ancient-bots/screenshot-mobile.png';
import ancientBotsImage5 from '~/assets/ancient-bots/image-0.png';

const title = 'Ancient Bots: AI-Powered Social Media Content Generator';
const description = 'Transformed social media presence with AI, generating eye-catching content and posts.';
const roles = ['AI Implementation', 'UI/UX Design', 'Back-End Development', 'Front-End Development', 'Database Management', 'API Integration'];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const AncientBots = () => {
  return (
    <Fragment>
      <ProjectContainer className={styles.ancientBots}>
        <ProjectBackground
          src={ancientBotsImage0}
          srcSet={`${ancientBotsImage0} 1280w, ${ancientBotsImage0} 2560w`}
          width={1280}
          height={800}
          placeholder={ancientBotsImage0}
          opacity={0.8}
        />
        <ProjectHeader
          title={title}
          description={description}
          roles={roles}
        />

        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={`${ancientBotsImage0} 800w, ${ancientBotsImage0} 1920w`}
              width={800}
              height={500}
              placeholder={ancientBotsImage0}
              alt="Ancient Bots: AI-Powered Social Media Content Generator"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>


        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>AI-Driven Content Generation</ProjectSectionHeading>
              <ProjectSectionText>
                Developed an AI bot that understands trends and engagement patterns, providing optimal content strategies.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${ancientBotsImage1} 800w, ${ancientBotsImage1} 1920w`}
              width={800}
              height={500}
              placeholder={ancientBotsImage1}
              alt="AI bot content generation interface"
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionColumns>
            <ProjectSectionContent>
              <ProjectTextRow>
                <ProjectSectionHeading>Smart Template System</ProjectSectionHeading>
                <ProjectSectionText>
                  Created a range of professionally designed templates optimized for various social media platforms.
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={`${ancientBotsImage2} 350w, ${ancientBotsImage2} 700w`}
                width={350}
                height={750}
                placeholder={ancientBotsImage2}
                alt="Templates selection interface"
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Rapid Content Creation</ProjectSectionHeading>
              <ProjectSectionText>
                Implemented AI algorithms for generating professional social media content in under 30 seconds.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Viral Content Optimization</ProjectSectionHeading>
              <ProjectSectionText>
                Incorporated an AI that analyzes successful posts to optimize content for viral marketing and engagement.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${ancientBotsImage3} 800w, ${ancientBotsImage3} 1920w`}
              width={800}
              height={500}
              placeholder={ancientBotsImage3}
              alt="Viral content optimization dashboard"
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionColumns>
            <ProjectSectionContent>
              <ProjectTextRow>
                <ProjectSectionHeading>Brand Consistency</ProjectSectionHeading>
                <ProjectSectionText>
                  Built features to maintain brand voice and visual identity across all platforms and content.
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={`${ancientBotsImage4} 350w, ${ancientBotsImage4} 700w`}
                width={350}
                height={750}
                placeholder={ancientBotsImage4}
                alt="Brand consistency settings"
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Multi-Platform Support</ProjectSectionHeading>
              <ProjectSectionText>
                Enabled content creation optimized for all major social media platforms, ensuring perfect sizing and formatting.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
