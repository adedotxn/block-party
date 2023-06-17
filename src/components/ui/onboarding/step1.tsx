import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
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
      height="100vh"
      width={'100%'}
      bg={'#FCA311'}
    >
      <Box>
        {' '}
        {/* Limit the content width to 90% of the viewport */}
        <Flex direction="column" align="center" gap={10}>
          <Image src={logo} width={130} height={130} alt="logo" />
          <Flex
            direction="column"
            align="center"
            justify="center"
            my="30"
            w="100%" // Set the width to 100% of the container
            maxWidth="247px" // Set the maximum width
            borderRadius="9px"
            padding="10px"
            gap={'10px'}
            background="#FFFFFF"
          >
            <Avatar
              src="https://unsplash.com/photos/LyJAo9uwIfU/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGtpbmclMjBjaGFybGVzfGVufDB8fHx8MTY4NTM1MDM3MHww&force=true"
              border="3px solid #E9E9E9"
            />
            <Text
              fontWeight={700}
              fontSize="12px"
              lineHeight="15px"
              letterSpacing="-0.02em"
              color="#CC2900"
            >
              King Charles Street
            </Text>
            <Text
              fontWeight={700}
              fontSize="16px"
              lineHeight="15px"
              letterSpacing="-0.03em"
              color="#3D3D3E"
              textAlign="center"
            >
              You&apos;ve been invited to join a block party.
            </Text>
            <Button
              w="109px"
              h="28px"
              bg="#FCA311"
              borderRadius="38px"
              fontWeight={700}
              fontSize="12px"
              lineHeight="15px"
              letterSpacing="-0.02em"
              color="#FFFF"
              textAlign="center"
              onClick={handler}
            >
              Click to join
            </Button>
          </Flex>

          <Text
            color={'#003566'}
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
      </Box>
    </Flex>
  );
};

export default Step1;
