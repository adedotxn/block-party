import { FormControl, FormLabel, Input } from '@chakra-ui/react';

interface FormInputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
}) => {
  return (
    <FormControl mt={4}>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </FormControl>
  );
};

interface Step3Props {
  username: string;
  fullName: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
}

const Step3: React.FC<Step3Props> = ({
  username,
  fullName,
  setUsername,
  setFullName,
}) => {
  return (
    <>
      <FormInput
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

      <FormInput
        label="Username"
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </>
  );
};

export default Step3;
