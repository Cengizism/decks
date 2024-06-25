import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllDecks } from '../api'; // Adjust the import path as necessary

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slugs = await getAllDecks();
  res.status(200).json(slugs);
}