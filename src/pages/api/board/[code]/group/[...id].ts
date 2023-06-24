import {
  getSpecificGroupWithId,
  joinGroup,
  leaveGroup,
} from '@/utils/api/groups';
import { ResponseInterface } from '@/utils/interface';
import { DocumentData } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data extends ResponseInterface {
  message?: string;
  data?: DocumentData[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const boardCode = req.query.code as string;
  const IDs = req.query.id as string;
  const groupId = IDs[0];

  // Get specific group details
  if (req.method === 'GET') {
    const response = await getSpecificGroupWithId(groupId, boardCode);

    if (response?.status === 'success') {
      const data = response.data;
      return res.status(200).json({ status: 'success', data });
    } else {
      return res
        .status(400)
        .json({ status: 'error', message: 'Error getting groups' });
    }
  }

  if (req.method === 'POST') {
    const { userId, name } = req.body;
    const groupResp = await getSpecificGroupWithId(groupId, boardCode);

    if (groupResp?.status === 'success' && groupResp.data) {
      const groupRespData: any = groupResp.data;
      const user: { id: string; name: string } = { id: userId, name };
      const group: { id: string; name: string } = {
        id: groupRespData.id,
        name: groupRespData.name,
      };

      const joinGrp = await joinGroup(boardCode, user, group);

      if (joinGrp?.status === 'success') {
        return res
          .status(200)
          .json({ status: 'success', message: 'Group joined successfully' });
      } else {
        return res
          .status(400)
          .json({ status: 'error', message: 'Error joining group' });
      }
    }
  }

  if (req.method === 'DELETE') {
    /** /boardCode/group/groupId/memberId
     * DELETE request
     */

    const memberId = IDs[1];
    const response = await leaveGroup(boardCode, groupId, memberId);

    if (response?.status === 'success') {
      return res
        .status(200)
        .json({ status: 'success', message: 'Left group successfully' });
    } else {
      return res
        .status(400)
        .json({ status: 'error', message: 'Error leaving group' });
    }
  }
}
