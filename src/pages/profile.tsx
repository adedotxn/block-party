import UserInfo from '@/components/ui/userinfo';
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Divider,
  Flex,
  Text,
  Wrap,
  WrapItem,
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
    username: 'ausername',
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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="100%"
      w="100%"
      py={10}
    >
      <Flex direction="column" align="center" justify="center" my="4" gap={2}>
        <Avatar
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
          border="2px solid #E9E9E9"
          h={{ base: '120px', md: '172px' }}
          w={{ base: '120px', md: '172px' }}
        >
          <AvatarBadge
            borderColor="papayawhip"
            bg="tomato"
            boxSize={{ base: '1.5em', md: '2em' }}
            transform="translate(0%, 0%)"
          />
        </Avatar>
        <Text
          textAlign="center"
          fontWeight="700"
          fontSize="27px"
          lineHeight="30px"
          color="#003566"
        >
          John Doe
        </Text>
        <Text
          fontWeight={400}
          fontSize={'13px'}
          lineHeight={{ base: '12px', md: '14px' }}
          color="#797979"
          textAlign="center"
        >
          This is a bio containing a description about me.
        </Text>
      </Flex>

      <Box width="100%" maxWidth={{ base: '280px', md: '600px' }}>
        <Divider my={1} />

        <Flex justifyContent="space-between" alignItems="center">
          <Text
            fontSize={{ base: '10px', md: '12px' }}
            fontWeight="700"
            textAlign="left"
            color="#FF0000"
            letterSpacing="-0.5px"
            mb={1}
          >
            Interests
          </Text>
          <Button
            variant="unstyled"
            fontWeight="400"
            fontSize="10px"
            color="#626262"
          >
            edit
          </Button>
        </Flex>
        <Wrap spacing={2}>
          {interestsOptions.map((badge) => (
            <WrapItem key={badge}>
              <Text
                borderRadius="33px"
                background="#003566"
                textAlign="center"
                padding="5px"
                fontSize={{ base: '9px', md: '11px' }}
                lineHeight={{ base: '9px', md: '11px' }}
                fontWeight={700}
                letterSpacing="-0.02em"
                color="#FFFFFF"
                width={{ base: '35vw', md: '35vw' }}
                height={{ base: '23px', md: '33px' }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {badge}
              </Text>
            </WrapItem>
          ))}
        </Wrap>

        <Divider my={5} />
        <Flex justifyContent="space-between" alignItems="center">
          <Text
            fontSize={{ base: '10px', md: '12px' }}
            fontWeight="700"
            textAlign="left"
            color="#FF0000"
            letterSpacing="-0.5px"
            mb={1}
          >
            Volunteer
          </Text>
          <Button
            variant="unstyled"
            fontWeight="400"
            fontSize="10px"
            color="#626262"
          >
            edit
          </Button>
        </Flex>
        <Wrap spacing={2} justifyContent="space-between">
          {interestsOptions.map((badge) => (
            <WrapItem key={badge}>
              <Text
                borderRadius="33px"
                background="#003566"
                textAlign="center"
                padding="5px"
                fontSize={{ base: '9px', md: '11px' }}
                lineHeight={{ base: '9px', md: '11px' }}
                fontWeight={700}
                letterSpacing="-0.02em"
                color="#FFFFFF"
                width={{ base: '35vw', md: '35vw' }}
                height={{ base: '23px', md: '33px' }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {badge}
              </Text>
            </WrapItem>
          ))}
        </Wrap>

        <Divider my={1} />

        <Text
          fontSize={{ base: '10px', md: '12px' }}
          fontWeight="700"
          textAlign="left"
          color="#FF0000"
          letterSpacing="-0.5px"
          mb={2}
        >
          Friends
        </Text>
        <Wrap spacing={4}>
          {users.map((user) => (
            <WrapItem key={user.username}>
              <UserInfo
                avatarUrl={user.avatarUrl}
                username={user.username}
                occupation={user.occupation}
              />
            </WrapItem>
          ))}

          <WrapItem>
            <Button variant="unstyled" onClick={() => console.log('clicked')}>
              <Flex direction="column">
                <Image
                  src={addmember}
                  width={45}
                  height={45}
                  style={{ alignSelf: 'center' }}
                  alt="add member icon"
                />
                <Text
                  fontSize={{ base: '8px', md: '10px' }}
                  fontWeight={700}
                  mt={4}
                  color="#626262"
                  height="10px"
                >
                  {'Add'}
                </Text>
                <Text
                  fontSize={{ base: '8px', md: '10px' }}
                  fontWeight={500}
                  mt={2}
                  color="#626262"
                  height="10px"
                >
                  {'Member'}
                </Text>
              </Flex>
            </Button>
          </WrapItem>
        </Wrap>
      </Box>
    </Box>
  );
};

export default ProfilePage;
