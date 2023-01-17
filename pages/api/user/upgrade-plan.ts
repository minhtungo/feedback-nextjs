import { getAuth } from 'firebase-admin/auth';
import { signUpForPlan } from '@/lib/firestore-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { uid } = await getAuth().verifyIdToken(req.headers.token as string);
    const response = await signUpForPlan(uid);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
}
