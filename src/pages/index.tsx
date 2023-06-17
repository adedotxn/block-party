import { Flex, Text } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>The Block Party</title>
        <meta
          name="description"
          content="Making an impact. Building Connections"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        height="100vh"
        width={'100%'}
        gap={20}
      >
        <Image src="/images/logo.png" width={150} height={80} alt="logo" />

        <Text
          color={'#00000'}
          fontFamily="productSans"
          fontWeight={700}
          fontSize="lg"
          lineHeight="15px"
          letterSpacing="-0.03em"
          textAlign="center"
        >
          Make friends in
          <br />
          your neigbourhood.
        </Text>
      </Flex>
    </>
  );
}
