import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import logo from '../../../../public/images/logo.png';

interface Step1Props {
  handler: () => void;
}

const Step1: React.FC<Step1Props> = ({ handler }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      gap={10}
    >
      <Image src={logo} width={130} height={130} alt="logo" />
      <Flex
        direction="column"
        align="center"
        justify="center"
        my="30"
        position="relative"
        bg="#003566"
        w="247px"
        h="183px"
        borderRadius="9px"
        padding="10px"
        gap={'10px'}
      >
        <Avatar
          src="https://unsplash.com/photos/LyJAo9uwIfU/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGtpbmclMjBjaGFybGVzfGVufDB8fHx8MTY4NTM1MDM3MHww&force=true"
          position="absolute"
          top="-25px"
          border="3px solid #E9E9E9"
        />
        <Text
          fontWeight={700}
          fontSize="12px"
          lineHeight="15px"
          letterSpacing="-0.02em"
          color="#FFFFFF"
        >
          King Charles Street
        </Text>
        <Text
          fontWeight={700}
          fontSize="16px"
          lineHeight="15px"
          letterSpacing="-0.03em"
          color="#FFFFFF"
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
          color="#FF0000"
          textAlign="center"
          onClick={handler}
        >
          Click to join
        </Button>
      </Flex>

      <Text
        color={'#003566'}
        fontWeight={700}
        fontSize="16px"
        lineHeight="15px"
        letterSpacing="-0.03em"
        textAlign="center"
      >
        Making an impact. <br />
        Building Connections.
      </Text>
    </Flex>
  );
};

export default Step1;
