import { StarIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Flex,
  Grid,
  Heading,
  Spacer,
  Text,
} from '@chakra-ui/react';

const DiscussionCards = () => {
  return (
    <Grid mt={12} gap="2">
      <Box
        bg="blackAlpha.300"
        px="6"
        pt="2"
        pb="4"
        borderRadius="6px"
        position="relative"
      >
        <Avatar
          name="Philip Adewole"
          position="absolute"
          bottom="9.5rem"
          left=".5rem"
          border="2px"
          size="md"
        />
        <Flex color="blue.1" alignItems="center" gap=".5rem" pt="1">
          <Heading ml={9} fontSize=".95rem">
            Philip The Great
          </Heading>
          <Text width="1" height="1" bg="blue.1" borderRadius="full" />
          <Text fontSize=".8rem">3 weeks ago</Text>
        </Flex>
        <Text lineHeight="1.2" mt={3}>
          Nam libero tempore cum soluta nobis est eligendi optio cumque nihil
          impedit quo minus id quod maxime placeat facere possimus.
        </Text>
        <Flex mt={4}>
          <Text fontWeight="medium">Reply</Text>
          <Spacer />
          <StarIcon color="red.1" />
        </Flex>
      </Box>

      <Box
        bg="blackAlpha.300"
        px="6"
        pt="2"
        pb="4"
        borderRadius="6px"
        mt={7}
        position="relative"
      >
        <Avatar
          name="Sarah Wong"
          position="absolute"
          bottom="9.5rem"
          left=".5rem"
          border="2px"
          borderColor="white"
          size="md"
        />
        <Flex color="blue.1" alignItems="center" gap=".5rem" pt="1">
          <Heading ml={9} fontSize=".95rem">
            Sarah The Magneficent
          </Heading>
          <Text width="1" height="1" bg="blue.1" borderRadius="full" />
          <Text fontSize=".8rem">2 days ago</Text>
        </Flex>
        <Text lineHeight="1.2" mt={3}>
          Nam libero tempore cum soluta nobis est eligendi optio cumque nihil
          impedit quo minus id quod maxime placeat facere possimus.
        </Text>
        <Flex mt={4}>
          <Text fontWeight="medium">Reply</Text>
          <Spacer />
          <StarIcon color="red.1" />
        </Flex>
      </Box>

      <Box
        bg="blackAlpha.300"
        px="6"
        pt="2"
        pb="4"
        borderRadius="6px"
        mt={7}
        position="relative"
      >
        <Avatar
          name="Nottherealalanturing"
          position="absolute"
          bottom="9.5rem"
          left=".5rem"
          border="2px"
          size="md"
        />

        <Flex color="blue.1" alignItems="center" gap=".2rem" pt="1">
          <Heading ml={9} fontSize=".95rem">
            Assad The Phenomenal
          </Heading>
          <Text width="1" height="1" bg="blue.1" borderRadius="full" />
          <Text fontSize=".8rem">3 weeks ago</Text>
        </Flex>

        <Text lineHeight="1.2" mt={3}>
          Nam libero tempore cum soluta nobis est eligendi optio cumque nihil
          impedit quo minus id quod maxime placeat facere possimus.
        </Text>
        <Flex mt={4}>
          <Text fontWeight="medium">Reply</Text>
          <Spacer />
          <StarIcon color="red.1" />
        </Flex>
      </Box>
    </Grid>
  );
};

export default DiscussionCards;
