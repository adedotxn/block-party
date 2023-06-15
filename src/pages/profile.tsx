import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface User {
  fullName: string;
  username: string;
  bio: string;
  interests: string[];
  // Add other properties if available
}

const UserPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedinuser');

    if (loggedInUser) {
      fetch(`/api/user/${loggedInUser}`)
        .then((response) => response.json())
        .then((predata) => predata.data)
        .then((data: User) => setUser(data));
    }
  }, []);

  return (
    <Flex direction="column" align="center" justify="center" h="100vh" p={4}>
      {user ? (
        <Box width="100%" maxWidth={{ base: '280px', md: '600px' }}>
          <Flex
            direction="column"
            align="center"
            justify="center"
            my="4"
            gap={2}
            fontFamily="productSans"
          >
            <Avatar
              name={user.fullName}
              src=""
              bg="#d3b0b0"
              color="#CC2900"
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
              textTransform="capitalize"
              fontFamily="productSans"
            >
              {user.fullName}
            </Text>
            <Text
              textAlign="center"
              fontWeight="700"
              fontSize="27px"
              lineHeight="30px"
              color="#CC2900"
              textTransform="capitalize"
              fontFamily="productSans"
            >
              {user.bio}
            </Text>

            <Divider my={1} />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Text
                flex="1"
                fontSize={{ base: '10px', md: '12px' }}
                fontWeight="700"
                textAlign="left"
                color="#FF0000"
                letterSpacing="-0.5px"
                mb={1}
                fontFamily="productSans"
              >
                Interests
              </Text>
              <Button
                variant="unstyled"
                fontWeight="400"
                fontSize="10px"
                color="#626262"
                fontFamily="productSans"
                onClick={() => {
                  router.push('/edit_interests');
                }}
              >
                edit
              </Button>
            </Flex>
            <Grid
              templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }}
              gap={4}
              alignItems="center"
            >
              {user.interests.map((item, index) => (
                <GridItem key={index}>
                  <Text
                    borderRadius="33px"
                    background="#CC2900"
                    textAlign="center"
                    padding="5px"
                    fontFamily="productSans"
                    fontSize={{ base: '9px', md: '11px' }}
                    lineHeight={{ base: '9px', md: '11px' }}
                    fontWeight={700}
                    letterSpacing="-0.02em"
                    color="#FFFFFF"
                    width={{ base: '100px', md: '250px' }}
                    height={{ base: '23px', md: '33px' }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {item}
                  </Text>
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Box>
      ) : (
        <Text fontFamily="productSans" fontSize="xl">
          Loading...
        </Text>
      )}
    </Flex>
  );
};

export default UserPage;
