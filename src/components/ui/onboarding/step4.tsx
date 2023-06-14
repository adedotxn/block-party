import { Flex, Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

interface Step4Props {
  username: string;
  fullName: string;
  interests: string[];
}

const Step4: React.FC<Step4Props> = ({ username, fullName, interests }) => {
  const router = useRouter();

  const handleCreateUser = useCallback(async () => {
    const user = {
      username,
      fullName,
      interests,
    };
    //const userString = JSON.stringify(user);

    try {
      const response = await fetch('/api/board/join/P15Ry1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        await response.json();
        localStorage.setItem('loggedinuser', user.username);
        router.push('/board/P15Ry1/groups');
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  }, [username, fullName, interests, router]);

  useEffect(() => {
    handleCreateUser();
  }, [handleCreateUser]);

  return (
    <Flex
      height="100vh"
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap={10}
      p={10}
    >
      <Text
        marginBottom="2"
        fontWeight="700"
        fontSize="xl"
        lineHeight="25px"
        color="#3D3D3E"
      >
        Almost there
      </Text>
      <Spinner
        size="xl"
        color="red.500"
        emptyColor="transparent"
        thickness="10px"
        speed="0.65s"
        background="radial-gradient(198.94% 198.94% at 150.8% 21.81%, #FF0000 0%, #FCA311 100%)"
      />
      <Text
        marginBottom="2"
        fontWeight="700"
        fontSize="xl"
        lineHeight="25px"
        color="#3D3D3E"
        textAlign="center"
      >
        Your personalised group recommendations are on the way!
      </Text>
    </Flex>
  );
};

export default Step4;
