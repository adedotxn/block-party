import { Avatar, AvatarGroup } from '@chakra-ui/react';

const GroupAvatar = () => {
  return (
    <AvatarGroup size="md" max={3}>
      <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
      <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

      <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
      <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
      <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
    </AvatarGroup>
  );
};

export default GroupAvatar;
