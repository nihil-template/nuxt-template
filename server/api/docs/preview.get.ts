import { z } from 'zod';
import { readMdDoc } from '../../utils/md-docs';

const querySchema = z.object({
  file: z.string().min(1),
});

export default defineEventHandler(async (event) => {
  const query = querySchema.safeParse(getQuery(event));

  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'file query is required.',
    });
  }

  const doc = await readMdDoc(query.data.file);

  return {
    fileName: doc.fileName,
    frontmatter: doc.frontmatter,
    preview: doc.content.slice(0, 2400),
    contentLength: doc.content.length,
  };
});
