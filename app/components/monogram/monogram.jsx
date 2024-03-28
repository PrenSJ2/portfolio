import { forwardRef, useId } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="32"
      height="48"
      viewBox="0 0 32 48"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M9.55,48c.01-.33.03-.65.03-.98,0-7.59,0-15.19,0-22.78,0-.61.03-1.22.04-1.84,0-.02.01-.04.03-.08h22.04c-.07-.09-.11-.15-.16-.2-.21-.2-.42-.38-.62-.59-.29-.3-.55-.62-.84-.92-.48-.49-.98-.95-1.47-1.44-.47-.47-.93-.95-1.39-1.43-.08-.08-.18-.14-.25-.22-.28-.3-.55-.62-.84-.92-.45-.46-.92-.9-1.38-1.35-.19-.19-.36-.4-.56-.59-.38-.38-.78-.75-1.16-1.13-.49-.5-.98-1-1.47-1.5-.26-.27-.53-.53-.79-.79-.18-.19-.35-.39-.54-.58-.38-.37-.77-.74-1.15-1.11-.36-.36-.71-.74-1.07-1.1-.4-.41-.82-.81-1.22-1.22-.48-.49-.95-.99-1.43-1.47-.56-.57-1.13-1.13-1.69-1.69-.14-.14-.26-.3-.41-.44-.42-.41-.85-.81-1.26-1.23-.35-.35-.69-.72-1.04-1.07-.38-.39-.77-.78-1.16-1.16-.05-.05-.08-.11-.13-.16" />
          <path d="M9.67,0c.04.05.08.11.13.16.39.39.78.77,1.16,1.16.35.36.68.72,1.04,1.07.42.42.85.82,1.26,1.23.14.14.27.3.41.44.56.57,1.13,1.12,1.69,1.69.48.49.95.99,1.43,1.47.4.41.82.81,1.22,1.22.36.36.7.74,1.07,1.1.38.38.77.74,1.15,1.11.19.19.36.39.54.58.26.27.53.53.79.79.49.5.97,1.01,1.47,1.5.38.38.78.75,1.16,1.13.19.19.36.4.56.59.46.45.93.89,1.38,1.35.29.3.56.61.84.92.07.08.17.14.25.22.46.48.92.96,1.39,1.43.48.49.99.95,1.47,1.44.29.3.56.62.84.92.2.2.42.39.62.59.05.05.09.11.16.2H9.65s-.03.06-.03.08c-.02.61-.04,1.22-.04,1.84,0,7.59,0,15.19,0,22.78,0,.33-.02.65-.03.98h-.04c-.11-.3-.23-.61-.34-.91-.35-.96-.71-1.92-1.06-2.88-.3-.83-.6-1.65-.9-2.48-.33-.91-.67-1.82-1.01-2.73-.32-.86-.64-1.73-.96-2.59-.36-.98-.72-1.96-1.08-2.94-.3-.81-.59-1.63-.89-2.44-.34-.93-.69-1.85-1.03-2.78-.33-.89-.65-1.78-.98-2.67-.17-.46-.33-.93-.5-1.39-.13-.36-.24-.71-.38-1.07-.1-.27-.22-.53-.34-.8.09-.04.14-.06.19-.08.73-.3,1.47-.59,2.2-.89.99-.4,1.97-.81,2.96-1.21,1.32-.54,2.64-1.09,3.96-1.62.2-.08.25-.18.25-.38,0-5.71,0-11.41,0-17.12,0-.34.02-.68.03-1.02.01,0,.03,0,.04,0Z" />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
});
