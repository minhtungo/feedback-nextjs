import { getAuth } from 'firebase-admin/auth';
import { deleteSite } from '@/lib/firestore-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { uid } = await getAuth().verifyIdToken(req.headers.token as string);
    const {siteId} = req.query;

    const { success } = await deleteSite(siteId);

    res.status(200).json({ success });
  } catch (error) {
    res.status(500).json({ error });
  }
}
