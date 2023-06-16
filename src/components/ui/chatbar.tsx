import {
  Avatar,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

type ChatBarProps = {
  boardCode: string;
  username: string;
  userId: string;
  groupId: string;
};

const ChatBar: React.FC<ChatBarProps> = ({
  boardCode,
  groupId,
  userId,
  username,
}) => {
  const [message, setMessage] = useState('');
  const chatBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBarRef.current) {
      chatBarRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [message]);

  const handleSendMessage = async () => {
    console.log({ boardCode, groupId, text: message, userId, username });

    try {
      const response = await fetch(
        `/api/board/${boardCode}/group/post/${groupId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: message, userId, username }),
        }
      );

      if (response.ok) {
        // Handle success
        console.log('Message sent successfully!');
        setMessage('');
      } else {
        // Handle error
        console.error('Error sending message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <Flex
      direction="column"
      align="center"
      bg="gray.100"
      p={5}
      position="fixed"
      bottom={0}
      left={0}
      width="100vw"
      zIndex={999}
    >
      <div ref={chatBarRef} />
      <Flex align="center" width="100%" maxWidth="600px" gap={4}>
        <Avatar
          size="sm"
          name={username}
          src="/avatar.png"
          border="1px solid #ffff"
        />

        <InputGroup
          size="md"
          display="flex"
          alignItems="center"
          justifyContent={'center'}
          outline="1px solid black"
          padding={2}
          borderRadius={50}
        >
          <Input
            pr="4.5rem"
            type={'text'}
            placeholder="Type your message..."
            value={message}
            onChange={handleMessageChange}
            variant="unstyled"
            bg="#F5F5F5"
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              aria-label="Send"
              size="sm"
              variant="ghost"
              onClick={handleSendMessage}
            >
              <Image
                src="/icons/chatbtn.svg"
                width={40}
                height={40}
                alt="send"
              />
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Flex>
  );
};

export default ChatBar;
