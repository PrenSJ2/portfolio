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
import ancientBotsImage1 from '~/assets/ancient-bots/screenshot-showcase.png';
import ancientBotsImage2 from '~/assets/ancient-bots/screenshot-mobile.png';
import ancientBotsImage3 from '~/assets/ancient-bots/image-0.png';

const title = 'Ancient Bots: Revolutionizing Social Media Posting';
const description = 'An AI-powered platform for creating stunning, viral social media content in seconds.';
const roles = ['AI Development', 'Web Development', 'UX/UI Design', 'Content Generation'];

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
              alt="Ancient Bots: Revolutionizing Social Media Posting"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>


        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>AI-Powered Content Generation</ProjectSectionHeading>
              <ProjectSectionText>
                Developed AI algorithms to analyze trends and engagement patterns, enabling the creation of viral social media content tailored to the user's brand and audience.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${ancientBotsImage1} 800w, ${ancientBotsImage1} 1920w`}
              width={800}
              height={500}
              placeholder={ancientBotsImage1}
              alt="AI content generation interface"
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Multi-Platform Support</ProjectSectionHeading>
              <ProjectSectionText>
                Built with comprehensive multi-platform support, optimizing content for Instagram, Twitter, LinkedIn, Facebook, TikTok, and more.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionColumns>
            <ProjectSectionContent>
              <ProjectTextRow>
                <ProjectSectionHeading>Smart Template System</ProjectSectionHeading>
                <ProjectSectionText>
                  Implemented hundreds of professionally designed templates optimized for each social platform, providing brand consistency across all posts.
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
                alt="Template selection interface"
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Rapid Content Generation</ProjectSectionHeading>
              <ProjectSectionText>
                Engineered to generate professional social media content in under 30 seconds, saving users hours on design tools or writer's block.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${ancientBotsImage3} 800w, ${ancientBotsImage3} 1920w`}
              width={800}
              height={500}
              placeholder={ancientBotsImage3}
              alt="Rapid content generation process"
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Viral Content Optimization</ProjectSectionHeading>
              <ProjectSectionText>
                Integrated a system that analyzes millions of successful posts to understand viral content patterns, providing data-driven suggestions for hashtags, captions, and timing.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
