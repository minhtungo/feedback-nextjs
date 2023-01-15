import { db } from '@/lib/firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const snapshot = await db.collection('sites').get();

    const sites = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(sites);
  } catch (error) {
    console.log('Error getting document:', error);
    res.status(500).json({ error });
  }
}
