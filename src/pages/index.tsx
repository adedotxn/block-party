import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

export default function Home() {
  return (
    <>
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
