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
import { customAlphabet, nanoid } from 'nanoid';
import { alphanumeric } from 'nanoid-dictionary';
import { currentDate } from '../constants';

export type BoardType =
  | {
      name: string;
      createdAt: string;
      facilitator: string;
      boardCode: string;
      members: string[];
      boardId: string;
      allPosts: unknown[];
    }
  | undefined;

export const createBoard = async (
  name: string,
  facilitator: { username: string; id: string }
) => {
  const generateInvite = customAlphabet(alphanumeric, 6);
  const boardCode = generateInvite();
  const boardId = nanoid();

  try {
    const boardRef = collection(db, 'boards');
    const newBoard = {
      name,
      boardId,
      boardCode,
      facilitator: { username: facilitator.username, id: facilitator.id },
      members: [],
      allPosts: [],
      createdAt: currentDate,
    };
    const docRef = await addDoc(boardRef, newBoard);

    return { status: 'success', code: boardCode, boardId };
  } catch (error) {
    console.log({ error });
    if (error instanceof Error) {
      return { status: 'error', message: error.message };
    }
  }
};

export async function getBoardData(boardCode: string): Promise<BoardType> {
  const boardRef = collection(db, 'boards');
  const q = query(boardRef, where('boardCode', '==', boardCode));
  const snapshot = await getDocs(q);
  let document;
  if (snapshot.empty) {
    console.log('No matching document');
  } else {
    snapshot.forEach((doc) => {
      document = doc.data();
    });
  }
  return document;
}

export const addUserToBoard = async (
  user: { id: string; username: string },
  boardCode: string
) => {
  // firstly update the board with the user
  const boardsRef = collection(db, 'boards');
  const q = query(boardsRef, where('boardCode', '==', boardCode));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    await updateDoc(doc.ref, { members: arrayUnion(user) });
  }
};

export const addBoardToUserDocs = async (
  userId: string,
  board: { id: string; name: string }
) => {
  // update the user field with the board he's in
  const usersRef = collection(db, 'users');
  const userQuery = query(usersRef, where('userId', '==', userId));
  const userQuerySnapshot = await getDocs(userQuery);
  if (!userQuerySnapshot.empty) {
    const doc = userQuerySnapshot.docs[0];
    await updateDoc(doc.ref, { boards: arrayUnion(board) });

    return { status: 'success' };
  } else {
    return { status: 'error' };
  }
};
