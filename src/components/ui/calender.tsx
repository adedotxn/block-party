import { Box, Text } from '@chakra-ui/react';

const months: { [key: string]: string } = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'Aug',
  '09': 'Sept',
  '10': '0ct',
  '11': 'Nov',
  '12': 'Dec',
};

const Calender = ({ date }: { date: string }) => {
  const _date = date.split('-');
  // const year = _date[1];
  const month = _date[1];
  const day = _date[2];
  return (
    <Box display="grid" py="1rem" width="84px" fontFamily="samsungSharpSans">
      <Text
        align="center"
        bg="red.1"
        color="white"
        py={1}
        borderTopRadius="10px"
        fontSize="15px"
        fontWeight="semibold"
        textTransform="uppercase"
      >
        {months[month]}
      </Text>

      <Text
        align="center"
        fontSize="5xl"
        fontWeight="extrabold"
        bg="grey.calender"
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
