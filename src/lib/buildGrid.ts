import { WordPlacement } from "@/types/word-placement";

export function buildGrid(
  rows: number,
  cols: number,
  words: WordPlacement[]
) {
  const grid = Array.from(
    { length: rows },
    () =>
      Array.from(
        { length: cols },
        () =>
          String.fromCharCode(
            65 +
              Math.floor(
                Math.random() * 26
              )
          )
      )
  );

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