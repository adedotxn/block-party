import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { MessageIcon } from '../ui/icons';

const MessageBar = () => {
  return (
    <form
      action=""
      style={{
        position: 'fixed',
        bottom: '3.5rem',
        width: '100vw',
        left: '0',
      }}
    >
      <Box p="3" px={10} bg="#D9D9D9" mt={7}>
        <InputGroup width="80vw">
          <InputRightElement pointerEvents="none">
            <IconButton
              size="sm"
              display="grid"
              placeItems="center"
              aria-label="Send Message"
              bg="blackAlpha.700"
              borderRadius="26px"
              icon={<MessageIcon color="white" boxSize={4} />}
            />
          </InputRightElement>
          <Input py="1rem" borderRadius="26px" bg="white" type="text" />
        </InputGroup>
      </Box>
    </form>
  );
};

export default MessageBar;
