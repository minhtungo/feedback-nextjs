import { getAllFeedback, getSite } from '@/lib/firestore-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const [siteId, route] = req.query.site;
    const { feedback } = await getAllFeedback(siteId, route);
    const { site } = await getSite(siteId);
    res.status(200).json({ feedback, site });
  } catch (error) {
    res.status(500).json({ error });
  }
}
