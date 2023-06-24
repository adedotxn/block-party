import AllGroups from '@/components/group/AllGroups';
import { ProfileRedIcon } from '@/components/ui/icons';
import Loader from '@/components/ui/loader';
import { GroupInterface, User } from '@/utils/interface';
import { Container, Flex, Grid, Heading, Link, Spacer } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Groups = () => {
  const router = useRouter();
  const boardCode = router.query.code as string;

  useEffect(() => {
    const username = localStorage.getItem('loggedinuser');
    console.log('username', username);
    console.log('user:', localStorage.getItem('loggedinuser'));
    if (username === null) {
      router.push(`/invite/1`);
    }
  }, []);

  const {
    isLoading: loadingUser,
    isError: isUserError,
    data: userData,
    error: userError,
  } = useQuery({
    queryKey: ['userdata'],
    queryFn: async () => {
      try {
        const username = localStorage.getItem('loggedinuser');
        if (username !== null) {
          const response = await fetch(`/api/user/${username}`);
          if (!response.ok) {
            throw new Error('Request failed');
          }
          const data = await response.json();
          return data;
        }
      } catch (error) {
        router.push(`/invite/1`);
        throw new Error('Error fetching data');
      }
    },
  });

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['allgroups'],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/board/${boardCode}/group`);
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Error fetching data');
      }
    },
    enabled: boardCode !== undefined,
  });

  /*
  if (!isLoading && !isError) {
    // console.log('Data: ', data);
  }

  if (!loadingUser && !isUserError) {
    // console.log('userdata ->', userData);
  }*/

  if (isError) {
    console.error(error);
  }

  if (isLoading || loadingUser) {
    return (
      <Grid placeItems="center" height="100vh">
        <Loader />
      </Grid>
    );
  }

  const groups: GroupInterface[] = data.data;
  const user: User = userData.data;

  return (
    <Container p="1rem" width={{ base: '100vw', md: '33vw' }}>
      <Flex pt={3} px={3}>
        <Heading
          as="h1"
          size="lg"
          fontFamily="samsungSharpSans"
          color="red.3"
          fontWeight="bold"
        >
          My Group
        </Heading>
        <Spacer />
        <Link as={NextLink} href="/profile">
          <ProfileRedIcon boxSize={8} />
        </Link>
      </Flex>

      <AllGroups groups={groups} boardCode={boardCode} name={user.fullName} />
    </Container>
  );
};

export default Groups;
