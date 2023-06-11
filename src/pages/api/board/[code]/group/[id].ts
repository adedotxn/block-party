import { getSpecificGroupWithId, joinGroup } from '@/utils/api/groups';
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
  const id = req.query.id as string;

  // Get specific group details
  if (req.method === 'GET') {
    const response = await getSpecificGroupWithId(id, boardCode);

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
    const { userId, username } = req.body;
    const groupResp = await getSpecificGroupWithId(id, boardCode);

    if (groupResp?.status === 'success' && groupResp.data) {
      const groupRespData: any = groupResp.data;
      const user: { id: string; username: string } = { id: userId, username };
      const group: { id: string; name: string } = {
        id: groupRespData.id,
        name: groupRespData.name,
      };

      const joinGrp = await joinGroup(boardCode, user, group);

      if (joinGrp?.status === 'success') {
        return res
          .status(200)
          .json({ status: 'success', message: 'Group joined successfully' });
      }
    }
  }

  if (req.method !== 'GET') {
    return res.status(200).send({ status: 'error', message: 'Wrong method' });
  }
}
