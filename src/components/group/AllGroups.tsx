import { GroupInterface } from '@/utils/interface';
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
import GroupAvatar from './GroupAvatar';

const AllGroups = ({
  groups,
  boardCode,
}: {
  groups: GroupInterface[];
  boardCode: string;
}) => {
  const sliderStyle: any = {
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
                  backgroundImage="/images/Youth_Mentor_Big.png"
                  backgroundSize="cover"
                  width={{ base: '90vw', md: '40vw' }}
                  mt={5}
                  display="grid"
                  borderRadius="15px"
                  onClick={() =>
                    router.push(`/board/${boardCode}/group/${group.id}`)
                  }
                >
                  <CardBody mt="40vh">
                    <Flex alignItems="center">
                      <Box color="blackAlpha.700" fontWeight="semibold">
                        <Text color="white" fontSize="30px" pb={3}>
                          {group.name}
                        </Text>
                        <GroupAvatar />
                      </Box>
                      <Spacer />

                      {/* <Link
                      as={NextLink}
                      href={`/board/${boardCode}/group/${group.id}`}
                    >
                      <ChevronRightIcon
                        boxSize={10}
                        bg="red.2"
                        color="white"
                        borderRadius="full"
                      />
                    </Link> */}
                    </Flex>
                  </CardBody>
                </Card>
                <Flex gap="1rem" py={7}>
                  <Box
                    bg="blackAlpha.500"
                    width={{ base: '90vw', md: '40vw' }}
                    color="blackAlpha.700"
                    borderRadius="10px"
                    py={1}
                    px={4}
                  >
                    {group.events.length === 0 ? (
                      <Grid height="139px" placeItems="center">
                        <Text fontWeight="semibold" fontSize="lg">
                          No Events Planned Yet!
                        </Text>
                      </Grid>
                    ) : (
                      <Flex alignItems="center">
                        <Grid>
                          <Text
                            fontWeight="bold"
                            lineHeight="1.1"
                            fontSize="xl"
                          >
                            {group.events[0].name}
                          </Text>
                          {group.events[0].description ? (
                            <Text fontWeight="semibold" fontSize="lg">
                              {group.events[0].description}{' '}
                            </Text>
                          ) : null}
                          <Text pt={4} fontWeight="semibold" color="red.3">
                            {group.events[0].time}
                          </Text>
                        </Grid>
                        <Spacer />
                        <Calender />
                      </Flex>
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
