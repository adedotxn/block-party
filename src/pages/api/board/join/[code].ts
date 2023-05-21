// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { currentDate } from '@/utils/constants';
import { ResponseInterface } from '@/utils/interface';
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
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data extends ResponseInterface {
  boardCode?: string;
  message?: string;
  data?: {
    name: string;
    facilitator: string;
  };
}

type BoardType =
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

type User = {
  name: string;
  interests: string[];
  profilePic: string;
  areaOfResidence: string;
  groups?: string[];
};

/**
 * TODO : figure out a way to have a unique accessible data for traversing users
 * since we're not authenticating, we need a username/unique identifier
 *
 * 2. find out how to structure these functions
 *
 * 3. create facilitator account as they're creating board as well
 */

async function getBoardData(boardCode: string): Promise<BoardType> {
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

const createUser = async (user: User, role = 'member') => {
  try {
    const userRef = collection(db, 'users');
    const userId = nanoid();
    const newUser = {
      userId,
      name: user.name,
      interests: user.interests,
      profilePic: user.profilePic,
      areaOfResidence: user.areaOfResidence,
      boards: [],
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

const addUserToBoard = async (userId: string, boardCode: string) => {
  const boardsRef = collection(db, 'boards');
  const q = query(boardsRef, where('boardCode', '==', boardCode));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    await updateDoc(doc.ref, { members: arrayUnion(userId) });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const code = req.query.code as string;

  // Getting board data from just the boardCode
  if (req.method === 'GET') {
    const response = await getBoardData(code);
    const name = response?.name;
    const facilitator = response?.facilitator;

    if (name === undefined || facilitator === undefined) {
      return res.status(400).json({
        status: 'error',
        message: 'An error occured while getting board info',
      });
    }

    return res
      .status(200)
      .json({ status: 'success', data: { name, facilitator } });
  }

  // assuming creating an account and joining a board are coupled
  if (req.method === 'POST') {
    const { name: userName, interests, profilePic, areaOfResidence } = req.body;
    const userData: User = {
      name: userName,
      interests,
      profilePic,
      areaOfResidence,
    };
    const response = await createUser(userData);
    console.log({ response });

    if (response?.userId) {
      try {
        await addUserToBoard(response.userId, code);
        return res
          .status(200)
          .json({ status: 'success', message: 'User Added to Board' });
      } catch (error) {
        console.log(error);
        return res
          .status(400)
          .json({ status: 'success', message: 'Error Adding User to Board' });
      }
    }

    return res.status(400).json({
      status: 'error',
      message: 'An error occured while adding user to board',
    });
  }
}
