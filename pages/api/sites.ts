import { db } from '@/lib/firebase-admin';
import { getAllSites } from '@/lib/firestore-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sites, error } = await getAllSites();
  if (error) {
    res.status(500).json({ error });
  }

  res.status(200).json({ sites });
}
