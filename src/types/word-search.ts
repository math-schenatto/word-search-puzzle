export type Direction =
  | "horizontal"
  | "vertical"
  | "diagonal";

export interface GenerateWordSearchParams {
  rows: number;
  cols: number;
  words: string[];
}

export type Grid = string[][];