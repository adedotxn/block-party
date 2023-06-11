import DiscussionCards from '@/components/group/DiscussionCards';
import GroupAvatar from '@/components/group/GroupAvatar';
import Coordinator from '@/components/group/coordinator';
import Events from '@/components/group/events';
import MessageBar from '@/components/group/messagebar';
import Loader from '@/components/ui/loader';
import { GroupInterface } from '@/utils/interface';
import { ChevronLeftIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
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
  const boardCode = router.query.code;
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
    <Box width={{ md: '60vw' }}>
      <Box
        backgroundImage="/images/Youth_Mentor_2.png"
        backgroundSize="cover"
        height="40vh"
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
        <Heading as="h1" size="xl" color="red.2" fontFamily="samsungSharpSans">
          {groupDetails.name}
        </Heading>
        <Text>{groupDetails.description}</Text>

        <Flex alignItems="center" my={4}>
          <GroupAvatar />
          <Spacer />
          <Button
            bg="red.3"
            color="white"
            borderRadius="33"
            px="12"
            fontSize="lg"
            colorScheme="red"
            onClick={joinGroup}
          >
            {joined ? 'Member' : 'Join'}
          </Button>
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
                <Text mt={6} fontSize="xl" fontWeight="bold" textAlign="center">
                  There are no events yet
                </Text>
              ) : (
                groupDetails.events.map((event, index) => (
                  <Events key={index} event={event} />
                ))
              )
            ) : null}

            <Grid placeItems="center" mt={4}>
              <Button
                px={16}
                rounded="full"
                colorScheme="red"
                bg="red.3"
                fontSize="lg"
              >
                Create Event
              </Button>
            </Grid>

            <Divider mt="2rem" bg="blackAlpha.900" height={0.45} />
            <Coordinator />
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
  );
};

export default Group;
