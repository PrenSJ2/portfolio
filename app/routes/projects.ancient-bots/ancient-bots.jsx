import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { Fragment } from 'react';
import { media } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import styles from './ancient-bots.module.css';
import ancientBotsImage0 from '~/assets/ancient-bots/image-0.png';
import ancientBotsImage0Placeholder from '~/assets/ancient-bots/image-0.png';

const title = 'Ancient Bots: AI-Powered Social Media Content Generator';
const description = 'A web-based platform leveraging AI to transform social media strategy by generating viral posts, thumbnails, and engaging captions.';
const roles = ['AI Developer', 'Web Developer', 'UX/UI Designer', 'Content Strategist'];

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
          placeholder={ancientBotsImage0Placeholder}
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
              placeholder={ancientBotsImage0Placeholder}
              alt="Ancient Bots: AI-Powered Social Media Content Generator"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>


        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>AI-Powered Content Generation</ProjectSectionHeading>
              <ProjectSectionText>
                Deployed autonomous AI agents to generate professional social media content in under 30 seconds. AI algorithms analyze successful posts for optimal engagement and viral content patterns.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Smart Template System</ProjectSectionHeading>
              <ProjectSectionText>
                Implemented hundreds of professionally designed templates optimized for various social platforms, ensuring brand consistency across all channels.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Integration with Social Media Platforms</ProjectSectionHeading>
              <ProjectSectionText>
                Ensured seamless integration with all major social media platforms, allowing users to generate and schedule content directly from Ancient Bots.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Transparent Pricing and Free Trial</ProjectSectionHeading>
              <ProjectSectionText>
                Offered flexible pricing models and a free trial to attract a wide range of users, from solo creators to enterprise teams.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>User-Friendly Interface</ProjectSectionHeading>
              <ProjectSectionText>
                Designed an intuitive, user-friendly interface enabling users to easily customize their AI-generated content and see changes instantly.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
