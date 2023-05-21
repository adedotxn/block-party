// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { currentDate } from '@/utils/constants';
import { ResponseInterface } from '@/utils/interface';
import { db } from '@lib/firebase/client';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
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

const createUser = async (user: {
  name: string;
  interests: string[];
  profilePic: string;
  areaOfResidence: string;
  groups: string[];
}) => {
  try {
    const userRef = collection(db, 'boards');
    const newUser = {
      name: user.name,
      interests: user.interests,
      profilePic: user.profilePic,
      areaOfResidence: user.areaOfResidence,
      groups: user.groups,
      allPosts: [],
      createdAt: currentDate,
    };
    const docRef = await addDoc(userRef, newUser);

    return { status: 'success' };
  } catch (error) {
    console.log({ error });
    if (error instanceof Error) {
      return { status: 'error', message: error.message };
    }
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const code = req.query.code as string;
  // Getting board data from just the code
  if (req.method === 'GET') {
    const response = await getBoardData(code);
    const name = response?.name;
    const facilitator = response?.facilitator;

    if (name === undefined || facilitator === undefined) {
      return res.status(400).json({
        status: 'error',
        message: 'An error occured while trying to join',
      });
    }

    return res
      .status(200)
      .json({ status: 'success', data: { name, facilitator } });
  }

  // assuming creating an account and joining a board are coupled
  if (req.method === 'POST') {
    const { name: userName, interests, profilePic, areaOfResidence } = req.body;
  }
}
