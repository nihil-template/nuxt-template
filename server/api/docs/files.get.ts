import { listMdDocFiles } from '../../utils/md-docs';

export default defineEventHandler(async () => {
  const files = await listMdDocFiles();

  return {
    count: files.length,
    files,
  };
});
