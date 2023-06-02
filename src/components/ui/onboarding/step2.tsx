import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import logo from '../../../../public/images/logo.png';

const Step2: React.FC = () => {
  return (
    <Flex align="center" justify="center" my="30" direction="column" gap={10}>
      <Image src={logo} width={130} height={130} alt="logo" />
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

export default Step2;
