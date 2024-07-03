import { getAllDecks } from '@/lib/api';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slugs = await getAllDecks();
  res.status(200).json(slugs);
}
