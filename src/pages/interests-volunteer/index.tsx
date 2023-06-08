import { ChevronLeftIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Card,
  Container,
  Flex,
  Grid,
  Link,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const Index = () => {
  return (
    <Container width={{ md: '60vw' }}>
      <Flex pt={4} px={1} alignItems="center">
        <Link as={NextLink} href="/">
          <ChevronLeftIcon boxSize={8} />
        </Link>

        <Spacer />
        <CloseIcon />
      </Flex>

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
            px={12}
            py={2}
            borderRadius="41px"
            fontWeight="semibold"
            fontSize="1.2rem"
            _selected={{ color: 'white', bg: '#003566' }}
          >
            Interest
          </Tab>

          <Tab
            px={12}
            py={2}
            borderRadius="41px"
            fontWeight="semibold"
            fontSize="1.2rem"
            _selected={{ color: 'white', bg: '#003566' }}
          >
            Volunteer
          </Tab>
        </TabList>

        <TabPanels mt={8}>
          {/** Events Panel */}
          <TabPanel>
            <Grid templateColumns="repeat(3, 1fr)" gap={5} placeItems="center">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, index) => (
                <Card
                  key={index}
                  width="101.3px"
                  height="95px"
                  bg="blackAlpha.600"
                ></Card>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid templateColumns="repeat(3, 1fr)" gap={5} placeItems="center">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(
                (_, index) => (
                  <Card
                    key={index}
                    width="101.3px"
                    height="95px"
                    bg="blackAlpha.600"
                  ></Card>
                )
              )}
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Index;
