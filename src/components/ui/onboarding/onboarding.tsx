import { Box, Button, Container, Stack, Step, Stepper } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';

type Interest = string;
type VolunteerActivity = string;

const Onboarding = () => {
  const [step, setStep] = useState<number>(1);
  const [fullName, setFullName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [interests, setInterests] = useState<Interest[]>([]);
  const [volunteerActivities, setVolunteerActivities] = useState<
    VolunteerActivity[]
  >([]);
  const router = useRouter();

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      fullName,
      username,
      interests,
      volunteerActivities,
    };
    console.log(formData);
    /* handler(); */
    router.push('/profile');
  };

  const handleInterestsChange = (selectedOptions: Interest[]) => {
    if (selectedOptions.length <= 6) {
      setInterests(selectedOptions);
    }
  };

  const handleVolunteerActivitiesChange = (
    selectedOptions: VolunteerActivity[]
  ) => {
    if (selectedOptions.length <= 6) {
      setVolunteerActivities(selectedOptions);
    }
  };

  return (
    <Container maxW="md" mt={8}>
      <Stepper activeStep={step} colorScheme="teal">
        <Step label="Step 1" />
        <Step label="Step 2" />
        <Step label="Step 3" />
        <Step label="Step 4" />
        <Step label="Step 5" />
        <Step label="Step 6" />
      </Stepper>
      <Box mt={8} p={4} borderWidth={1} borderRadius="md">
        {step === 1 && (
          <Stack spacing={4}>
            <Step1 handler={handleNext} />
          </Stack>
        )}
        {step === 2 && (
          <Stack spacing={4}>
            <Step2 />
            <Button colorScheme="teal" onClick={handleNext}>
              Next
            </Button>
          </Stack>
        )}
        {step === 3 && (
          <Stack spacing={4}>
            <Step3
              fullName={fullName}
              username={username}
              setUsername={setUsername}
              setFullName={setFullName}
            />
            <Button colorScheme="teal" onClick={handleNext}>
              Next
            </Button>
          </Stack>
        )}
        {step === 4 && (
          <Stack spacing={4}>
            <Step4 value={interests} onChange={handleInterestsChange} />

            <Button colorScheme="teal" onClick={handleNext}>
              Next
            </Button>
          </Stack>
        )}
        {step === 5 && (
          <Stack spacing={4}>
            <Step5
              submitHandler={handleSubmit}
              value={volunteerActivities}
              onChange={handleVolunteerActivitiesChange}
            />
          </Stack>
        )}
      </Box>
    </Container>
  );
};

export default Onboarding;
