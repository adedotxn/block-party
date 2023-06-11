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

  const sliderStyle: any = {
    display: 'grid',
    overflowX: 'scroll',
    placeItems: 'center',
  };

  return (
    <Container p="1rem">
      <Flex>
        <Heading as="h1" size="lg" fontFamily="samsungSharpSans">
          My Group
        </Heading>
        <Spacer />
        <Link as={NextLink} href="/profile">
          <ProfileRedIcon boxSize={8} />
        </Link>
      </Flex>

      <AllGroups groups={groups} boardCode={boardCode} />

      {/* <div
        style={{
          marginTop: '2rem',
          paddingBottom: '4rem',
          ...sliderStyle,
        }}
      >
        <Flex gap="1rem">
          {[0, 1, 2, 3, 4].map((_, index) => (
            <Box
              key={index}
              bg="blackAlpha.500"
              width={{ base: '90vw', md: '40vw' }}
              color="blackAlpha.700"
              borderRadius="10px"
              py={1}
              px={4}
            >
              <Flex alignItems="center">
                <Text
                  fontWeight="bold"
                  lineHeight="1.1"
                  fontSize="lg"
                  width="22ch"
                >
                  Help young people in the community in our next career sharing
                  event
                </Text>
                <Spacer />
                <Calender />
              </Flex>
            </Box>
          ))}
        </Flex>
      </div> */}
    </Container>
  );
};

export default Groups;
