import { Box, Text } from '@chakra-ui/react';

const Calender = ({ date }: { date: string }) => {
  const _date = date.split('-');
  const year = _date[0];
  const month = 'June';
  const day = _date[2];
  return (
    <Box display="grid" py="1rem" width="84px" fontFamily="samsungSharpSans">
      <Text
        align="center"
        bg="red.1"
        color="white"
        py={1}
        // height="1.5rem"
        borderTopRadius="10px"
        fontSize="15px"
        fontWeight="semibold"
        textTransform="uppercase"
      >
        {month}
      </Text>

      <Text
        align="center"
        fontSize="5xl"
        fontWeight="extrabold"
        bg="gray.200"
        height="61px"
        borderBottomRadius="10px"
        textAlign="center"
      >
        {day}
      </Text>
    </Box>
  );
};

export default Calender;
