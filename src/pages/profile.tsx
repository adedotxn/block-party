import UserInfo from '@/components/ui/userinfo';
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Text,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Image from 'next/image';
import addmember from '../../public/icons/addmember.svg';

interface User {
  avatarUrl: string;
  username: string;
  occupation: string;
}

const interestsOptions: string[] = [
  'Sports',
  'Music',
  'Art',
  'Technology',
  'Cooking',
  'Reading',
];

const users: User[] = [
  {
    avatarUrl: 'https://avatars.githubusercontent.com/u/23?v=4',
    username: 'nottherealalanturing',
    occupation: 'human',
  },
  {
    avatarUrl: 'https://avatars.githubusercontent.com/u/25?v=4',
    username: 'username',
    occupation: 'man',
  },
  {
    avatarUrl: 'https://avatars.githubusercontent.com/u/425?v=4',
    username: 'notausername',
    occupation: 'person',
  },
];

const ProfilePage: NextPage = () => {
  return (
    <Flex
      align="center"
      justify="center"
      my="30"
      direction="column"
      gap={1}
      px={4}
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        my="30"
        gap={'10px'}
      >
        <Avatar
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
          border="2px solid #E9E9E9"
          h={'172px'}
          w={'172px'}
        >
          <AvatarBadge
            borderColor="papayawhip"
            bg="tomato"
            boxSize="2em"
            transform="translate(0%, 0%)"
          />
        </Avatar>
        <Text
          fontWeight={700}
          fontSize="27px"
          lineHeight="30px"
          letterSpacing="-0.408px"
          color="#626262"
          textAlign="center"
        >
          John Doe
        </Text>
        <Text
          fontWeight={400}
          fontSize="13px"
          lineHeight="14px"
          color="#626262"
          textAlign="center"
        >
          This is a bio containing a description about me.
        </Text>
      </Flex>

      <Box>
        <Divider my={5} />

        <Text
          fontSize="12px"
          fontWeight="700"
          textAlign="left"
          color="#797979"
          letterSpacing="-0.5px"
          mb={1}
        >
          Interests
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          {interestsOptions.map((badge) => (
            <Text
              key={badge}
              borderRadius="33px"
              background="#D9D9D9"
              textAlign="center"
              padding="5px"
              fontSize="9px"
              lineHeight="11px"
              fontWeight="500"
              letterSpacing="-0.02em"
              color="#626262"
            >
              {badge}
            </Text>
          ))}
        </Grid>

        <Divider my={5} />

        <Text
          fontSize="12px"
          fontWeight="700"
          textAlign="left"
          color="#797979"
          letterSpacing="-0.5px"
          mb={1}
        >
          Volunteer
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          {interestsOptions.map((badge) => (
            <Text
              key={badge}
              borderRadius="33px"
              background="#D9D9D9"
              textAlign="center"
              padding="5px"
              fontSize="9px"
              lineHeight="11px"
              fontWeight="500"
              letterSpacing="-0.02em"
              color="#626262"
            >
              {badge}
            </Text>
          ))}
        </Grid>

        <Divider my={5} />

        <Text
          fontSize="12px"
          fontWeight="700"
          textAlign="left"
          color="#797979"
          letterSpacing="-0.5px"
          mb={1}
        >
          Neighbours
        </Text>
        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
          {users.map((user) => (
            <UserInfo
              avatarUrl={user.avatarUrl}
              username={user.username}
              occupation={user.occupation}
              key={user.username}
            />
          ))}

          <Button variant="unstyled" onClick={() => console.log('clicked')}>
            <Flex direction="column">
              <Image
                src={addmember}
                width={62}
                height={62}
                style={{ alignSelf: 'center' }}
                alt="add member icon"
              />
              <Text
                fontSize="10px"
                fontWeight="700"
                mt={4}
                color="#626262"
                height="10px"
              >
                {'Add'}
              </Text>
              <Text
                fontSize="10px"
                fontWeight="500"
                mt={2}
                color="#626262"
                height="10px"
              >
                {'Member'}
              </Text>
            </Flex>
          </Button>
        </Grid>
      </Box>
    </Flex>
  );
};

export default ProfilePage;
