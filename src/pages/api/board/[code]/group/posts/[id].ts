import { getGroupPosts } from '@/utils/api/chat';
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
  const groupId = req.query.id as string;

  // Get all the groups
  if (req.method === 'GET') {
    const allPosts = await getGroupPosts(boardCode, groupId);

    if (allPosts?.status === 'success') {
      const result = allPosts.data;
      return res.status(200).json({ status: 'success', data: result });
    } else {
      return res
        .status(400)
        .json({ status: 'error', message: allPosts?.message });
    }
  }
}
