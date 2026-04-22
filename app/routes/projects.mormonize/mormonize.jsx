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
import styles from './mormonize.module.css';
import mormonizeHero from '~/assets/mormonize/screenshot-hero.png';
import mormonizeAiChat from '~/assets/mormonize/screenshot-ai-chat.png';
import mormonizeLibrary from '~/assets/mormonize/screenshot-library.png';
import mormonizeJourneys from '~/assets/mormonize/screenshot-journeys.png';
import mormonizeChat from '~/assets/mormonize/screenshot-chat.png';
import mormonizeProfile from '~/assets/mormonize/screenshot-profile.png';

const title = 'Mormonize: AI Scripture Study Companion';
const description = 'A native iOS app that brings on-device AI, semantic search, and guided study journeys to scripture reading — all while working fully offline.';
const roles = ['iOS Development', 'SwiftUI', 'On-Device AI', 'Semantic Search', 'FastAPI Backend'];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const Mormonize = () => {
  return (
    <Fragment>
      <ProjectContainer className={styles.mormonize}>
        <ProjectBackground
          src={mormonizeHero}
          srcSet={`${mormonizeHero} 1280w, ${mormonizeHero} 2560w`}
          width={1280}
          height={800}
          placeholder={mormonizeHero}
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
              srcSet={`${mormonizeHero} 800w, ${mormonizeHero} 1920w`}
              width={800}
              height={1600}
              placeholder={mormonizeHero}
              alt="Mormonize home screen on iOS"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>On-Device AI, Zero Latency</ProjectSectionHeading>
              <ProjectSectionText>
                Integrated Apple Foundation Models to run the scripture-aware chat assistant entirely on-device. Questions about verses, context, and cross-references are answered instantly — no network round-trip, and nothing ever leaves the user's phone.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${mormonizeAiChat} 800w, ${mormonizeAiChat} 1920w`}
              width={800}
              height={1600}
              placeholder={mormonizeAiChat}
              alt="AI-powered scripture chat with citations"
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionColumns>
            <ProjectSectionContent>
              <ProjectTextRow>
                <ProjectSectionHeading>Semantic Scripture Search</ProjectSectionHeading>
                <ProjectSectionText>
                  Built a 384-dimensional vector search engine over all 41,995 verses across the Old Testament, New Testament, Book of Mormon, Doctrine and Covenants, and Pearl of Great Price — so users can find relevant passages by meaning, not just keywords.
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={`${mormonizeLibrary} 350w, ${mormonizeLibrary} 700w`}
                width={350}
                height={750}
                placeholder={mormonizeLibrary}
                alt="Scripture library browser"
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Guided Study Journeys</ProjectSectionHeading>
              <ProjectSectionText>
                Designed structured study programs that walk users through topics, themes, and books over time — with progress tracking, streaks, and badges that reward consistent engagement without gamifying the experience into something hollow.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${mormonizeJourneys} 800w, ${mormonizeJourneys} 1920w`}
              width={800}
              height={1600}
              placeholder={mormonizeJourneys}
              alt="Guided study journeys with progress tracking"
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Offline-First Architecture</ProjectSectionHeading>
              <ProjectSectionText>
                Swift Concurrency with actors, a local SQLite vector store, and Core Data-backed persistence mean the full library, search, and AI chat all work without a network. A FastAPI + PostgreSQL backend on Railway handles sync, auth (email + Sign in with Apple), and General Conference content.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Thoughtful SwiftUI Design</ProjectSectionHeading>
              <ProjectSectionText>
                Built end-to-end in SwiftUI with MVVM, async/await, and a widget extension for the home screen. Every surface — chat, journeys, annotations, profile — is designed to feel calm and focused, staying out of the way of the text itself.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${mormonizeProfile} 800w, ${mormonizeProfile} 1920w`}
              width={800}
              height={1600}
              placeholder={mormonizeProfile}
              alt="Profile and achievements screen"
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
