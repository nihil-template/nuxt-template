import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { ResponseMessage } from '~/data/response-message.data';
import type { Quest, Theme, Terrain } from '~/types/session-roll-table.types';
import { BaseResponse } from '~~/server/utils/base-response.util';
import { parseCsv } from '~~/server/utils/csv-parser.util';

const dataDir = resolve(process.cwd(), 'server/data/session-roll-table');

export default defineEventHandler(async () => {
  const questsRaw = readFileSync(resolve(dataDir, 'quests.csv'), 'utf-8');
  const themesRaw = readFileSync(resolve(dataDir, 'themes.csv'), 'utf-8');
  const terrainsRaw = readFileSync(resolve(dataDir, 'terrains.csv'), 'utf-8');

  const parseQuests = (raw: string): Quest[] => {
    const rows = parseCsv(raw).slice(1);
    return rows.map((row) => {
      const titleText = row[1] || '';
      const dashIndex = titleText.indexOf('–');
      const title = dashIndex > -1
        ? titleText.slice(0, dashIndex).trim()
        : titleText.trim();
      const text = dashIndex > -1
        ? titleText.slice(dashIndex + 1).trim()
        : '';
      return {
        roll: Number(row[0]),
        title,
        text,
      };
    });
  };

  const parseThemes = (raw: string): Theme[] => {
    const rows = parseCsv(raw).slice(1);
    return rows.map((row) => ({
      roll: Number(row[0]),
      title: row[1] || '',
      monsters: (row[2] || '').split('|').map((s) => s.trim()).filter(Boolean),
      text: row[3] || '',
    }));
  };

  const parseTerrains = (raw: string): Terrain[] => {
    const rows = parseCsv(raw).slice(1);
    return rows.map((row) => ({
      roll: Number(row[0]),
      title: row[1] || '',
      text: row[2] || '',
    }));
  };

  const quests = parseQuests(questsRaw);
  const themes = parseThemes(themesRaw);
  const terrains = parseTerrains(terrainsRaw);

  return BaseResponse.data({ quests, themes, terrains, }, 'OK', ResponseMessage.OK);
});
