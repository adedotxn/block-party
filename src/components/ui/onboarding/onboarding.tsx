import { Box, Stack, Step, Stepper } from '@chakra-ui/react';
import { useState } from 'react';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [interests, setInterests] = useState([]);
  //const [volunteerActivities, setVolunteerActivities] = useState([]);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = () => {
    console.log({ fullName, username, interests });
    //router.push('/profile');
  };

  const handleInterestsChange = (selectedOptions: any) => {
    if (selectedOptions.length <= 6) {
      setInterests(selectedOptions);
    }
  };

  /*  const handleVolunteerActivitiesChange = (selectedOptions) => {
    if (selectedOptions.length <= 6) {
      setVolunteerActivities(selectedOptions);
    }
  }; */

  return (
    <Box>
      <Stepper index={step} colorScheme="teal">
        <Step key="Step 1" />
        <Step key="Step 2" />
        <Step key="Step 3" />
        <Step key="Step 4" />
        <Step key="Step 5" />
        <Step key="Step 6" />
      </Stepper>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        width="100%"
      >
        <Box maxWidth="100%" width="100%">
          {' '}
          {/* Added width="100%" */}
          {step === 1 && (
            <Stack spacing={4}>
              <Step1 handler={handleNext} />
            </Stack>
          )}
          {step === 2 && (
            <Stack spacing={4}>
              <Step2
                fullName={fullName}
                username={username}
                setUsername={setUsername}
                setFullName={setFullName}
                handleNext={handleNext}
              />
            </Stack>
          )}
          {step === 3 && (
            <Stack spacing={4}>
              <Step3
                handleNext={handleNext}
                user={fullName}
                value={interests}
                onChange={handleInterestsChange}
              />
            </Stack>
          )}
          {step === 4 && (
            <Stack spacing={4}>
              <Step4
                username={username}
                fullName={fullName}
                interests={interests}
              />
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Onboarding;
