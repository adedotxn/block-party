import { Flex } from '@chakra-ui/react';
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
      <Flex align="center" justify="center" my="30" direction="column" gap={10}>
        <Image src="/images/logo.png" width={50} height={50} alt="logo" />
      </Flex>
    </>
  );
}
