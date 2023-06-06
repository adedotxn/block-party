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

  const defaultGroups = [
    { name: 'Youth Mentors' },
    {
      name: '🎨 Crafters',
    },
    {
      name: '📚 Book Worms',
    },
    {
      name: '⚽️ Footballers',
    },
    {
      name: '🎵 Music Lovers',
    },
    {
      name: '🌿 Green Thumbs',
    },
    {
      name: '🍳 Foodies',
    },
    {
      name: '🎮 Game Warriors',
    },
    {
      name: '🏋️  Fitness Warriors',
    },
    {
      name: '🎥 Popcorn Munchers',
    },
    {
      name: '🐶 Dogs Lovers',
    },
    {
      name: '🐈 Cats Lovers',
    },
    {
      name: '🚴 Cycling Fanatics',
    },
    {
      name: '🧘 Zen Seekers',
    },
    {
      name: '📸 Shutterbugs',
    },
    {
      name: '🎲 Boardgame Guild',
    },
    {
      name: '🤝 Social Butterflies',
    },
    {
      name: '🏞️ Outdoor Explorers',
    },
    {
      name: '💃 Rhythm Rebels',
    },
  ];
  return (
    <section style={{ ...sliderStyle }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {defaultGroups.map((group, index) => (
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
                  <Text pb={3}>{group.name}</Text>
                  <GroupAvatar />
                </Box>
                <Spacer />

                <Link as={NextLink} href={`/groups/${index}`}>
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
