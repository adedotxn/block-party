import styles from '@/styles/groups.module.css';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  CardBody,
  Flex,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import GroupAvatar from './GroupAvatar';

const AllGroups = () => {
  return (
    <section className={styles.allgroups}>
      <div>
        {[0, 1, 2, 3, 4].map((_, index) => (
          <Card
            bg="blackAlpha.500"
            width={{ base: '90vw', md: '40vw' }}
            mt={5}
            // height={{ base: '60vh', md: '30vh' }}
            display="grid"
            key={index}
            borderRadius="15px"
          >
            <CardBody mt="40vh">
              <Flex alignItems="center">
                <Box
                  fontSize="30px"
                  color="blackAlpha.700"
                  fontWeight="semibold"
                >
                  <Text>Youth Mentors</Text>
                  <GroupAvatar />
                </Box>
                <Spacer />

                <Link as={NextLink} href="/groups/1">
                  <ChevronRightIcon
                    boxSize={10}
                    bg="red.2"
                    color="white"
                    borderRadius="full"
                  />
                </Link>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AllGroups;
