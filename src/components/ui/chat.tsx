import { Grid } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import DiscussionCards from '../group/DiscussionCards';

type ChatProps = {
  boardCode: string;
  groupId: string;
  chatsdata: any;
};

type Chat = {
  name: string;
  username: string;
  user: any;
  text: string;
  createdAt: string;
};

const formattedDate = (timestamp: any) => {
  const date = new Date(timestamp.seconds * 1000);
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

const Chats: React.FC<ChatProps> = ({ boardCode, groupId, chatsdata }) => {
  const [chats, setChats] = chatsdata;
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(
          `/api/board/${boardCode}/group/posts/${groupId}`
        );
        if (response.ok) {
          const data = await response.json();
          const sortedChats = data.data.sort((a: any, b: any) => {
            const dateA: any = new Date(a.createdAt.seconds);
            const dateB: any = new Date(b.createdAt.seconds);
            return dateA - dateB;
          });
          setChats(sortedChats);
          console.log(chats);
        } else {
          console.error('Error fetching chats:', response.status);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardCode, groupId, setChats]);

  return (
    <Grid mt={12} gap="2rem" pb={20}>
      {chats.map((post: Chat, index: number) => (
        <DiscussionCards
          key={index}
          name={post.user.fullName}
          username={post.user.username}
          text={post.text}
          time={formattedDate(post.createdAt)}
        />
      ))}
    </Grid>
  );
};

export default Chats;
