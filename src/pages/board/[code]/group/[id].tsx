import CreateEvent from '@/components/group/CreateEvent';
import DiscussionCards from '@/components/group/DiscussionCards';
import GroupAvatar from '@/components/group/GroupAvatar';
import JoinBtn from '@/components/group/JoinBtn';
import Events from '@/components/group/events';
import MessageBar from '@/components/group/messagebar';
import Loader from '@/components/ui/loader';
import { GroupInterface } from '@/utils/interface';
import { ChevronLeftIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Link,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Group = () => {
  const router = useRouter();
  const boardCode = router.query.code as string;
  const groupId = router.query.id;

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['group'],
    queryFn: async () => {
      try {
        const response = await fetch(
          `/api/board/${boardCode}/group/${groupId}`
        );
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Error fetching data');
      }
    },
    enabled: boardCode !== undefined && groupId !== undefined,
  });

  const [joined, setJoined] = useState(false);

  const joinGroup = () => {
    return joined ? setJoined(false) : setJoined(true);
  };

  if (!isLoading && !isError) {
    console.log('Group Data: ', data);
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

  const groupDetails: GroupInterface = data.data;

  return (
    <Box display="grid" placeItems="center">
      <Box width={{ md: '40vw' }}>
        <Box
          backgroundImage="/images/Youth_Mentor_2.png"
          backgroundSize="cover"
          height="45vh"
          borderBottomRadius="1.3rem"
          width={{ base: '100vw', md: '40vw' }}
        >
          <Flex pt={4} px={2} alignItems="center">
            <Link as={NextLink} href={`/board/${boardCode}/groups`}>
              <ChevronLeftIcon
                boxSize={8}
                color="white"
                onClick={() => router.push(`/board/${boardCode}/groups`)}
              />
            </Link>

            <Spacer />
            <CloseIcon color="white" />
          </Flex>
        </Box>

        <Box px={4} mb={2} mt={6}>
          <Heading
            as="h1"
            size="xl"
            color="red.2"
            fontFamily="samsungSharpSans"
          >
            {groupDetails.name}
          </Heading>
          {/* <Text>{groupDetails.description}</Text> */}
          <Text fontFamily="productSans" lineHeight={1} fontSize="md">
            {' '}
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel
            reiciendis sint, ipsum nobis accusantium eum accusamus iste
            recusandae possimus expedita?{' '}
          </Text>

          <Flex alignItems="center" my={4}>
            <GroupAvatar />
            <Spacer />
            <JoinBtn joined={joined} />
          </Flex>
        </Box>
        <Divider bg="blackAlpha.900" height={0.4} />

        {/* <Discussion /> */}

        <Tabs
          isFitted
          display="grid"
          placeItems="center"
          pb="3rem"
          variant="unstyled"
          mt={8}
        >
          <TabList bg="#D9D9D9" borderRadius="41px" fontSize="18px">
            <Tab
              px={16}
              py={2}
              borderRadius="41px"
              fontWeight="semibold"
              fontSize="1.2rem"
              _selected={{ color: 'white', bg: 'red.3' }}
            >
              Events
            </Tab>

            <Tab
              px={16}
              py={2}
              borderRadius="41px"
              fontWeight="semibold"
              fontSize="1.2rem"
              _selected={{ color: 'white', bg: 'red.3' }}
            >
              Chat
            </Tab>
          </TabList>

          <TabPanels>
            {/** Events Panel */}
            <TabPanel>
              {groupDetails.events ? (
                groupDetails.events.length === 0 ? (
                  <Text
                    mt={6}
                    fontSize="xl"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    There are no events yet
                  </Text>
                ) : (
                  groupDetails.events.map((event, index) => (
                    <Events key={index} event={event} />
                  ))
                )
              ) : null}

              <Grid placeItems="center" mt={4}>
                <CreateEvent boardCode={boardCode} groupId={groupDetails.id} />
              </Grid>
            </TabPanel>

            {/** Discussions Panel */}
            <TabPanel>
              <Grid mt={12} gap="2rem" pb={20}>
                {[
                  { name: 'Philip Adewole', username: 'Philip The Great' },
                  { name: 'Sarah Wong', username: 'Sarah The Magneficent' },
                  { name: 'Assad', username: 'nottherealalanturing' },
                ].map((post, index) => (
                  <DiscussionCards
                    key={index}
                    name={post.name}
                    username={post.username}
                  />
                ))}
              </Grid>
              {joined ? <MessageBar /> : null}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Group;
