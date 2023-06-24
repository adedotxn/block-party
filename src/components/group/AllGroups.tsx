import { Event, GroupInterface } from '@/utils/interface';
import {
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Calender from '../ui/calender';
import { GroupStar } from '../ui/icons';
import GroupAvatar from './GroupAvatar';

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

interface AllGroupProps {
  name: string;
  groups: GroupInterface[];
  boardCode: string;
}

const AllGroups = ({ groups, boardCode, name }: AllGroupProps) => {
  const sliderStyle: { [key: string]: string } = {
    display: 'grid',
    overflowX: 'scroll',
    placeItems: 'center',
  };

  const router = useRouter();

  return (
    <section style={{ ...sliderStyle }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {groups !== undefined
          ? groups.map((group) => (
              <div key={group.id} style={{ paddingBottom: '3rem' }}>
                <Card
                  backgroundImage={
                    imagePaths[group.name] ?? '/images/Youth_Mentor_Big.png'
                  }
                  backgroundSize="cover"
                  width={{ base: '90vw', md: '25vw' }}
                  height="60vh"
                  mt={5}
                  display="grid"
                  borderRadius="15px"
                  onClick={() =>
                    router.push(`/board/${boardCode}/group/${group.id}`)
                  }
                >
                  <CardBody>
                    <Grid>
                      {group.members.filter((member) => member.name === name)
                        .length === 1 ? (
                        // Star to signify current user is already a group member
                        <GroupStar boxSize={8} />
                      ) : null}
                      <Text
                        mt={{ base: '40vh', md: '25vh' }}
                        color="white"
                        fontSize={{ base: '30px', md: '26px' }}
                        pb={{ base: 3, md: 1 }}
                        fontWeight="semibold"
                        textShadow="2px 2px 5px black"
                      >
                        {group.name}
                      </Text>
                      <GroupAvatar members={group.members} />
                    </Grid>
                  </CardBody>
                </Card>
                <Flex gap="1rem" py={7}>
                  <Box
                    bg="grey.event"
                    borderRadius="10px"
                    width={{ base: '90vw', md: '25vw' }}
                  >
                    {group.events.length === 0 ? (
                      <Grid
                        borderRadius="10px"
                        py={1}
                        px={4}
                        height="120px"
                        placeItems="center"
                      >
                        <Text fontWeight="semibold" fontSize="lg">
                          No Events Planned Yet!
                        </Text>
                      </Grid>
                    ) : (
                      <UpcomingEvent event={group.events} />
                    )}
                  </Box>
                </Flex>
              </div>
            ))
          : null}
      </div>
    </section>
  );
};

export default AllGroups;

const UpcomingEvent = ({ event }: { event: Event[] }) => {
  const upcomingEvent = event.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )[0];

  return (
    <Flex minHeight="120px" alignItems="center" px={6} py={2}>
      <Box width="20ch" fontFamily="productSans">
        <Text fontWeight="bold" lineHeight="1.1" fontSize="2xl">
          {upcomingEvent.title}
        </Text>
        <Text
          pt={1}
          fontWeight="semibold"
          fontSize="lg"
          color="#3D3E3E"
          lineHeight="1.2"
        >
          {upcomingEvent.description}{' '}
        </Text>
        <Flex pt={1} alignItems="center" fontSize="lg" gap={1}>
          <Text fontWeight="bold" color="red.3">
            {upcomingEvent.organiser.name}
          </Text>
          <Box width={1} height={1} rounded="full" bg="red.3" />
          <Text fontWeight="light" fontSize="lg" color="red.3">
            {upcomingEvent.startTime ? upcomingEvent.startTime : null}
          </Text>
        </Flex>
      </Box>
      <Spacer />
      <Calender date={upcomingEvent.date} />
    </Flex>
  );
};
