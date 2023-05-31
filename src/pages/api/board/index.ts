// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createBoard } from '@/utils/api/board';
import { createDefaultGroups } from '@/utils/api/groups';
import { User, addBoardtoFacilitatorDoc, createUser } from '@/utils/api/user';
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

  const { fullName, username, interests, profilePic, areaOfResidence } =
    req.body;
  const boardName = req.body.boardName as string;

  const userData: User = {
    fullName,
    username,
    interests,
    profilePic,
    areaOfResidence,
  };

  const create = await createUser(userData, 'facilitator');

  if (create?.status === 'error')
    return res.status(400).json({ status: 'error', message: create.message });

  if (create?.status === 'success' && create?.userId) {
    const facilitator = { id: create?.userId, username };
    const response = await createBoard(boardName, facilitator);

    if (response?.status === 'success' && response.boardId) {
      // if board is successfully created, update the board with user details
      const boardData = { id: response.boardId, name: boardName };
      const boardToUserDoc = await addBoardtoFacilitatorDoc(
        create?.userId,
        boardData
      );

      if (boardToUserDoc?.status === 'success') {
        // then create the default groups for the board
        const createDefGroups = await createDefaultGroups(response?.code);

        if (createDefGroups.status === 'success') {
          return res
            .status(200)
            .json({ status: response.status, boardCode: response.code });
        }
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
