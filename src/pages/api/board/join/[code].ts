// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { addUserToBoard, getBoardData } from '@/utils/api/board';
import { User, createUser } from '@/utils/api/user';
import { ResponseInterface } from '@/utils/interface';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data extends ResponseInterface {
  boardCode?: string;
  message?: string;
  data?: {
    name: string;
    facilitator: string;
  };
}

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

  // Creates User Account and then joins board
  if (req.method === 'POST') {
    const { fullName, username, interests, profilePic, areaOfResidence } =
      req.body;
    const userData: User = {
      fullName,
      username,
      interests,
      profilePic,
      areaOfResidence,
    };
    const response = await createUser(userData, 'member');
    console.log({ response });

    if (response?.userId) {
      try {
        const user = { id: response?.userId, username };
        await addUserToBoard(user, code);
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
