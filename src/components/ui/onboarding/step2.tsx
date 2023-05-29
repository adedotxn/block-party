import { Flex } from '@chakra-ui/react';
import Image from 'next/image';
import logo from '../../../../public/images/logo.png';

const Step2: React.FC = () => {
  return (
    <Flex align="center" justify="center" my="30" direction="column" gap={10}>
      <Image src={logo} width={50} height={50} alt="logo" />
    </Flex>
  );
};

export default Step2;
