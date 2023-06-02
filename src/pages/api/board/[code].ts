import { getBoardData } from '@/utils/api/board';
import { ResponseInterface } from '@/utils/interface';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data extends ResponseInterface {
  boardCode?: string;
  message?: string;
  data?: {
    name: string;
    facilitator: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const code = req.query.code as string;

  // Getting board data from just the boardCode
  if (req.method === 'GET') {
    const response = await getBoardData(code);
    const name = response?.name;
    const facilitator = response?.facilitator;

    if (name === undefined || facilitator === undefined) {
      return res.status(400).json({
        status: 'error',
        message: 'An error occured while getting board info',
      });
    }

    return res.status(200).json({ status: 'success', data: response });
  }
}
