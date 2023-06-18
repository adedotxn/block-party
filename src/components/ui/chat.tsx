import { Grid } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import DiscussionCards from '../group/DiscussionCards';

type ChatProps = {
  boardCode: string;
  groupId: string;
  chatsdata: any;
};

/* type Chat = {
  name: string;
  username: string;
  user: any;
  text: string;
  createdAt: string;
};
const [chats, setChats] = useState<Chat[]>([]); */

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
            const dateA: any = new Date(a.createdAt);
            const dateB: any = new Date(b.createdAt);
            return dateA - dateB;
          });
          setChats(sortedChats);
        } else {
          console.error('Error fetching chats:', response.status);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [boardCode, groupId, setChats]);

  return (
    <Grid mt={12} gap="2rem" pb={20}>
      {console.log(chats)}
      {chats.map((post, index) => (
        <DiscussionCards
          key={index}
          name={post.user.fullName}
          username={post.user.username}
          text={post.text}
          time={post.createdAt}
        />
      ))}
    </Grid>
  );
};

export default Chats;
