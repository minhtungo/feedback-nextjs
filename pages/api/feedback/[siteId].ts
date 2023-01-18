import { getAllFeedback, getSite } from '@/lib/firestore-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const siteId = req.query.siteId;
  const { feedback, error } = await getAllFeedback(siteId);
  const { site } = await getSite(siteId);

  if (error) {
    res.status(500).json({ error });
  }

  res.status(200).json({ feedback, site });
}
