import { Button } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface JoinProps {
  boardCode: string;
  userId: string;
  userGroups: { name: string; id: string }[];
  groupName: string;
  groupId: string;
  name: string;
}

const JoinBtn = (props: JoinProps) => {
  const { boardCode, groupId, groupName, userId, userGroups, name } = props;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser: any) => {
      return fetch(`/api/board/${boardCode}/group/${groupId}`, {
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
    onError: () => {
      toast.error('Error joining group. Try again');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userdata'] });
      queryClient.invalidateQueries({ queryKey: ['group'] });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      toast.success(`You are now a part of ${groupName}!`);
    },
  });

  const leaveGroupMutation = useMutation({
    mutationFn: async () => {
      await fetch(`/api/board/${boardCode}/group/${groupId}/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onError: () => {
      toast.error('Error leaving group. Try again');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userdata'] });
      queryClient.invalidateQueries({ queryKey: ['group'] });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      toast(`You are no longer a part of ${groupName}`);
    },
  });

  const isAGroupMember =
    userGroups.filter((group) => group.name === groupName).length === 1;

  return (
    <>
      {isAGroupMember ? (
        <Button
          bg="red.3"
          color="white"
          borderRadius="33"
          px="12"
          fontSize="lg"
          colorScheme="red"
          onClick={() => {
            leaveGroupMutation.mutate();
          }}
        >
          Leave
        </Button>
      ) : (
        <Button
          bg="btn.yellow"
          color="white"
          borderRadius="33"
          px="12"
          fontSize="lg"
          colorScheme="yellow"
          onClick={() => {
            mutation.mutate({ name, userId });
          }}
        >
          Join
        </Button>
      )}
    </>
  );
};

export default JoinBtn;
