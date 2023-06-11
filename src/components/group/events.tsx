import { Event } from '@/utils/interface';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import Calender from '../ui/calender';

const Events = ({ event }: { event: Event }) => {
  return (
    <Flex
      borderRadius="10px"
      alignItems="center"
      mt="1rem"
      px="5"
      bg="blackAlpha.400"
    >
      <Box width="20ch">
        <Text fontWeight="bold" lineHeight="1.1" fontSize="lg">
          {event.name}
        </Text>
        {event.description ? (
          <Text fontWeight="semibold" fontSize="lg">
            {event.description}{' '}
          </Text>
        ) : null}
        <Text pt={4} fontWeight="semibold" color="red.3">
          {event.time}
        </Text>
      </Box>
      <Spacer />
      <Calender />
    </Flex>
  );
};

export default Events;
