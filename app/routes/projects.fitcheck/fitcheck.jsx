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
import styles from './fitcheck.module.css';
import fitcheckHero from '~/assets/fitcheck/screenshot-hero.png';
import fitcheckFull from '~/assets/fitcheck/screenshot-full.png';
import fitcheckIcon from '~/assets/fitcheck/icon.png';

const title = 'FitCheck: Privacy-First Size Recommendations';
const description = 'An open-source Chrome extension that analyses size guides on fashion sites and tells you exactly what to buy — with zero data leaving your device.';
const roles = ['Chrome Extension', 'JavaScript', 'Manifest V3', 'Open Source', 'Privacy Engineering'];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const FitCheck = () => {
  return (
    <Fragment>
      <ProjectContainer className={styles.fitcheck}>
        <ProjectBackground
          src={fitcheckHero}
          srcSet={`${fitcheckHero} 1280w, ${fitcheckHero} 2560w`}
          width={1280}
          height={800}
          placeholder={fitcheckHero}
          opacity={0.8}
        />
        <ProjectHeader
          title={title}
          description={description}
          roles={roles}
          url="https://prensj2.github.io/fitcheck-extension/"
        />

        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={`${fitcheckHero} 800w, ${fitcheckHero} 1920w`}
              width={800}
              height={500}
              placeholder={fitcheckHero}
              alt="FitCheck landing page"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Stop Wasting Money on Returns</ProjectSectionHeading>
              <ProjectSectionText>
                Clothing sizes are wildly inconsistent across brands — a medium at one retailer is a large at another. FitCheck solves this by scraping the size guide on every product page you visit, comparing it against your body measurements, and recommending the size that actually fits.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${fitcheckFull} 800w, ${fitcheckFull} 1920w`}
              width={800}
              height={1400}
              placeholder={fitcheckFull}
              alt="FitCheck features overview"
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Zero Data Leaves Your Device</ProjectSectionHeading>
              <ProjectSectionText>
                Every measurement and every size calculation happens locally in the browser using the Chrome Storage API. There are no servers, no analytics, and no tracking — the extension makes zero network requests of its own. Fully open source, so anyone can audit the code.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionColumns>
            <ProjectSectionContent>
              <ProjectTextRow>
                <ProjectSectionHeading>Smart Fit Scoring</ProjectSectionHeading>
                <ProjectSectionText>
                  Built a per-measurement fit-scoring algorithm that ranks each available size and returns a confidence percentage, flagging areas that might run tight or loose so the user can make an informed call — not just a blind pick.
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={`${fitcheckIcon} 350w, ${fitcheckIcon} 700w`}
                width={350}
                height={350}
                placeholder={fitcheckIcon}
                alt="FitCheck icon"
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Multi-Site Support</ProjectSectionHeading>
              <ProjectSectionText>
                Shipped with parsers for ASOS, Zara, Boohoo, PrettyLittleThing, and H&M — each with their own bespoke size-guide DOM structures. Designed for community contribution: adding a new retailer is a single-file change with a handful of selectors.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Built on Manifest V3</ProjectSectionHeading>
              <ProjectSectionText>
                Vanilla JavaScript and a Manifest V3 service worker keep the footprint minimal — no framework bloat, no build pipeline required to audit. A GitHub Pages landing page and automated release workflow make distribution frictionless.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
