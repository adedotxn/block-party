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
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface UserData {
  fullName: string;
  bio: string;
  username: string;
  interests: string[];
}

const ProfilePage: NextPage = () => {
  const [user, setUser] = useState<UserData | undefined>(undefined);
  useEffect(() => {
    const username = localStorage.getItem('loggedinuser');
    const fetchUser = async () => {
      const response = await fetch(`/user/id/${username}`);
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setUser(data);
      } else {
        console.error('Error:', data.message);
      }
    };

    fetchUser();
  }, []);

  const router = useRouter();
  return (
    <Flex
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      w="100vw"
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
          color="#CC2900"
        >
          {user?.fullName}
        </Text>
        <Text
          fontWeight={400}
          fontSize={'13px'}
          lineHeight={{ base: '12px', md: '14px' }}
          color="#797979"
          textAlign="center"
        >
          {user?.bio}
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
            onClick={() => {
              router.push('/edit_interests');
            }}
          >
            edit
          </Button>
        </Flex>
        <Wrap spacing={2}>
          {user?.interests.map((badge) => (
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
      </Box>
    </Flex>
  );
};

export default ProfilePage;
