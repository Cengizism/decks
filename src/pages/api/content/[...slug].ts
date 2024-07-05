import { NextApiRequest, NextApiResponse } from 'next';
import { createReadStream, stat } from 'fs';
import { join } from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  const filePath = join(process.cwd(), 'content', ...(slug as string[]));

  stat(filePath, (err) => {
    if (err) {
      res.status(404).end('Not found');
      return;
    }

    const stream = createReadStream(filePath);
    const extension = filePath.split('.').pop();

    const contentTypeMap: { [key: string]: string } = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      svg: 'image/svg+xml',
    };

    const contentType = contentTypeMap[extension || ''] || 'application/octet-stream';

    res.setHeader('Content-Type', contentType);
    stream.pipe(res);

    stream.on('end', () => {
      res.end();
    });

    stream.on('error', (streamErr) => {
      console.error(`Error streaming file ${filePath}:`, streamErr);
      res.status(500).end('Internal server error');
    });
  });
}
