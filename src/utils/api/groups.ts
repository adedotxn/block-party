import { db } from '@lib/firebase/client';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';

export const createGroup = async (
  groupDetails: { name: string; description: string; adminId: string },
  boardCode: string
) => {
  const groupId = nanoid();

  const groupExists = await getSpecificGroups(groupDetails.name, boardCode);
  if (groupExists?.status === 'success')
    return { status: 'error', message: 'Group with this name already exists' };

  try {
    //getting the board from the board code
    const boardsRef = collection(db, 'boards');
    const q = query(boardsRef, where('boardCode', '==', boardCode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // No matching board found
      return { status: 'error', message: 'No Board Found' };
    } else {
      // Matching board found
      const boardDoc = querySnapshot.docs[0];
      const boardRef = doc(db, 'boards', boardDoc.id);
      const groupRef = collection(boardRef, 'groups');

      // Creating a new group's document in the collection
      const newGroup = {
        name: groupDetails.name,
        adminId: groupDetails.adminId,
        id: groupId,
        members: [],
        allPosts: [],
        description: groupDetails.description,
      };
      await addDoc(groupRef, newGroup);
      return {
        status: 'success',
        message: `${name} group created successfully! Have fun.`,
        groupId,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const getGroups = async (boardCode: string) => {
  try {
    //getting the board from the board code
    const boardsRef = collection(db, 'boards');
    const q = query(boardsRef, where('boardCode', '==', boardCode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { status: 'error', message: 'No Board Found' };
    } else {
      // getting the groups collection from inside a board
      const boardDoc = querySnapshot.docs[0];
      const boardRef = doc(db, 'boards', boardDoc.id);

      //locating the groups
      const groupRef = collection(boardRef, 'groups');
      const snapshot = await getDocs(groupRef);

      if (snapshot.empty) {
        console.log('No matching document');
        return { status: 'error', message: 'No Group Found' };
      } else {
        const groups = snapshot.docs.map((doc) => doc.data());
        return { status: 'success', data: groups };
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return { status: 'error', message: error };
    }
  }
};

export const getSpecificGroups = async (name: string, boardCode: string) => {
  try {
    //getting the board from the board code
    const boardsRef = collection(db, 'boards');
    const q = query(boardsRef, where('boardCode', '==', boardCode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { status: 'error', message: 'No Board Found' };
    } else {
      // getting the groups collection from inside a board
      const boardDoc = querySnapshot.docs[0];
      const boardRef = doc(db, 'boards', boardDoc.id);

      //locating the groups
      const groupRef = collection(boardRef, 'groups');
      const q = query(groupRef, where('name', '==', name));
      const snapshot = await getDocs(q);

      let document;
      if (snapshot.empty) {
        console.log('No matching document');
        return { status: 'error', message: 'No Such Group Found' };
      } else {
        snapshot.forEach((doc) => {
          document = doc.data();
        });
      }
      return { status: 'success', data: document };
    }
  } catch (error) {
    console.log(error);
  }
};

const setGroupAdmin = async () => {};
