import { Link } from '~/components/link';
import { StoryContainer } from '../../../.storybook/story-container';

export default {
  title: 'Link',
};

export const Default = () => (
  <StoryContainer style={{ fontSize: 18 }}>
    <Link href="https://seb.onlineo.live">Primary link</Link>
    <Link secondary href="https://seb.onlineo.live">
      Secondary link
    </Link>
  </StoryContainer>
);
