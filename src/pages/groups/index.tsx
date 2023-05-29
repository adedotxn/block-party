import AllGroups from '@/components/group/AllGroups';
import Calender from '@/components/ui/calender';
import styles from '@/styles/groups.module.css';
import { Avatar, Box, Container, Flex, Spacer, Text } from '@chakra-ui/react';
import Link from 'next/link';

const Groups = () => {
  return (
    <Container>
      <header className={styles.header}>
        <h1>My Group</h1>
        <Link href={'/'}>Show all</Link>
      </header>

      <AllGroups />

      <div className={styles.group_reminders}>
        <Flex>
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
              <Avatar
                name="Sarah Wong"
                position="absolute"
                bottom={{ base: '8.5rem', md: '9rem' }}
                left={{ base: '3rem', md: '22rem' }}
                border="2px"
                borderColor="white"
                size="md"
              />
              <Flex alignItems="center">
                <Text
                  fontWeight="bold"
                  lineHeight="1.1"
                  fontSize="lg"
                  width="24ch"
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
      </div>
    </Container>
  );
};

export default Groups;
