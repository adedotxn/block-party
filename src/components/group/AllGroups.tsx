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
  const sliderStyle: any = {
    display: 'grid',
    overflowX: 'scroll',
    placeItems: 'center',
  };
  return (
    <section style={{ ...sliderStyle }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
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
