import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import logo from '../../../public/images/logo.png';

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
        <Image src={logo} width={50} height={50} alt="logo" />
      </Flex>
    </>
  );
}
