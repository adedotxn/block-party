import { Event } from '@/utils/interface';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import Calender from '../ui/calender';

const Events = ({ event }: { event: Event }) => {
  return (
    <Flex
      borderRadius="10px"
      alignItems="center"
      mt="1rem"
      px={6}
      py={3}
      bg="grey.event"
    >
      <Box width="20ch" fontFamily="productSans">
        <Text fontWeight="bold" lineHeight="1.1" fontSize="2xl">
          {event.title}
        </Text>
        <Text
          pt={1}
          fontWeight="semibold"
          lineHeight="1.1"
          fontSize="lg"
          color="#3D3E3E"
        >
          {event.description}{' '}
        </Text>

        <Flex pt={1} alignItems="center" fontSize="lg" gap={1}>
          <Text fontWeight="bold" color="red.3">
            {event.organiser.name}
          </Text>
          <Box width={1} height={1} rounded="full" bg="red.3" />
          <Text fontWeight="light" fontSize="lg" color="red.3">
            {event.startTime ? event.startTime : null}
          </Text>
        </Flex>
      </Box>
      <Spacer />
      <Calender date={event.date} />
    </Flex>
  );
};

export default Events;
