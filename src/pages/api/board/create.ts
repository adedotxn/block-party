// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createBoard } from '@/utils/api/board';
import { User, addBoardtoFacilitator, createUser } from '@/utils/api/user';
import { ResponseInterface } from '@/utils/interface';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data extends ResponseInterface {
  boardCode?: string;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(400).json({ status: 'error' });
  }
  /**
   * A Facilitator account is created, then a board is created and then updated with facilitator details
   */

  const {
    userName: name,
    interests,
    profilePic,
    areaOfResidence,
    boardName,
  } = req.body;

  const userData: User = {
    name,
    interests,
    profilePic,
    areaOfResidence,
  };

  const create = await createUser(userData, 'facilitator');
  const userIsCreated = create?.status === 'success';

  if (userIsCreated && create?.userId) {
    const facilitator = { name: name, id: create?.userId };
    const response = await createBoard(boardName, facilitator);

    if (response?.status === 'success') {
      // if board is successfully creeted, update the board with user details
      const boardToUser = await addBoardtoFacilitator(
        create?.userId,
        boardName
      );

      if (boardToUser?.status === 'success') {
        return res
          .status(200)
          .json({ status: response.status, boardCode: response.code });
      }
    } else {
      return res.status(400).json({
        status: 'error',
        message: response?.message ?? 'Error addding facilitator to board',
      });
    }
  } else {
    return res
      .status(400)
      .json({ status: 'error', message: 'Error creating board' });
  }
}
