import { Grid } from "@/types/word-search";

export function generateWordSearch(
  rows: number,
  cols: number,
  words: string[]
) {
  const grid = Array.from(
    { length: rows },
    () => Array(cols).fill("")
  );

  words.forEach((word, rowIndex) => {
    if (rowIndex >= rows) return;

    for (
      let col = 0;
      col < word.length &&
      col < cols;
      col++
    ) {
      grid[rowIndex][col] =
        word[col];
    }
  });

  for (
    let row = 0;
    row < rows;
    row++
  ) {
    for (
      let col = 0;
      col < cols;
      col++
    ) {
      if (!grid[row][col]) {
        grid[row][col] =
          String.fromCharCode(
            65 +
              Math.floor(
                Math.random() * 26
              )
          );
      }
    }
  }

  return grid;
}