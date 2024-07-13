import fs from 'fs';
import { join } from 'path';

const contentDirectory = join(process.cwd(), 'content');

export function readCardFiles(folder: string): string[] {
  if (!folder) {
    console.error('Invalid folder name:', folder);
    return [];
  }
  const deckPath = join(contentDirectory, folder);
  try {
    return fs.readdirSync(deckPath).filter((file) => file.endsWith('.mdx'));
  } catch (error) {
    console.error(`Error reading directory at path ${deckPath}:`, error);
    return [];
  }
}
