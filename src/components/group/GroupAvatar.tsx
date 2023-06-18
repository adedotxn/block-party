import { Avatar, AvatarGroup } from '@chakra-ui/react';

const GroupAvatar = ({
  members,
}: {
  members: { id: string; name: string }[];
}) => {
  return (
    <AvatarGroup size="md" max={3}>
      {members.map((member) => (
        <Avatar key={member.id} name={member.name} />
      ))}
    </AvatarGroup>
  );
};

export default GroupAvatar;
