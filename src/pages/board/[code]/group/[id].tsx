import CreateEvent from '@/components/group/CreateEvent';
import GroupAvatar from '@/components/group/GroupAvatar';
import JoinBtn from '@/components/group/JoinBtn';
import Events from '@/components/group/events';
import Chats from '@/components/ui/chat';
import ChatBar from '@/components/ui/chatbar';
import Loader from '@/components/ui/loader';
import { GroupInterface, User } from '@/utils/interface';
import { ChevronLeftIcon } from '@chakra-ui/icons';
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
import { useEffect, useState } from 'react';

type Chat = {
  name: string;
  username: string;
  user: any;
  text: string;
  createdAt: string;
};

const imagePaths: { [key: string]: string } = {
  'Popcorn Munchers': '/images/Popcorn_Munchers.jpg',
  'Game Warriors': '/images/Game_Warriors.jpg',
  'Boardgame Guild': '/images/Boardgame_Guild.jpg',
  Footballers: '/images/Footballers.jpg',
  // 'Outdoor Explorers': '/images/Outdoor_Explorers.jpg',
  'Book Worms': '/images/Book_Worms.jpg',
  'Green Thumbs': '/images/Green_Thumbs.jpg',
  'Fitness Warriors': '/images/Fitness_Warriors.jpg',
  Crafters: '/images/Crafters.jpg',
  'Cats Lovers': '/images/Cats_Lovers.jpg',
};

const Group = () => {
  const router = useRouter();
  const boardCode = router.query.code as string;
  const groupId = router.query.id;

  const [chats, setChats] = useState<Chat[]>([]);

  //redirect to invite page if not already invited
  useEffect(() => {
    const username = localStorage.getItem('loggedinuser');
    if (username === null) {
      router.push(`/invite/1`);
    }
  }, []);

  // get user data with username
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

  // get inidividual group data with it's id
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

  const groupDetails: GroupInterface = data.data;
  const userDetails: User = userData.data;

  return (
    <Box display="grid" placeItems="center">
      <Box width={{ md: '40vw' }}>
        <Box
          backgroundImage={
            imagePaths[groupDetails.name] ?? '/images/Youth_Mentor_Big.png'
          }
          backgroundSize="cover"
          height="45vh"
          borderBottomRadius="1.3rem"
          width={{ base: '100vw', md: '40vw' }}
        >
          <Link as={NextLink} href={`/board/${boardCode}/groups`}>
            <ChevronLeftIcon
              mt={4}
              mx={2}
              boxSize={8}
              color="white"
              onClick={() => router.push(`/board/${boardCode}/groups`)}
            />
          </Link>
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
            {groupDetails.description}
          </Text>

          <Flex alignItems="center" my={4}>
            <GroupAvatar members={groupDetails.members} />
            <Spacer />
            <JoinBtn
              boardCode={boardCode}
              groupId={groupDetails.id}
              groupName={groupDetails.name}
              userId={userDetails.userId}
              name={userDetails.fullName}
              userGroups={userDetails.groups}
            />
          </Flex>
        </Box>
        <Divider bg="blackAlpha.900" height={0.4} />

        <Tabs
          isFitted
          display="grid"
          placeItems="center"
          pb="3rem"
          variant="unstyled"
          mt={8}
        >
          <TabList bg="grey.tab" borderRadius="41px" fontSize="18px">
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
                  // all events cards
                  groupDetails.events
                    .sort(
                      (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    )
                    .map((event, index) => <Events key={index} event={event} />)
                )
              ) : null}

              {/** button for creating events */}
              {groupDetails.members.filter(
                (member) => member.id === userDetails.userId
              ).length === 1 ? (
                <Grid placeItems="center" mt={6}>
                  <CreateEvent
                    boardCode={boardCode}
                    groupId={groupDetails.id}
                    organiserId={userDetails.userId}
                    organiserName={userDetails.fullName}
                  />
                </Grid>
              ) : null}
            </TabPanel>

            {/** Discussions Panel */}
            <TabPanel>
              <Grid mt={12} gap="2rem" pb={20}>
                <Chats
                  boardCode={boardCode}
                  groupId={groupDetails.id}
                  chatsdata={[chats, setChats]}
                />
              </Grid>
              {groupDetails.members.filter(
                (member) => member.name === userDetails.fullName
              ).length === 1 ? (
                <Grid placeItems="center" mt={6}>
                  <ChatBar
                    boardCode={boardCode}
                    groupId={groupDetails.id}
                    fullName={userDetails.fullName}
                    userId={userDetails.userId}
                    username={userDetails.username}
                    chatsdata={[chats, setChats]}
                  />
                </Grid>
              ) : null}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Group;
