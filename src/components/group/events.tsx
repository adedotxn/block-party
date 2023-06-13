import { Event } from '@/utils/interface';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import Calender from '../ui/calender';

const Events = (props: { event: Event }) => {
  const { event } = props;
  console.log({ event });
  return (
    <Flex
      borderRadius="10px"
      alignItems="center"
      mt="1rem"
      px={6}
      py={3}
      bg="blackAlpha.400"
    >
      <Box width="20ch" fontFamily="productSans">
        <Text fontWeight="bold" lineHeight="1.1" fontSize="2xl">
          {event.title}
        </Text>
        <Text
          pt={1}
          fontWeight="semibold"
          lineHeight="1.1"
          fontSize="xl"
          color="#3D3E3E"
        >
          {event.description}{' '}
        </Text>
        <Text pt={1} fontWeight="semibold" color="red.3" fontSize="lg">
          {event.startTime ? event.startTime : null}
        </Text>
      </Box>
      <Spacer />
      <Calender date={event.date} />
    </Flex>
  );
};

export default Events;
