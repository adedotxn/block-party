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
  const { name } = req.body;

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
    /** Todo? : set group creator as admin
     * and also as a member ..but waiting how we want to uniquely query users
     */
    const response = await createGroup(name, code);

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
