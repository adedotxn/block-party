/* eslint-disable no-unused-vars */
import { Button, Flex, FormControl, Input, Text } from '@chakra-ui/react';

interface FormInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  required,
}) => {
  return (
    <FormControl mt={4}>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        bg="#F2F2F2"
        textAlign="center"
      />
    </FormControl>
  );
};

interface Step3Props {
  username: string;
  fullName: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  handleNext: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Step2: React.FC<Step3Props> = ({
  username,
  fullName,
  setUsername,
  setFullName,
  handleNext,
}) => {
  const isInputEmpty = username.trim() === '' || fullName.trim() === '';

  return (
    <Flex direction="column" p={20} gap={4}>
      <Text
        fontWeight="700"
        fontSize="25px"
        lineHeight="25px"
        textAlign="center"
        color="#003566"
      >
        Hi! What&apos;s your name?
      </Text>
      <FormInput
        type="text"
        placeholder="Enter Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

      <FormInput
        type="text"
        placeholder="Choose a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      {isInputEmpty && (
        <Text color="red.500" mt={2} fontSize="14px" textAlign="center">
          Please enter your name and pick a username to proceed.
        </Text>
      )}
      <Button
        bg="#FF0000"
        color="#FFFFFF"
        onClick={(e) => !isInputEmpty && handleNext(e)}
        width="100%"
        height="44px"
        borderRadius="33px"
        disabled={isInputEmpty}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Step2;
