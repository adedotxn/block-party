import { createPost } from '@/utils/api/chat';
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
  if (req.method === 'POST') {
    const { userId, username, text, fullName } = req.body;
    const boardCode = req.query.code as string;
    const groupId = req.query.id as string;

    const user = { id: userId, username: username, fullName: fullName };
    const post = { text };

    const postCreation = await createPost(post, user, boardCode, groupId);

    if (postCreation?.status === 'success') {
      return res
        .status(200)
        .json({ status: 'success', message: postCreation.message });
    } else {
      return res
        .status(400)
        .json({ status: 'error', message: postCreation?.message });
    }
  }

  if (req.method !== 'POST') {
    return res
      .status(200)
      .json({ status: 'error', message: 'Wrong Method, send a POST request' });
  }
}
