import { Link } from '~/components/link';
import { StoryContainer } from '../../../.storybook/story-container';

export default {
  title: 'Link',
};

export const Default = () => (
  <StoryContainer style={{ fontSize: 18 }}>
    <Link href="https://seb.onlineolive.xyz">Primary link</Link>
    <Link secondary href="https://seb.onlineolive.xyz">
      Secondary link
    </Link>
  </StoryContainer>
);
