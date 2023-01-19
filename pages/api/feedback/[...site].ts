import { getAllFeedback, getSite } from '@/lib/firestore-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('req.query.site: ', req.query.site);
  const [siteId, route] = req.query.site;
  const { feedback, error } = await getAllFeedback(siteId, route);
  const { site } = await getSite(siteId);

  if (error) {
    res.status(500).json({ error });
  }

  res.status(200).json({ feedback, site });
}
