import vvLoginLarge from '~/assets/VV-login-large.png';
import vvLoginPlaceholder from '~/assets/VV-login-placeholder.png';
import vvLogin from '~/assets/VV-login.png';
import vvScanLarge from '~/assets/VV-scan-large.png';
import vvScanPlaceholder from '~/assets/VV-scan-placeholder.png';
import vvScan from '~/assets/VV-scan.png';
import towfoodLarge from '~/assets/towfood-large.png';
import towfoodPlaceholder from '~/assets/towfood-placeholder.png';
import towfood from '~/assets/towfood.png';
// import sprTextureLarge from '~/assets/spr-lesson-builder-dark-large.jpg';
// import sprTexturePlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
// import sprTexture from '~/assets/spr-lesson-builder-dark.jpg';
import teamworksTextureLarge from '~/assets/teamworks/Website-home-large.png';
import teamworksTexturePlaceholder from '~/assets/teamworks/Website-home-placeholder.png';
import teamworksTexture from '~/assets/spr-lesson-builder-dark.jpg';
import ancientBotsTexture from '~/assets/ancient-bots/screenshot-hero.png';
import ancientBotsTexturePlaceholder from '~/assets/ancient-bots/screenshot-hero.png';
import mormonizeTexture from '~/assets/mormonize/screenshot-hero.png';
import mormonizeTexturePlaceholder from '~/assets/mormonize/screenshot-hero.png';
import fitcheckTexture from '~/assets/fitcheck/screenshot-hero.png';
import fitcheckTexturePlaceholder from '~/assets/fitcheck/screenshot-hero.png';
import thothTexture from '~/assets/thoth/thoth-logo.png';
import thothTexturePlaceholder from '~/assets/thoth/thoth-logo.png';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Designer + Developer',
    description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const projectFive = useRef();
  const projectSix = useRef();
  const projectSeven = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [
      intro,
      projectOne,
      projectTwo,
      projectThree,
      projectFour,
      projectFive,
      projectSix,
      projectSeven,
      details,
    ];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Mormonize: AI Scripture Study Companion"
        description="A native iOS app with on-device AI, semantic search, and guided journeys — fully offline-capable."
        buttonText="View project"
        buttonLink="/projects/mormonize"
        model={{
          type: 'phone',
          alt: 'Mormonize iOS app home screen',
          textures: [
            {
              srcSet: `${mormonizeTexture} 375w, ${mormonizeTexture} 750w`,
              placeholder: mormonizeTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="FitCheck: Privacy-First Size Recommendations"
        description="Open-source Chrome extension that recommends clothing sizes across brands — all data stays on device."
        buttonText="View project"
        buttonLink="/projects/fitcheck"
        model={{
          type: 'laptop',
          alt: 'FitCheck Chrome extension landing page',
          textures: [
            {
              srcSet: `${fitcheckTexture} 800w, ${fitcheckTexture} 1920w`,
              placeholder: fitcheckTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Thoth: AI Scribe for GitHub"
        description="A Chrome extension that turns selected text or screenshots into well-structured, template-aware GitHub issues."
        buttonText="View project"
        buttonLink="/projects/thoth"
        model={{
          type: 'laptop',
          alt: 'Thoth logo',
          textures: [
            {
              srcSet: `${thothTexture} 800w, ${thothTexture} 1920w`,
              placeholder: thothTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-4"
        alternate
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={4}
        title="Ancient Bots: AI for Social Media"
        description="Automate your social media presence with AI-generated, viral content."
        buttonText="View project"
        buttonLink="/projects/ancient-bots"
        model={{
          type: 'laptop',
          alt: 'Ancient Bots: AI for Social Media',
          textures: [
            {
              srcSet: `${ancientBotsTexture} 800w, ${ancientBotsTexture} 1920w`,
              placeholder: ancientBotsTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-5"
        sectionRef={projectFive}
        visible={visibleSections.includes(projectFive.current)}
        index={5}
        title="Office Rental Platform and App"
        description="Designed and developed a platform for Teamworks Execuitve Suites to manage office rentals and bookings."
        buttonText="View project"
        buttonLink="/projects/teamworks"
        model={{
          type: 'laptop',
          alt: 'Teamworks Rental Platform',
          textures: [
            {
              srcSet: `${teamworksTextureLarge} 1280w, ${teamworksTextureLarge} 2560w`,
              placeholder: teamworksTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-6"
        alternate
        sectionRef={projectSix}
        visible={visibleSections.includes(projectSix.current)}
        index={6}
        title="Voulez Vous App"
        description="Developed a spirit recognition and cocktail recipe app."
        buttonText="View App"
        buttonLink="https://voulezvous.app/"
        // buttonLink="/projects/voulez-vous"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: `${vvLogin} 375w, ${vvLoginLarge} 750w`,
              placeholder: vvLoginPlaceholder,
            },
            {
              srcSet: `${vvScan} 375w, ${vvScanLarge} 750w`,
              placeholder: vvScanPlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-7"
        sectionRef={projectSeven}
        visible={visibleSections.includes(projectSeven.current)}
        index={7}
        title="Larder Inventory Management System"
        description="Designed and developed a system for Tow Food Larders to manage inventory and orders."
        buttonText="View project"
        // buttonLink="/projects/slice"
        buttonLink="https://github.com/PrenSJ2/TowFood-PWA"
        model={{
          type: 'laptop',
          alt: 'App with report screen',
          textures: [
            {
              srcSet: `${towfood} 800w, ${towfoodLarge} 1920w`,
              placeholder: towfoodPlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
