import { getUserWithId, updateUser } from '@/utils/api/user';
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

  // Update user details
  if (req.method === 'PUT') {
    const user = req.body;
    const response = await updateUser(userId, user);

    if (response?.status === 'success') {
      return res.status(200).json({
        status: 'success',
        message: "Successfully Updated User's Data",
      });
    } else {
      return res
        .status(400)
        .json({ status: 'error', message: "Couldn't Update User" });
    }
  }

  if (req.method !== 'GET' && req.method !== 'PUT') {
    return res.status(400).json({
      status: 'error',
      message:
        'Wrong Method. If attempting to create user, go to /api/board/join/{{code}}',
    });
  }
}
