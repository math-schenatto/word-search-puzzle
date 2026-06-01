export interface WordPlacement {
  id: string;

  word: string;

  row: number;
  col: number;

  direction:
    | "horizontal"
    | "vertical";

  color: string;
}