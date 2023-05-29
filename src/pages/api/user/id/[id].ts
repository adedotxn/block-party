import { getUserWithId } from '@/utils/api/user';
import { ResponseInterface } from '@/utils/interface';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data extends ResponseInterface {
  message?: string;
  data?: unknown[];
}

// Getting user data with userId
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userId = req.query.id as string;
  if (req.method === 'GET') {
    const response = await getUserWithId(userId);

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
