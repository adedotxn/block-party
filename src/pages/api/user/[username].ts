import { getUser } from '@/utils/api/user';
import { ResponseInterface } from '@/utils/interface';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data extends ResponseInterface {
  message?: string;
  data?: unknown[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const username = req.query.username as string;
  if (req.method === 'GET') {
    const response = await getUser(username);

    if (response.status === 'success' && response.data) {
      const data = response.data;
      return res.status(200).json({ status: 'success', data });
    } else {
      return res
        .status(400)
        .json({ status: 'error', message: response?.message });
    }
  }

  if (req.method !== 'GET') {
    return res.status(400).json({
      status: 'error',
      message:
        'Wrong Method. If attempting to create user, go to /api/board/join/{{code}}',
    });
  }
}
