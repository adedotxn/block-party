import { Spinner } from '@chakra-ui/react';

const Loader = () => {
  return (
    <Spinner
      size="xl"
      color="red.500"
      emptyColor="transparent"
      thickness="10px"
      speed="0.65s"
      background="radial-gradient(198.94% 198.94% at 150.8% 21.81%, #FF0000 0%, #FCA311 100%)"
    />
  );
};

export default Loader;
