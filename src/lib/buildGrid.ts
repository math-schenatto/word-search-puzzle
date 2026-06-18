import { WordPlacement } from "@/types/word-placement";

function randomLetterExcluding(excluded: string[]): string {
  const available = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  ).filter(l => !excluded.includes(l));

  const pool = available.length > 0 ? available : Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  return pool[Math.floor(Math.random() * pool.length)];
}

export function buildGrid(
  rows: number,
  cols: number,
  words: WordPlacement[]
) {
  const grid: string[][] = [];
  for (let row = 0; row < rows; row++) {
    grid[row] = [];
    for (let col = 0; col < cols; col++) {
      const excluded: string[] = [];
      if (row > 0) excluded.push(grid[row - 1][col]);
      if (col > 0) excluded.push(grid[row][col - 1]);
      grid[row][col] = randomLetterExcluding(excluded);
    }
  }

  const colors: Record<
    string,
    string
  > = {};

  const wordMap: Record<
    string,
    string
  > = {};

  words.forEach(word => {
    word.word
      .split("")
      .forEach(
        (letter, index) => {
          const row =
            word.direction ===
            "horizontal"
              ? word.row
              : word.row + index;

          const col =
            word.direction ===
            "horizontal"
              ? word.col + index
              : word.col;

          if (
            row >= rows ||
            col >= cols
          ) {
            return;
          }

          grid[row][col] =
            letter;

          const key =
            `${row}-${col}`;

          colors[key] =
            word.color;

          wordMap[key] =
            word.id;
        }
      );
  });

  return {
    grid,
    colors,
    wordMap,
  };
}