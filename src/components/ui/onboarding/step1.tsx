import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import logo from '../../../../public/images/logo.png';

interface Step1Props {
  handler: () => void;
}

const Step1: React.FC<Step1Props> = ({ handler }) => {
  return (
    <Flex align="center" justify="center" my="30" direction="column" gap={10}>
      <Image src={logo} width={50} height={50} alt="logo" />
      <Flex
        direction="column"
        align="center"
        justify="center"
        my="30"
        position="relative"
        bg="#C3C3C3"
        w="247px"
        h="183px"
        borderRadius="9px"
        padding="10px"
        gap={'10px'}
      >
        <Avatar
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
          position="absolute"
          top="-25px"
          border="2px solid #E9E9E9"
        />
        <Text
          fontWeight={700}
          fontSize="12px"
          lineHeight="15px"
          letterSpacing="-0.02em"
          color="#595959"
        >
          John Doe
        </Text>
        <Text
          fontWeight={700}
          fontSize="16px"
          lineHeight="15px"
          letterSpacing="-0.03em"
          color="#626262"
          textAlign="center"
        >
          You&apos;ve been invited to join a block party.
        </Text>
        <Button
          w="109px"
          h="28px"
          bg="#D9D9D9"
          borderRadius="38px"
          fontWeight={700}
          fontSize="12px"
          lineHeight="15px"
          letterSpacing="-0.02em"
          color="#595959"
          textAlign="center"
          onClick={handler}
        >
          Click to join
        </Button>
      </Flex>

      <Text>
        Making an impact. <br />
        Building Connections.
      </Text>
    </Flex>
  );
};

export default Step1;
