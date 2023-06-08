import { Grid, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import {
  AddPostIcon,
  BoardIcon,
  HeartIcon,
  ProfileIcon,
  StarIcon,
} from './icons';

const FooterBar = () => {
  return (
    <footer style={{ position: 'fixed', bottom: '0rem', width: '100vw' }}>
      <Grid
        bg="#003566"
        templateColumns="repeat(5, 1fr)"
        alignItems="center"
        p={3}
        gap={2}
        placeItems="center"
      >
        <Link as={NextLink} href="/board">
          <BoardIcon boxSize={8} />
        </Link>

        <Link as={NextLink} href="/groups">
          <StarIcon boxSize={8} />
        </Link>

        <AddPostIcon boxSize={8} />

        <Link as={NextLink} href="/interests-volunteer">
          <HeartIcon boxSize={7} />
        </Link>

        <Link as={NextLink} href="/profile">
          <ProfileIcon boxSize={8} />
        </Link>
      </Grid>
    </footer>
  );
};

export default FooterBar;
