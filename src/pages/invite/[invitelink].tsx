import OnboardingPage from '@/components/ui/onboarding/onboarding';
import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import logo from '/public/images/logo.png';

import { NextPage } from 'next';

const InvitePage: NextPage = () => {
  const router = useRouter();
  const { invitelink } = router.query;

  const isValidInvite = validateInviteLink(invitelink as string);

  if (isValidInvite) {
    return <OnboardingPage />;
  } else {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        height="100vh"
        width={'100%'}
        bg={'#FCA311'}
      >
        <Box>
          <Flex direction="column" align="center" gap={10}>
            <Image src={logo} width={130} height={130} alt="logo" />
            <Flex
              direction="column"
              align="center"
              justify="center"
              my="30"
              w="100%" // Set the width to 100% of the container
              maxWidth="247px" // Set the maximum width
              borderRadius="9px"
              padding="10px"
              gap={'10px'}
              background="#FFFFFF"
            >
              <Text
                fontWeight={700}
                fontSize="lg"
                lineHeight="15px"
                letterSpacing="-0.02em"
                color="#CC2900"
              >
                Invalid Invite Link
              </Text>
              <Text
                fontWeight={500}
                fontSize="xl"
                lineHeight="22px"
                letterSpacing="-0.03em"
                color="#3D3D3E"
                textAlign="center"
              >
                The invite link you used is either invalid or has been revoked.
                Please double-check the link and try again. If you believe this
                is an error, please contact your board facilitator for
                assistance.
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    );
  }
};

const demoLink = 'p15ry1';

const validateInviteLink = (inviteLink: string) => {
  if (inviteLink !== undefined) {
    return demoLink === inviteLink.toLowerCase();
  }
};

export default InvitePage;
