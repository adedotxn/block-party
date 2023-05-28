import { db } from '@lib/firebase/client';
import {
  addDoc,
  arrayUnion,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { currentDate } from '../constants';

export type User = {
  name: string;
  interests: string[];
  profilePic: string;
  areaOfResidence: string;
  groups?: string[];
};

export const createUser = async (
  user: User,
  role: 'member' | 'facilitator'
) => {
  try {
    const userRef = collection(db, 'users');
    const userId = nanoid();
    const newUser = {
      userId,
      name: user.name,
      interests: user.interests,
      profilePic: user.profilePic,
      areaOfResidence: user.areaOfResidence,
      boards: [], //the board name
      groups: [],
      allPosts: [],
      role,
      createdAt: currentDate,
    };
    const docRef = await addDoc(userRef, newUser);
    return { status: 'success', userId };
  } catch (error) {
    console.log({ error });
    if (error instanceof Error) {
      return { status: 'error', message: error.message };
    }
  }
};

export const addBoardtoFacilitator = async (userId: string, board: string) => {
  const userRef = collection(db, 'users');
  const q = query(userRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    try {
      await updateDoc(doc.ref, { board: arrayUnion(board) });
      return { status: 'success' };
    } catch (error) {
      return { status: 'error', error };
    }
  }
};
