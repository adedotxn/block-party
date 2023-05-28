import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Stack,
} from '@chakra-ui/react';
import { useMemo } from 'react';

type InterestsCheckboxGroupProps = {
  value: string[];
  onChange: (selectedOptions: string[]) => void;
};

const interestsOptions: string[] = [
  'Sports',
  'Music',
  'Art',
  'Technology',
  'Cooking',
  'Reading',
  'Travel',
  'Gaming',
  'Photography',
  'Fashion',
];

function InterestsCheckboxGroup({
  value,
  onChange,
}: InterestsCheckboxGroupProps) {
  const disabledOptions = useMemo(
    () => (value.length === 6 ? new Set(value) : new Set()),
    [value]
  );

  const handleInterestsChange = (selectedOptions: string[]) => {
    if (selectedOptions.length <= 6) {
      onChange(selectedOptions);
    }
  };

  return (
    <FormControl mt={4}>
      <FormLabel>Interests (Select up to 6)</FormLabel>
      <CheckboxGroup
        colorScheme="blue"
        onChange={handleInterestsChange}
        value={value}
      >
        <Stack spacing={2}>
          {interestsOptions.map((interest) => (
            <Checkbox
              key={interest}
              value={interest}
              isChecked={value.includes(interest)}
              isDisabled={disabledOptions.has(interest)}
            >
              {interest}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </FormControl>
  );
}

export default InterestsCheckboxGroup;
