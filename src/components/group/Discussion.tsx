import { Container, Flex, Grid, Heading, Spacer, Text } from '@chakra-ui/react';
import DiscussionCards from './DiscussionCards';

const Discussion = () => {
  return (
    <Container py={7}>
      <Flex alignItems="center">
        <Heading size="md" color="red.3">
          Discussions
        </Heading>
        <Spacer />
        <Text fontWeight="medium">See All</Text>
      </Flex>

      <Grid mt={12} gap="2rem" pb={20}>
        {[
          { name: 'Philip Adewole', username: 'Philip The Great' },
          { name: 'Sarah Wong', username: 'Sarah The Magneficent' },
          { name: 'Assad', username: 'nottherealalanturing' },
        ].map((post, index) => (
          <DiscussionCards
            key={index}
            name={post.name}
            username={post.username}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default Discussion;
