import { Container, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
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

      <DiscussionCards />
    </Container>
  );
};

export default Discussion;
