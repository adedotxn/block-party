import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import Calender from '../ui/calender';

const Events = () => {
  return (
    <Flex
      borderRadius="10px"
      alignItems="center"
      mt="1rem"
      px="5"
      bg="blackAlpha.400"
    >
      <Calender />
      <Spacer />
      <Box width="20ch">
        <Text>7:00PM GMT</Text>
        <Text fontWeight="bold" lineHeight="1.1" fontSize="lg">
          Help young people in the community in our next career sharing event
        </Text>
      </Box>
    </Flex>
  );
};

export default Events;
