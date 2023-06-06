import { arrayUnion, updateDoc } from 'firebase/firestore';
import { getGroupRef } from './groups';

export const createEvent = async (
  boardCode: string,
  group: { id: string },
  event: { name: string; date: string; organiser: string }
) => {
  const groupRef = await getGroupRef(boardCode, group.id);
  if (groupRef.status === 'error')
    return { status: 'error', message: groupRef.message };

  if (groupRef.data) {
    const snapshot = groupRef.data;
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      try {
        const reponse = await updateDoc(doc.ref, {
          events: arrayUnion(event),
        });
        console.log({ reponse });
        return { status: 'success', message: 'Event created successfully' };
      } catch (error) {
        return { status: 'error', error };
      }
    }
  }
};
