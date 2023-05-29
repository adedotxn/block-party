import { Box, Text } from '@chakra-ui/react';

const Calender = () => {
  return (
    <Box display="grid" py="1rem">
      <Text
        align="center"
        bg="red.1"
        color="white"
        p={1}
        width="84px"
        borderTopRadius="5px"
        fontWeight="semibold"
      >
        JUNE
      </Text>

      <Text
        align="center"
        fontSize="5xl"
        fontWeight="extrabold"
        bg="gray.200"
        px={1}
        py=".2rem"
        width="84px"
        borderBottomRadius="5px"
      >
        23
      </Text>
    </Box>
  );
};

export default Calender;
