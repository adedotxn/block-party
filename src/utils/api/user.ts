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
  fullName: string;
  username: string;
  interests: string[];
  profilePic: string;
  areaOfResidence: string;
  groups?: string[];
};

export const createUser = async (
  user: User,
  role: 'member' | 'facilitator'
) => {
  const userAlreadyExists = await getUser(user.username);
  if (userAlreadyExists?.status === 'success')
    return { status: 'error', message: 'Username already in use' };

  try {
    const userRef = collection(db, 'users');
    const userId = nanoid();
    const newUser = {
      userId,
      fullName: user.fullName,
      username: user.username,
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

export const getUser = async (username: string) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', username));
  const snapshot = await getDocs(q);
  let document;
  if (snapshot.empty) {
    return { status: 'error', message: "Couldn't find user" };
  } else {
    snapshot.forEach((doc) => {
      document = doc.data();
    });

    return { status: 'success', data: document };
  }
};

export const getUserWithId = async (userId: string) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  let document;
  if (snapshot.empty) {
    return { status: 'error', message: "Couldn't find user" };
  } else {
    snapshot.forEach((doc) => {
      document = doc.data();
    });

    return { status: 'success', data: document };
  }
};

export const addBoardtoFacilitatorDoc = async (
  userId: string,
  board: { id: string; name: string }
) => {
  const userRef = collection(db, 'users');
  const q = query(userRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    try {
      await updateDoc(doc.ref, { boards: arrayUnion(board) });
      return { status: 'success' };
    } catch (error) {
      return { status: 'error', error };
    }
  }
};
