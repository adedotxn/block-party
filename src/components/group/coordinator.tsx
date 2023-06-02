import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Spacer,
  Text,
} from '@chakra-ui/react';

const Coordinator = () => {
  return (
    <Container px={5} my={7}>
      <Flex alignItems="center">
        <Box>
          <Text color="red.2" fontWeight="semibold">
            Group Coordinator
          </Text>
          <Heading>Sarah Wong</Heading>
          <Text fontWeight="normal">Message</Text>
        </Box>
        <Spacer />
        <Avatar name="Sarah Wong" size="xl" />
      </Flex>
    </Container>
  );
};

export default Coordinator;
