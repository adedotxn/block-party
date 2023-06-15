import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';

const CreateEvent = ({
  groupId,
  boardCode,
  organiserId,
  organiserName,
}: {
  groupId: string;
  boardCode: string;
  organiserId: string;
  organiserName: string;
}) => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [submitting, setSubmitting] = useState(false);
  const [event, setEvent] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    venue: '',
    organiser: {
      name: organiserName,
      id: organiserId,
    },
  });

  const updateInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const mutation = useMutation({
    mutationFn: (event: any) => {
      return fetch(`/api/board/${boardCode}/group/events/${groupId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      })
        .then((response) => {
          response.json();
        })
        .then((data) => data);
    },
    onError: () => {
      toast.error('Error creating event. Try again');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group'] });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      toast.success('Event Created!');
      setSubmitting(false);
      onClose();
    },
  });

  const createEvent = () => {
    setSubmitting(true);
    mutation.mutate(event);
  };

  return (
    <>
      <Button
        px={16}
        rounded="full"
        colorScheme="red"
        bg="red.3"
        fontSize="20px"
        onClick={onOpen}
        width={{ base: '90vw', md: '30vw' }}
        py={6}
      >
        New Event
      </Button>

      <Box display="grid" placeItems="center">
        <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent borderTopRadius="1rem">
            {/* <DrawerCloseButton /> */}
            <DrawerHeader color="red.3" textAlign="center" fontSize="2xl">
              New Event
            </DrawerHeader>

            <DrawerBody>
              <FormControl display="grid" gap={4}>
                <Input
                  variant="flushed"
                  placeholder="Title"
                  borderBottomColor="black"
                  name="title"
                  value={event.title}
                  onChange={updateInput}
                />
                <FormLabel>
                  Date
                  <Input
                    variant="flushed"
                    placeholder="Date"
                    type="date"
                    borderBottomColor="black"
                    name="date"
                    value={event.date}
                    onChange={updateInput}
                  />
                </FormLabel>
                <Flex gap={2}>
                  <FormLabel>
                    Start Time
                    <Input
                      variant="flushed"
                      placeholder="Start Time"
                      type="time"
                      borderBottomColor="black"
                      name="startTime"
                      value={event.startTime}
                      onChange={updateInput}
                    />{' '}
                  </FormLabel>
                  <FormLabel>
                    End Time
                    <Input
                      variant="flushed"
                      placeholder="End Time"
                      type="time"
                      borderBottomColor="black"
                      name="endTime"
                      value={event.endTime}
                      onChange={updateInput}
                    />{' '}
                  </FormLabel>
                </Flex>
                <Input
                  variant="flushed"
                  placeholder="Description"
                  borderBottomColor="black"
                  name="description"
                  value={event.description}
                  onChange={updateInput}
                />
                <Input
                  variant="flushed"
                  placeholder="Venue/Location"
                  borderBottomColor="black"
                  name="venue"
                  value={event.venue}
                  onChange={updateInput}
                />{' '}
              </FormControl>
            </DrawerBody>

            <DrawerFooter>
              <Button rounded="full" variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={submitting}
                px={16}
                rounded="full"
                colorScheme="red"
                bg="red.3"
                fontSize="lg"
                onClick={createEvent}
              >
                Create Event
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default CreateEvent;
