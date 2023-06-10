import { Flex, Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

interface Step4Props {
  username: string;
  fullName: string;
  interests: string[];
}

const Step4: React.FC<Step4Props> = ({ username, fullName, interests }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateUser = useCallback(async () => {
    setIsLoading(true);

    const user = {
      username,
      fullName,
      interests,
    };
    const role = 'member';

    try {
      const response = await fetch('/api/user/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, role }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle success, e.g., redirect to a success page
        console.log(data);
        localStorage.setItem('loggedinuser', username); //used to retrieve user later
        router.push('/profile');
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error: any) {
      console.error('Error:', error.message);
    }

    setIsLoading(false);
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
