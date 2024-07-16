import { cardFilesCache } from './card-files-cache';

export function readCardFiles(folder: string): string[] {
  if (!folder) {
    console.error('Invalid folder name:', folder);
    return [];
  }
  return cardFilesCache[folder] || [];
}
