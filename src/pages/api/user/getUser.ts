import { db } from '';
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
interface GetUserResponse {
  status: 'success' | 'error';
  message?: string;
  data?: DocumentData;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetUserResponse>
) {
  try {
    const { username } = req.query;

    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      res.status(404).json({ status: 'error', message: "Couldn't find user" });
    } else {
      let document;
      snapshot.forEach((doc) => {
        document = doc.data();
      });

      res.status(200).json({ status: 'success', data: document });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}
