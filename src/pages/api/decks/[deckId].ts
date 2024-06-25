import type { NextApiRequest, NextApiResponse } from 'next';
// Import your method to get cards of a specific deck
import { getCardsByDeck } from '../api'; // Adjust the import path as necessary

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { deckId } = req.query;

  // const deck = await getDeckBySlug(params.slug);

  // if (!deck) {
  //   return notFound();
  // }

  // const cards = await getCardsByDeck(deck.folder);

  try {
    const cards = await getCardsByDeck(deckId as string);
    res.status(200).json(cards);
  } catch (error) {
    res.status(404).json({ message: `Deck with id ${deckId} not found` });
  }
}