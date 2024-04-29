
import teamworksAppLarge from '~/assets/teamworks/Website-home-large.png';
import teamworksAppPlaceholder from '~/assets/teamworks/Website-home-placeholder.png';
import teamworksApp from '~/assets/teamworks/Website-home-large.png';
import teamworksMobile from '~/assets/teamworks/app-home.png';
import teamworksMobilePlaceholder from '~/assets/teamworks/app-home-placeholder.png';
import teamworksMobileBookings from '~/assets/teamworks/app-bookings.png';
import teamworksBackgroundPlaceholder from '~/assets/teamworks/background-suite5-placeholder.jpg';
import teamworksBackground from '~/assets/teamworks/background-suite5.jpg';
import teamworksIrlPlaceholder from '~/assets/teamworks/success-placeholder.jpg';
import teamworksIrl from '~/assets/teamworks/success.jpg';
import teamworksSlidesLarge from '~/assets/stripe-dashboard-large.png';
import teamworksSlidesPlaceholder from '~/assets/stripe-dashboard-planceholder.png';
import teamworksSlides from '~/assets/stripe-dashboard.png';
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
import styles from './teamworks.module.css';
import { ThemeProvider } from '~/components/theme-provider/index.js';
import imageSprBackgroundOffice from '~/assets/office.jpg';
import imageSprBackgroundOfficePlaceholder from '~/assets/office-large-placeholder.jpg';
import videoSprMotion from '~/assets/tw_crossplatform.mp4';
import videoSprMotionPlaceholder from '~/assets/spr-motion-placeholder.jpg';

const title = 'Teamworks: Executive Office Space Rental Service and App';
const description = 'This project showcases the development of Teamworks, a tailored solution for managing rental bookings with user-specific customizations.';
const roles = ['Product Management', 'Custom Solutions Development', 'Payment Systems Integration', 'User Experience Design', 'Mobile Appication Development', 'Website Development'];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const Teamworks = () => {
  return (
    <Fragment>
      <ProjectContainer className={styles.teamworks}>
        <ProjectBackground
          src={teamworksBackground}
          srcSet={`${teamworksBackground} 1280w, ${teamworksBackground} 2560w`}
          width={1280}
          height={800}
          placeholder={teamworksBackgroundPlaceholder}
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
              srcSet={`${teamworksApp} 800w, ${teamworksAppLarge} 1920w`}
              width={800}
              height={500}
              placeholder={teamworksAppPlaceholder}
              alt="Overview of the Teamworks web application."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Customization at Core</ProjectSectionHeading>
              <ProjectSectionText>
                Adjusting the scope based on weekly discussions with the client, Teamworks was tailored with specific customizations, including advanced payment options and user management, to cater to unique client needs.
              </ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={`${teamworksMobileBookings} 350w, ${teamworksMobileBookings} 700w`}
                width={350}
                height={750}
                placeholder={teamworksMobilePlaceholder}
                alt="Sidebar design showcasing user management."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={`${teamworksMobile} 350w, ${teamworksMobile} 700w`}
                width={350}
                height={750}
                placeholder={teamworksMobilePlaceholder}
                alt="Annotations for user activity on bookings."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Stripe Integration</ProjectSectionHeading>
              <ProjectSectionText>
                Teamworks was integrated with Stripe to facilitate secure and efficient payment processing. This integration allowed for seamless transactions and enhanced user experience.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${teamworksSlides} 800w, ${teamworksSlidesLarge} 1920w`}
              width={800}
              height={500}
              placeholder={teamworksSlidesPlaceholder}
              alt="Stripe Dashboard features for Teamworks."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ThemeProvider theme="dark" data-invert>
          <ProjectSection
            backgroundOverlayOpacity={0.5}
            backgroundElement={
              <Image
                srcSet={`${imageSprBackgroundOffice} 1080w`}
                width={1080}
                height={607}
                placeholder={imageSprBackgroundOfficePlaceholder}
                alt="A dramatic ocean scene with lava forming a new land mass."
                sizes="100vw"
              />
            }
          >
            <ProjectSectionColumns width="full">
              <ProjectSectionContent width="full">
                <ProjectTextRow width="s">
                  <ProjectSectionHeading>Developed Across Platforms</ProjectSectionHeading>
                  <ProjectSectionText>
                    Teamworks was designed and developed to be accessible across multiple platforms, including desktop, mobile, and tablet. This ensured a seamless user experience across devices.
                  </ProjectSectionText>
                </ProjectTextRow>
              </ProjectSectionContent>
              <Image
                raised
                className={styles.video}
                srcSet={`${videoSprMotion} 1920w`}
                width={1280}
                height={800}
                placeholder={videoSprMotionPlaceholder}
                alt="A learning designer building and deploying an interactive lesson on volcanism using the app."
                sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
              />
            </ProjectSectionColumns>
          </ProjectSection>
        </ThemeProvider>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Project Outcomes</ProjectSectionHeading>
              <ProjectSectionText>
                Teamworks has successfully facilitated enhanced collaboration and efficiency for rental booking management, evidenced by positive feedback from both the client side and end-users. The platform stands as a testament to the impactful integration of custom solutions and user-centric design.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              src={teamworksIrl}
              width={940}
              height={500}
              placeholder={teamworksIrlPlaceholder}
              alt="Real-life implementation of Teamworks at a client site."
            />
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
