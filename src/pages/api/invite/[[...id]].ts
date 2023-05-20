import { ResponseInterface } from '@/utils/interface';
import { customAlphabet } from 'nanoid';
import { alphanumeric } from 'nanoid-dictionary';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data extends ResponseInterface {
  code?: string;
  message?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const generateInvite = customAlphabet(alphanumeric, 7);

  // Generating Invite
  if (req.method === 'GET' && req.query.id === undefined) {
    const inviteCode = generateInvite();
    console.log(inviteCode);

    /** TODO:
     * 1. save the invite code/link with the board model
     * so that it can be matched with the board
     *
     * 2. The invite link can be "https://{{app_url}}/{{inviteCode}}"
     * */
    return res.status(200).json({ status: 'success', code: inviteCode });
  }

  // Receiving Invite Code
  if (req.query.id == undefined && req.method === 'POST') {
    const { id } = req.query;

    console.log(req.query);

    return res
      .status(200)
      .json({ status: 'success', message: 'Code successful' });
  }

  // Receiving Invite Link
  if (req.query.id && req.method === 'POST') {
    const { id } = req.query;

    console.log({ id });
    console.log(req.query);

    return res
      .status(200)
      .json({ status: 'success', message: 'Link successful' });
  }

  return res
    .status(400)
    .json({ status: 'error', message: 'Request method is wrong' });
}
