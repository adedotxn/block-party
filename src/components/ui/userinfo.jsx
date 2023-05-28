import { Avatar, Box, Text } from '@chakra-ui/react';

function UserInfo({ avatarUrl, username, occupation }) {
  return (
    <Box textAlign="center">
      <Avatar
        size="xl"
        src={avatarUrl}
        alt="User Avatar"
        width={62}
        height={62}
      />
      <Text
        fontSize="10px"
        fontWeight="700"
        mt={4}
        color="#626262"
        height="10px"
      >
        {username}
      </Text>
      <Text
        fontSize="10px"
        fontWeight="500"
        mt={2}
        color="#626262"
        height="10px"
      >
        {occupation}
      </Text>
    </Box>
  );
}

export default UserInfo;
