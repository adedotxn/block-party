/* eslint-disable no-unused-vars */
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

type InterestsCheckboxGroupProps = {
  user: string;
  value: string[];
  onChange: (selectedOptions: string[]) => void;
  submitHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const interestsOptions: { title: string; imageSrc: string }[] = [
  { title: 'Arts & Craft', imageSrc: '/images/art&craft.png' },
  { title: 'Board Games', imageSrc: '/images/board_games.png' },
  { title: 'Books', imageSrc: '/images/book.png' },
  { title: 'Cats', imageSrc: '/images/cats.png' },
  { title: 'Cycling', imageSrc: '/images/cycling.png' },
  { title: 'Dance', imageSrc: '/images/dance.png' },
  { title: 'Dog', imageSrc: '/images/dog.png' },
  { title: 'Fitness', imageSrc: '/images/fitness.png' },
  { title: 'Food', imageSrc: '/images/food.png' },
  { title: 'Gaming', imageSrc: '/images/gaming.png' },
  { title: 'Gardening', imageSrc: '/images/gardening.png' },
  { title: 'Movies & TV', imageSrc: '/images/movies&tv.png' },
];

function InterestsCheckboxGroup({
  user,
  value,
  onChange,
  submitHandler,
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

  const isOptionSelected = (option: string) => value.includes(option);
  const imageBorderColor = useColorModeValue('blue.500', 'blue.200');
  const selectedImageOpacity = useColorModeValue(1, 0.5);

  return (
    <Flex
      flexDirection="column"
      justifyContent={'center'}
      alignItems={'center'}
      padding={10}
      gap={4}
    >
      <Text
        fontWeight="700"
        fontSize="25px"
        lineHeight="25px"
        color="#CC2900"
        textAlign="center"
        fontFamily="productSans"
      >
        Edit Interest
      </Text>
      <FormControl textAlign="center">
        <CheckboxGroup
          colorScheme="blue"
          onChange={handleInterestsChange}
          value={value}
        >
          <Grid
            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }}
            gap={4}
            alignItems="center"
          >
            {interestsOptions.map((interest) => (
              <GridItem key={interest.title}>
                <Checkbox
                  value={interest.title}
                  isChecked={isOptionSelected(interest.title)}
                  isDisabled={disabledOptions.has(interest.title)}
                  display="none"
                />
                <Stack
                  spacing={2}
                  align="center"
                  borderWidth={2}
                  borderColor={
                    isOptionSelected(interest.title)
                      ? imageBorderColor
                      : 'transparent'
                  }
                  borderRadius="md"
                  opacity={
                    isOptionSelected(interest.title) ? selectedImageOpacity : 1
                  }
                  transition="opacity 0.3s ease"
                  cursor="pointer"
                  _hover={{
                    opacity: isOptionSelected(interest.title)
                      ? selectedImageOpacity
                      : 0.8,
                  }}
                  onClick={() =>
                    onChange(
                      isOptionSelected(interest.title)
                        ? value.filter((option) => option !== interest.title)
                        : [...value, interest.title]
                    )
                  }
                  padding={1}
                >
                  <Image
                    src={interest.imageSrc}
                    alt={interest.title}
                    boxSize="80px"
                    borderRadius="md"
                  />
                  <span>{interest.title}</span>
                </Stack>
              </GridItem>
            ))}
          </Grid>
        </CheckboxGroup>
        <Button
          bg="#FF0000"
          color="#FFFFFF"
          width="100%"
          height="44px"
          borderRadius="33px"
          mt={4}
          onClick={() => {}}
        >
          Update Interest
        </Button>
      </FormControl>
    </Flex>
  );
}

const EditInterestPage: NextPage = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [interests, setInterests] = useState([]);

  const handleInterestsChange = (selectedOptions: any) => {
    if (selectedOptions.length <= 6) {
      setInterests(selectedOptions);
    }
  };

  return (
    <Flex padding={5}>
      <InterestsCheckboxGroup
        submitHandler={handleInterestsChange}
        user={fullName}
        value={interests}
        onChange={handleInterestsChange}
      />
    </Flex>
  );
};

export default EditInterestPage;
