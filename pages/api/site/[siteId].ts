import { getSite } from '@/lib/firestore-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { siteId } = req.query;
    const { site } = await getSite(siteId);
    res.status(200).json({ site });
  } catch (error) {
    res.status(500).json({ error });
  }
}
