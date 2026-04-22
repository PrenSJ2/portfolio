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
import styles from './thoth.module.css';
import thothLogo from '~/assets/thoth/thoth-logo.png';

const title = 'Thoth: The AI Scribe for GitHub';
const description = 'A Chrome extension that turns any selected text or screenshot into a well-structured GitHub issue, using GPT-4o-mini to draft titles, descriptions, and template-aware bodies.';
const roles = ['Chrome Extension', 'JavaScript', 'OpenAI API', 'GitHub API', 'AI Tooling'];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const Thoth = () => {
  return (
    <Fragment>
      <ProjectContainer className={styles.thoth}>
        <ProjectBackground
          src={thothLogo}
          srcSet={`${thothLogo} 1280w, ${thothLogo} 2560w`}
          width={1280}
          height={800}
          placeholder={thothLogo}
          opacity={0.6}
        />
        <ProjectHeader
          title={title}
          description={description}
          roles={roles}
          url="https://github.com/PrenSJ2/thoth"
          linkLabel="View on GitHub"
        />

        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={`${thothLogo} 800w, ${thothLogo} 1920w`}
              width={800}
              height={800}
              placeholder={thothLogo}
              alt="Thoth logo"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 60vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>From Highlight to Issue in One Click</ProjectSectionHeading>
              <ProjectSectionText>
                Thoth lives in the context menu. Highlight text on any webpage, right-click an image, or paste from the clipboard — and the extension generates a structured GitHub issue with an AI-written title and description, opens it in the target repo, and gets out of the way.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Template-Aware by Design</ProjectSectionHeading>
              <ProjectSectionText>
                The extension detects a repository's issue templates and feeds them to the model so the generated issue actually matches the team's conventions — no more blank-form bug reports or PMs having to reformat everything by hand.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Multi-Repository, Multi-Org</ProjectSectionHeading>
              <ProjectSectionText>
                Loads the authenticated user's personal and organization repos via the GitHub API with fine-grained scope (repo, read:org). Users pick which sources to expose, so the context menu stays focused on the repos they're actively working on.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Privacy-Respecting by Default</ProjectSectionHeading>
              <ProjectSectionText>
                API keys are stored in Chrome's encrypted sync storage and the extension only ever talks to OpenAI and GitHub directly. No intermediate servers, no telemetry — the whole pipeline is auditable from the open-source manifest.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Shipped and Automated</ProjectSectionHeading>
              <ProjectSectionText>
                GitHub Actions handles versioning, artifact builds, and automated Chrome Web Store uploads on every push to main — turning a weekend dev-tool idea into a properly released Manifest V3 extension.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
