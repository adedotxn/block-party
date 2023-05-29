import Discussion from '@/components/group/Discussion';
import GroupAvatar from '@/components/group/GroupAvatar';
import Calender from '@/components/ui/calender';
import { ChevronLeftIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Heading,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const Youth = () => {
  return (
    <Container width={{ md: '60vw' }}>
      <Flex pt={4} px={4} alignItems="center">
        <Link as={NextLink} href="/groups">
          <ChevronLeftIcon boxSize={8} />
        </Link>

        <Spacer />
        <CloseIcon />
      </Flex>

      <Box display="grid" placeItems="center">
        <Card
          bg="blackAlpha.700"
          width={{ base: '90vw', md: '40vw' }}
          mt={5}
          height="40vh"
        ></Card>
      </Box>

      <Box px={4} my={7}>
        <Heading color="red.2">Youth Mentors</Heading>
        <Text>
          Support education and growth of children and teenagers by becoming a
          mentor, tutor, or coach in youth programs.
        </Text>

        <Flex alignItems="center" mt={2}>
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

      <Container px={5} my={7}>
        <Flex alignItems="center">
          <Box>
            <Text color="red.2" fontWeight="semibold">
              Organiser
            </Text>
            <Heading>Sarah Wong</Heading>
            <Text fontWeight="normal">Message</Text>
          </Box>
          <Spacer />
          <Avatar name="Sarah Wong" size="xl" />
        </Flex>
      </Container>
      <Divider bg="blackAlpha.900" height={0.4} />

      <Container py="5">
        <Heading size="md" color="red.2">
          Events
        </Heading>

        <Flex
          borderRadius="10px"
          alignItems="center"
          mt="2"
          px="7"
          bg="blackAlpha.400"
        >
          <Calender />
          <Spacer />
          <Box width="20ch">
            <Text>7:00PM GMT</Text>
            <Text fontWeight="bold" lineHeight="1.1" fontSize="lg">
              Help young people in the community in our next career sharing
              event
            </Text>
          </Box>
        </Flex>
      </Container>
      <Divider bg="blackAlpha.900" height={0.4} />

      <Discussion />
    </Container>
  );
};

export default Youth;
