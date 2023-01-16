import { getAuth } from 'firebase-admin/auth';
import { getUserFeedback } from '@/lib/firestore-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { uid } = await getAuth().verifyIdToken(req.headers.token as string);
    const feedback = await getUserFeedback(uid);

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error });
  }
}
