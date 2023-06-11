// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  addBoardToUserDocs,
  addUserToBoard,
  getBoardData,
} from '@/utils/api/board';
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
  userId?: string;
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

    if (response?.status === 'error')
      return res
        .status(400)
        .json({ status: 'error', message: response.message });

    if (response?.userId) {
      try {
        // after user creation, update the user docs with the board details
        const board = await getBoardData(code);
        if (board) {
          const boardDetails = {
            id: board?.boardId,
            name: board?.name,
          };

          const addBoardToUser = await addBoardToUserDocs(
            response?.userId,
            boardDetails
          );

          if (addBoardToUser?.status === 'success') {
            // then update the board docs with the user as a member
            const user = { id: response?.userId, username };
            await addUserToBoard(user, code);
            return res
              .status(200)
              .json({
                status: 'success',
                message: 'User Added to Board',
                userId: response?.userId,
              });
          }
        }
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
