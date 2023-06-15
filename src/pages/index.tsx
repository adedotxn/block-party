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
        my="30"
        direction="column"
        gap={10}
        w={'100vw'}
        h="100vh"
      >
        <Image src="/images/logo.png" width={150} height={170} alt="logo" />
        <Text textAlign={'center'} color="#3D3D3E" fontSize={'medium'}>
          Make friends <br /> in your neighbourhood
        </Text>
      </Flex>
    </>
  );
}
