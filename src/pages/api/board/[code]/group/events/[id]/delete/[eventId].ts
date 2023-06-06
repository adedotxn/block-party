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
  const eventId = req.query.eventId as string;

  if (req.method === 'DELETE') {
    console.log(req.body);
  }
}
