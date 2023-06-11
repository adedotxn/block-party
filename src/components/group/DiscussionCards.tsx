import { Avatar, Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react';

const defaultText =
  ' Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.';
const DiscussionCards = ({
  name,
  username,
  text = defaultText,
}: {
  name: string;
  username: string;
  text?: string;
}) => {
  return (
    <Flex fontFamily="productSans">
      <Avatar name={name} border="2px" size="md" />
      <Spacer />
      <Box
        bg="blackAlpha.300"
        px="4"
        pt="2"
        pb="4"
        borderRadius="6px"
        width={{ base: '70vw', md: '30vw' }}
      >
        <Flex color="blue.1" alignItems="center" gap=".5rem" pt="1">
          <Heading fontSize=".95rem">{username}</Heading>
          {/* <Text width="1" height="1" bg="blue.1" borderRadius="full" /> */}
          {/* <Text fontSize=".8rem">3 weeks ago</Text> */}
        </Flex>
        <Text lineHeight="1.2" mt={3} fontSize=".95rem">
          {text}
        </Text>
        {/* <Flex mt={3}>
          <Text fontWeight="medium">Reply</Text>
          <Spacer />
          <StarIcon color="red.1" />
        </Flex> */}
      </Box>
    </Flex>
  );
};

export default DiscussionCards;
