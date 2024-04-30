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
import styles from './voulez-vous.module.css';
import { ThemeProvider } from '~/components/theme-provider/index.js';
import voulezVousBackground from '~/assets/teamworks/background-suite5.jpg';
import voulezVousBackgroundPlaceholder from '~/assets/teamworks/background-suite5-placeholder.jpg';
import voulezVousApp from '~/assets/teamworks/Website-home-large.png';
import voulezVousAppLarge from '~/assets/teamworks/Website-home-large.png';
import voulezVousAppPlaceholder from '~/assets/teamworks/Website-home-placeholder.png';
import voulezVousMobileBookings from '~/assets/teamworks/app-bookings.png';
import voulezVousMobilePlaceholder from '~/assets/teamworks/app-home-placeholder.png';
import voulezVousMobile from '~/assets/teamworks/app-home.png';
import voulezVousSlides from '~/assets/slice-slides.jpg';
import voulezVousSlidesLarge from '~/assets/slice-slides-large.jpg';
import voulezVousSlidesPlaceholder from '~/assets/slice-slides-placeholder.jpg';
import voulezVousIrl from '~/assets/teamworks/success.jpg';
import voulezVousIrlPlaceholder from '~/assets/teamworks/success-placeholder.jpg';
import voulezVousBackgroundBar from '~/assets/slice-background-bar.jpg';
import voulezVousBackgroundBarPlaceholder from '~/assets/slice-background-bar-placeholder.jpg';
import voulezVousAnnotation from '~/assets/slice-annotation.png';
import voulezVousAnnotationLarge from '~/assets/slice-annotation-large.png';
import voulezVousAnnotationPlaceholder from '~/assets/slice-annotation-placeholder.png';



const title = 'Voulez Vous: Cocktail Recipe App with Alcohol Scanner';
const description = 'A mobile app that serves as a knowledge base and inventory for old and new cocktails. It allows users to learn and discover different types of cocktails and how to make them.\n' +
  'The app also has a unique feature, the cocktail scanner, which allows users to scan bottles of alcohol in their inventory and suggests cocktails that can be made with those ingredients. This feature\n' +
  'uses an AI model trained using StableDiffusion and Fooocus to generate realistic photos of the suggested cocktails. The app is built using Flutter and FlutterFlow, and it is designed to provide\n' +
  'users with a fun and interactive way to discover new cocktails and manage their inventory.';
