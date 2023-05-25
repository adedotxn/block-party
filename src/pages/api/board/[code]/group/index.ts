import { createGroup, getGroups } from '@/utils/api/groups';
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
  const code = req.query.code as string;

  //accepts the name of the group and id of the user creating it
  const { groupName, creatorId } = req.body;

  // Get all the groups
  if (req.method === 'GET') {
    const response = await getGroups(code);

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
    /** 
     *
     * checking for  duplicate names and returning an error
     */
    const response = await createGroup(groupName, code, creatorId);

    if (response?.status == 'success') {
      return res
        .status(200)
        .json({ status: 'success', message: response.message });
    }
  } else {
    return res
      .status(400)
      .json({ status: 'error', message: 'Error creating group' });
  }
}
