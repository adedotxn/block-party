import { Avatar, Flex, Text } from '@chakra-ui/react';

const defaultText =
  ' Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.';
const DiscussionCards = ({
  name,
  time,
  text = defaultText,
}: {
  name: string;
  username: string;
  text?: string;
  time: string;
}) => {
  return (
    <Flex
      fontFamily="productSans"
      position="relative"
      px={5}
      py={2}
      bg="#F4F4F4"
      minH={'70px'}
      borderRadius={'10px'}
    >
      <Avatar
        name={name}
        size="md"
        position="absolute"
        top={-5}
        border="4px solid #EBEBEB"
        filter="drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25))"
        borderRadius="23.5px"
      />
      <Flex width="100%" flexDirection="column">
        <Text
          marginLeft="70px"
          fontFamily="productSans"
          fontWeight={700}
          fontSize={'14px'}
          color="#CC2900"
          textTransform={'capitalize'}
        >
          {name} .{' '}
          <span
            style={{
              fontSize: '9px',
            }}
          >
            {time}
          </span>
        </Text>
        <Text
          fontFamily="productSans"
          fontWeight={500}
          fontSize="13px"
          color="#000000"
        >
          {' '}
          {text}{' '}
        </Text>
      </Flex>
    </Flex>
  );
};

export default DiscussionCards;