const roles = ['AI Developer', 'Data Scientist', 'App Developer', 'User Experience Design'];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const VoulezVous = () => {
  return (
    <Fragment>
      <ProjectContainer className={styles.voulezvous}>
        <ProjectBackground
          src={voulezVousBackground}
          srcSet={`${voulezVousBackground} 1280w, ${voulezVousBackground} 2560w`}
          width={1280}
          height={800}
          placeholder={voulezVousBackgroundPlaceholder}
          opacity={0.8}
        />
        <ProjectHeader
          title={title}
          description={description}
          roles={roles}
        />
      </ProjectContainer>

        {/*Image Section*/}
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={`${voulezVousApp} 800w, ${voulezVousAppLarge} 1920w`}
              width={800}
              height={500}
              placeholder={voulezVousAppPlaceholder}
              alt="Overview of the Voulez Vous application."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        {/*Text Section with double right images*/}
        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Introduction</ProjectSectionHeading>
              <ProjectSectionText>
                Are you a cocktail enthusiast who loves to discover new recipes and manage your inventory of alcohol bottles? Look no further than our Cocktail Inventory App! This app is a comprehensive knowledge
                base that covers old and new cocktails, as well as an AI-powered scanner to help you identify and store the alcohol bottles in your collection.
              </ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={`${voulezVousMobileBookings} 350w, ${voulezVousMobileBookings} 700w`}
                width={350}
                height={750}
                placeholder={voulezVousMobilePlaceholder}
                alt="Voulez Vous login page view"
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={`${voulezVousMobile} 350w, ${voulezVousMobile} 700w`}
                width={350}
                height={750}
                placeholder={voulezVousMobilePlaceholder}
                alt="Voulez vous home page view"
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

         {/*Text above image section*/}
         <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Features</ProjectSectionHeading>
              <ProjectSectionText>
                The core functionality of the app is its vast library of cocktails, complete with their recipes, ingredients, and instructions. You can search for specific cocktails or explore a range of options
                based on your preferences. With our easy-to-use interface, you can even save your favorite recipes to come back to later.

                The unique feature of the Cocktail Inventory App is the AI-powered scanner, which allows you to scan bottles of alcohol in your collection. The app uses an advanced algorithm trained using
                StableDiffusion and Fooocus to identify the contents of the bottle and suggest cocktails that can be made with those ingredients. This feature not only adds a layer of convenience but also expands
                your knowledge of different cocktails and how they can be made.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${voulezVousSlides} 800w, ${voulezVousSlidesLarge} 1920w`}
              width={800}
              height={500}
              placeholder={voulezVousSlidesPlaceholder}
              alt="Voulez Vous Scanner"
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        {/*Image with UI element*/}
        <ProjectSection padding="top">
          <ProjectSectionContent className={styles.grid}>
            <div className={styles.gridImage}>
              <div className={styles.gridBackground}>
                <Image
                  srcSet={`${voulezVousBackgroundBar} 440w, ${voulezVousBackgroundBar} 880w`}
                  width={440}
                  height={790}
                  placeholder={voulezVousBackgroundBarPlaceholder}
                  alt=""
                  role="presentation"
                  sizes={`(max-width: ${media.mobile}px) 312px, (max-width: ${media.tablet}px) 408px, 514px`}
                />
              </div>
              <div className={styles.gridForeground}>
                <Image
                  srcSet={`${voulezVousAnnotation} 440w, ${voulezVousAnnotationLarge} 880w`}
                  width={440}
                  height={340}
                  placeholder={voulezVousAnnotationPlaceholder}
                  alt="An Image of the boulez vous coctail scanner, with the second image being the UI element of a suggested cocktail"
                  sizes={`(max-width: ${media.mobile}px) 584px, (max-width: ${media.tablet}px) 747px, 556px`}
                />
              </div>
            </div>
            <div className={styles.gridText}>
              <ProjectSectionHeading>Technology</ProjectSectionHeading>
              <ProjectSectionText>
                At the core of the app is an algorithm that uses computer vision and natural language processing
                techniques to identify the contents of alcohol bottles and generate realistic photos of suggested cocktails. This algorithm was trained using StableDiffusion and FooFocus, which are state-of-the-art
                models for generating high-quality images and text respectively.

                In addition to the core technology, we also utilized a range of other technologies in the app development process. For example, we employed machine learning techniques to build a comprehensive
                library of cocktails, complete with their recipes, ingredients, and instructions. We also used natural language processing to improve the accuracy of the AI-powered scanner and make it easier for
                users to find the information they need.

                Overall, our choice of technology in the Cocktail Inventory App was guided by a focus on providing the best user experience possible. By leveraging these cutting-edge technologies, we were able to
                create an app that offers a unique and comprehensive solution for cocktail enthusiasts who want to expand their knowledge and manage their collection more efficiently.
              </ProjectSectionText>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/*Text above image section*/}
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Conclusion</ProjectSectionHeading>
              <ProjectSectionText>
                our Cocktail Inventory App offers a unique and comprehensive solution for cocktail enthusiasts who want to expand their knowledge and manage their collection more efficiently. With
                its advanced technology, user-friendly interface, and wide range of features, its the perfect tool for anyone looking to take their love of cocktails to the next level. Try it out today and let us
                know what you think!
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              src={voulezVousIrl}
              width={940}
              height={500}
              placeholder={voulezVousIrlPlaceholder}
              alt="Real-life implementation of Teamworks at a client site."
            />
          </ProjectSectionContent>
        </ProjectSection>

      <Footer />
    </Fragment>
  );
};
