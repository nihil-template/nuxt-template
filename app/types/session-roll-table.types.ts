export interface Quest {
  roll: number;
  title: string;
  text: string;
}

export interface Theme {
  roll: number;
  title: string;
  monsters: string[];
  text: string;
}

export interface Terrain {
  roll: number;
  title: string;
  text: string;
}

export interface RollResult {
  quest: Quest;
  theme: Theme;
  terrain: Terrain;
  hook: string;
}
