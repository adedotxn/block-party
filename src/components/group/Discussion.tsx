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
          {
            name: 'Philip Adewole',
            username: 'Philip The Great',
            time: '2023',
          },
          {
            name: 'Sarah Wong',
            username: 'Sarah The Magneficent',
            time: '2023',
          },
          { name: 'Assad', username: 'nottherealalanturing', time: '2023' },
        ].map((post, index) => (
          <DiscussionCards
            key={index}
            name={post.name}
            username={post.username}
            time="placeholder"
            text="placeholder"
          />
        ))}
      </Grid>
    </Container>
  );
};

export default Discussion;
