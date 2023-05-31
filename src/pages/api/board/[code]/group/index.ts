import { createGroup, getGroups } from '@/utils/api/groups';
import { ResponseInterface } from '@/utils/interface';
import { DocumentData } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data extends ResponseInterface {
  message?: string | Error;
  data?: DocumentData[];
}

// This route is to get all groups in a board and also to create specific groups
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const boardCode = req.query.code as string;
  // Get all the groups
  if (req.method === 'GET') {
    const response = await getGroups(boardCode);

    if (response?.status === 'success') {
      const result = response.data;
      return res.status(200).json({ status: 'success', data: result });
    } else {
      return res
        .status(400)
        .json({ status: 'error', message: response?.message });
    }
  }

  if (req.method === 'POST') {
    //accepts the name of the group and id of the user creating it
    const { groupName, description, adminId } = req.body;
    const groupDetails = { name: groupName, description, adminId };
    const response = await createGroup(groupDetails, boardCode);

    if (response?.status == 'success') {
      return res
        .status(200)
        .json({ status: 'success', message: response.message });
    } else {
      return res
        .status(400)
        .json({ status: 'error', message: response?.message });
    }
  } else {
    return res
      .status(400)
      .json({ status: 'error', message: 'Error creating group' });
  }
}
