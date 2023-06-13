import AllGroups from '@/components/group/AllGroups';
import { ProfileRedIcon } from '@/components/ui/icons';
import Loader from '@/components/ui/loader';
import { GroupInterface } from '@/utils/interface';
import { Container, Flex, Grid, Heading, Link, Spacer } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const Groups = () => {
  const router = useRouter();
  const boardCode = router.query.code as string;

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

  if (!isLoading && !isError) {
    console.log('Data: ', data);
  }

  if (isError) {
    console.log('error,', error);
  }

  if (isLoading) {
    return (
      <Grid placeItems="center" height="100vh">
        <Loader />
      </Grid>
    );
  }

  const groups: GroupInterface[] = data.data;

  return (
    <Container p="1rem">
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

      <AllGroups groups={groups} boardCode={boardCode} />
    </Container>
  );
};

export default Groups;
