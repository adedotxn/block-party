// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { currentDate } from '@/utils/constants';
import { ResponseInterface } from '@/utils/interface';
import { db } from '@lib/firebase/client';
import { addDoc, collection } from 'firebase/firestore';
import { customAlphabet, nanoid } from 'nanoid';
import { alphanumeric } from 'nanoid-dictionary';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data extends ResponseInterface {
  boardCode?: string;
  message?: string;
}

const createBoard = async (name: string, facilitator: string) => {
  const generateInvite = customAlphabet(alphanumeric, 6);
  const boardCode = generateInvite();

  try {
    const boardRef = collection(db, 'boards');
    const newBoard = {
      name,
      boardId: nanoid(),
      boardCode,
      facilitator,
      members: [facilitator],
      allPosts: [],
      createdAt: currentDate,
    };
    const docRef = await addDoc(boardRef, newBoard);

    return { status: 'success', code: boardCode };
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
  if (req.method !== 'POST') {
    return res.status(400).json({ status: 'error' });
  }

  const { name, facilitator } = req.body;
  const response = await createBoard(name, facilitator);
  if (response?.status === 'success') {
    return res
      .status(200)
      .json({ status: response.status, boardCode: response.code });
  } else {
    return res
      .status(400)
      .json({ status: 'error', message: response?.message });
  }
}
