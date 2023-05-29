import { getSpecificGroups } from '@/utils/api/groups';
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
  const name = req.query.name as string;

  // Get specific group details
  if (req.method === 'GET') {
    const response = await getSpecificGroups(name, code);

    if (response?.status === 'success') {
      const result = response.data;
      return res.status(200).json({ status: 'success', data: result });
    } else {
      return res
        .status(400)
        .json({ status: 'error', message: response?.message });
    }
  }

  if (req.method !== 'GET') {
    return res.status(200).send({ status: 'error', message: 'Wrong method' });
  }
}
