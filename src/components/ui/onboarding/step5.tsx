/* eslint-disable no-unused-vars */
import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Stack,
} from '@chakra-ui/react';
import { useMemo } from 'react';

type VolunteerActivitiesCheckboxGroupProps = {
  value: string[];
  onChange: (selectedOptions: string[]) => void;
  submitHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const volunteerActivitiesOptions: string[] = [
  'Environment Cleanup',
  'Teaching',
  'Fundraising',
  'Community Service',
  'Mentoring',
  'Event Planning',
  'Animal Shelter',
  'Elderly Care',
  'Homeless Support',
  'Disaster Relief',
];

function VolunteerActivitiesCheckboxGroup({
  value,
  onChange,
  submitHandler,
}: VolunteerActivitiesCheckboxGroupProps) {
  const disabledOptions = useMemo(
    () => (value.length === 6 ? new Set(value) : new Set()),
    [value]
  );

  const handleActivitiesChange = (selectedOptions: string[]) => {
    if (selectedOptions.length <= 6) {
      onChange(selectedOptions);
    }
  };

  return (
    <FormControl mt={4}>
      <FormLabel>Volunteer Activities (Select up to 6)</FormLabel>
      <CheckboxGroup
        colorScheme="green"
        onChange={handleActivitiesChange}
        value={value}
      >
        <Stack spacing={2}>
          {volunteerActivitiesOptions.map((activity) => (
            <Checkbox
              key={activity}
              value={activity}
              isChecked={value.includes(activity)}
              isDisabled={disabledOptions.has(activity)}
            >
              {activity}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
      <Button mt={4} colorScheme="teal" onClick={submitHandler} w="100%">
        Create Profile
      </Button>
    </FormControl>
  );
}

export default VolunteerActivitiesCheckboxGroup;
