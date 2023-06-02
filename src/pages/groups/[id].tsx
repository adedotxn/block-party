import DiscussionCards from '@/components/group/DiscussionCards';
import GroupAvatar from '@/components/group/GroupAvatar';
import Coordinator from '@/components/group/coordinator';
import Events from '@/components/group/events';
import MessageBar from '@/components/group/messagebar';
import { ChevronLeftIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
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
import NextLink from 'next/link';

const Group = () => {
  return (
    <Container width={{ md: '60vw' }}>
      <Flex pt={4} px={1} alignItems="center">
        <Link as={NextLink} href="/groups">
          <ChevronLeftIcon boxSize={8} />
        </Link>

        <Spacer />
        <CloseIcon />
      </Flex>

      <Box px={4} my={2}>
        <Heading as="h1" size="2xl" color="red.2">
          Youth Mentors
        </Heading>
        <Text>
          Support education and growth of children and teenagers by becoming a
          mentor, tutor, or coach in youth programs.
        </Text>

        <Flex alignItems="center" mt={6}>
          <GroupAvatar />
          <Spacer />
          <Button
            bg="red.3"
            color="white"
            borderRadius="33"
            px="12"
            fontSize="20"
            colorScheme="red"
          >
            Join
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
            _selected={{ color: 'white', bg: '#003566' }}
          >
            Events
          </Tab>

          <Tab
            px={16}
            py={2}
            borderRadius="41px"
            fontWeight="semibold"
            fontSize="1.2rem"
            _selected={{ color: 'white', bg: '#003566' }}
          >
            Chat
          </Tab>
        </TabList>

        <TabPanels>
          {/** Events Panel */}
          <TabPanel>
            {[0, 1, 2].map((_, index) => (
              <Events key={index} />
            ))}
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
            <MessageBar />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Group;
