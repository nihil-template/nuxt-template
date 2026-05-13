declare module 'node:fs/promises' {
  export type Dirent = {
    name: string;
    isFile(): boolean;
  };

  export function readdir(path: string, options: { withFileTypes: true }): Promise<Dirent[]>;
  export function readFile(path: string, encoding: string): Promise<string>;
  export function stat(path: string): Promise<{ size: number }>;
}

declare module 'node:path' {
  export function basename(path: string): string;
  export function extname(path: string): string;
  export function join(...paths: string[]): string;
  export function resolve(...paths: string[]): string;
}
