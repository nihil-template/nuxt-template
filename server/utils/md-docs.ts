/// <reference path="../../types/node-lite.d.ts" />

import { readdir, readFile, stat } from 'node:fs/promises';
import { basename, extname, join, resolve } from 'node:path';

type MdDocFrontmatter = Record<string, string | number | boolean | string[]>;

export type MdDocFile = {
  name: string;
  path: string;
  size: number;
};

export type MdDoc = {
  fileName: string;
  frontmatter: MdDocFrontmatter;
  content: string;
  raw: string;
};

const workspaceRoot = resolve('.');
const mdDocsDir = resolve(workspaceRoot, 'md-docs');

function assertInsideMdDocs(filePath: string) {
  const resolvedPath = resolve(mdDocsDir, filePath);

  if (!resolvedPath.startsWith(mdDocsDir)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid markdown document path.',
    });
  }

  return resolvedPath;
}

function parseScalar(value: string) {
  const trimmed = value.trim();

  if (trimmed === 'true') {
    return true;
  }

  if (trimmed === 'false') {
    return false;
  }

  if (/^-?\d+$/.test(trimmed)) {
    return Number(trimmed);
  }

  return trimmed.replace(/^["']|["']$/g, '');
}

function parseFrontmatter(raw: string): Pick<MdDoc, 'frontmatter' | 'content'> {
  if (!raw.startsWith('---')) {
    return {
      frontmatter: {},
      content: raw.trim(),
    };
  }

  const endIndex = raw.indexOf('\n---', 3);

  if (endIndex < 0) {
    return {
      frontmatter: {},
      content: raw.trim(),
    };
  }

  const frontmatterText = raw.slice(3, endIndex).trim();
  const content = raw.slice(endIndex + 4).trim();
  const frontmatter: MdDocFrontmatter = {};
  const lines = frontmatterText.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? '';
    const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (!keyMatch) {
      continue;
    }

    const key = keyMatch[1] ?? '';
    const rawValue = keyMatch[2] ?? '';

    if (rawValue.trim() !== '') {
      frontmatter[key] = parseScalar(rawValue);
      continue;
    }

    const values: string[] = [];

    while (index + 1 < lines.length && /^\s+-\s+/.test(lines[index + 1] ?? '')) {
      index += 1;
      values.push((lines[index] ?? '').replace(/^\s+-\s+/, '').trim());
    }

    frontmatter[key] = values;
  }

  return {
    frontmatter,
    content,
  };
}

export async function listMdDocFiles(): Promise<MdDocFile[]> {
  const entries = await readdir(mdDocsDir, { withFileTypes: true });
  const markdownFiles = entries
    .filter((entry) => entry.isFile() && extname(entry.name).toLowerCase() === '.md')
    .sort((a, b) => a.name.localeCompare(b.name, 'ko'));

  return Promise.all(markdownFiles.map(async (entry) => {
    const filePath = join(mdDocsDir, entry.name);
    const fileStat = await stat(filePath);

    return {
      name: entry.name,
      path: `md-docs/${entry.name}`,
      size: fileStat.size,
    };
  }));
}

export async function readMdDoc(fileName: string): Promise<MdDoc> {
  const safeFileName = basename(fileName);
  const filePath = assertInsideMdDocs(safeFileName);
  const raw = await readFile(filePath, 'utf-8');
  const { frontmatter, content } = parseFrontmatter(raw);

  return {
    fileName: safeFileName,
    frontmatter,
    content,
    raw,
  };
}

export async function readAllMdDocs(): Promise<MdDoc[]> {
  const files = await listMdDocFiles();
  const docs = await Promise.all(files.map((file) => readMdDoc(file.name)));

  return docs.sort((a, b) => {
    const aOrder = Number(a.frontmatter.load_order ?? 999);
    const bOrder = Number(b.frontmatter.load_order ?? 999);

    return aOrder - bOrder;
  });
}

export async function buildMdDocsContext(): Promise<string> {
  const docs = await readAllMdDocs();

  return docs.map((doc) => [
    `# ${doc.frontmatter.system_id ?? doc.fileName}`,
    `File: ${doc.fileName}`,
    `Name: ${doc.frontmatter.system_name ?? ''}`,
    `Type: ${doc.frontmatter.system_type ?? ''}`,
    '',
    doc.content,
  ].join('\n')).join('\n\n---\n\n');
}
