import { Button } from '@chakra-ui/react';

const JoinBtn = ({ joined }: { joined: boolean }) => {
  /** 
  const mutation = useMutation({
    mutationFn: (newUser: any) => {
      return fetch('/api/board/join/P15Ry1', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => {
          response.json();
        })
        .then((data) => data);
    },
  });

  if (mutation.isSuccess) {
    console.log('donee');
  } */

  return (
    <>
      <Button
        bg="red.3"
        color="white"
        borderRadius="33"
        px="12"
        fontSize="lg"
        colorScheme="red"
      >
        {joined ? 'Member' : 'Join'}
      </Button>
    </>
  );
};

export default JoinBtn;
