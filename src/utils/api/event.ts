import { arrayUnion, updateDoc } from 'firebase/firestore';
import { Event } from '../interface';
import { getGroupRef } from './groups';

export const createEvent = async (
  boardCode: string,
  group: { id: string },
  event: Event
) => {
  const groupRef = await getGroupRef(boardCode, group.id);
  if (groupRef.status === 'error')
    return { status: 'error', message: groupRef.message };

  if (groupRef.data) {
    const snapshot = groupRef.data;
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      try {
        //update the group with the new event
        await updateDoc(doc.ref, {
          events: arrayUnion(event),
        });
        return { status: 'success', message: 'Event created successfully' };
      } catch (error) {
        return { status: 'error', error };
      }
    }
  }
};

//TO-DO: Delete Events
const deleteEvent = async () => {};
