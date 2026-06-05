export type AtlasPinKind
  = | 'kingdom'
    | 'city'
    | 'village'
    | 'dungeon'
    | 'landmark'
    | 'session'
    | 'event';

export type AtlasPinVisibility = 'public' | 'party' | 'gm';

export type AtlasPin = {
  id: string;
  kind: AtlasPinKind;

  name: string;
  x: number;
  y: number;

  summary?: string;
  description?: string;
  imageUrl?: string;
  notionUrl?: string;

  tags?: string[];
  visibility: AtlasPinVisibility;

  sessionNo?: number;
  sessionTitle?: string;
  sessionDate?: string;

  relatedPinIds?: string[];
};
