import { createEvent } from '@/utils/api/event';
import { getSpecificGroupWithId } from '@/utils/api/groups';
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
    const response = await getSpecificGroupWithId(groupId, boardCode);

    if (response?.status === 'success') {
      const data = response.data;
      return res.status(200).json({ status: 'success', data });
    } else {
      return res
        .status(400)
        .json({ status: 'error', message: 'Error getting groups' });
    }
  }

  if (req.method === 'POST') {
    const { eventName, eventDate, userId } = req.body;
    const event = { name: eventName, date: eventDate, organiser: userId };
    const group = { id: groupId };
    const eventCreate = await createEvent(boardCode, group, event);

    if (eventCreate?.status === 'success') {
      return res
        .status(200)
        .json({ status: 'success', message: eventCreate?.message });
    } else {
      return res
        .status(400)
        .json({ status: 'error', message: eventCreate?.message });
    }
  }
}
