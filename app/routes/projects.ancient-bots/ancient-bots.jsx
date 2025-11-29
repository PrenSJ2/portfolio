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
import ancientBotsImage1 from '~/assets/ancient-bots/screenshot-mobile.png';
import ancientBotsImage2 from '~/assets/ancient-bots/image-0.png';

const title = 'Ancient Bots: AI-Powered Social Media Content Generator';
const description = 'An intelligent content creation platform that generates stunning social media posts using AI.';
const roles = ['AI Developer', 'UX/UI Designer', 'Product Manager', 'Marketing Strategist'];

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
              <ProjectSectionHeading>Overview</ProjectSectionHeading>
              <ProjectSectionText>
                Ancient Bots is an AI-driven platform that generates engaging social media content. It has been designed to assist creators, marketers, and businesses in creating eye-catching posts in seconds.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>AI-Powered Content Generation</ProjectSectionHeading>
              <ProjectSectionText>
                Leverages cutting-edge AI to create viral social media content, understanding engagement patterns and optimal content strategies.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${ancientBotsImage1} 800w, ${ancientBotsImage1} 1920w`}
              width={800}
              height={500}
              placeholder={ancientBotsImage1}
              alt="AI creating social media content"
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionColumns>
            <ProjectSectionContent>
              <ProjectTextRow>
                <ProjectSectionHeading>Smart Template System</ProjectSectionHeading>
                <ProjectSectionText>
                  Offers hundreds of professionally designed templates optimized for each social platform, ensuring brand consistency and design automation.
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
                alt="Smart template system"
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Lightning Fast Generation</ProjectSectionHeading>
              <ProjectSectionText>
                Capable of generating professional social media content in under 30 seconds, saving users from hours spent on design tools or struggling with writer's block.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Pricing</ProjectSectionHeading>
              <ProjectSectionText>
                Flexible pricing starting with a free trial. Offers different plans catering to individuals, growing brands, and larger organizations.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
