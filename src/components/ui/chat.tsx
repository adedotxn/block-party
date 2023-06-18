import { Grid } from '@chakra-ui/react';
import React, { useState } from 'react';
import DiscussionCards from '../group/DiscussionCards';

type ChatProps = {
  boardCode: string;
  groupId: string;
};

type Chat = {
  name: string;
  username: string;
  user: any;
  text: string;
  createdAt: string;
};

const Chats: React.FC<ChatProps> = ({ boardCode, groupId }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  // useEffect(() => {
  //   const fetchChats = async () => {
  //     try {
  //       const response = await fetch(
  //         `/api/board/${boardCode}/group/posts/${groupId}`
  //       );
  //       if (response.ok) {
  //         const data = await response.json();
  //         setChats(data.data);
  //       } else {
  //         console.error('Error fetching chats:', response.status);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching chats:', error);
  //     }
  //   };

  //   fetchChats();
  // }, [groupId, chats]);

  return (
    <Grid mt={12} gap="2rem" pb={20}>
      {chats !== undefined &&
        chats.map((post, index) => (
          <DiscussionCards
            key={index}
            name={post.user.username}
            username={post.user.username}
            text={post.text}
            time={post.createdAt}
          />
        ))}
    </Grid>
  );
};

export default Chats;
