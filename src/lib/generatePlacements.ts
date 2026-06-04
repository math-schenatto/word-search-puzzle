import { WordPlacement } from "@/types/word-placement";

function canPlace(
  word: string,
  row: number,
  col: number,
  direction: "horizontal" | "vertical",
  placements: WordPlacement[],
  rows: number,
  cols: number,
) {
  if (direction === "horizontal" && col + word.length > cols) {
    return false;
  }

  if (direction === "vertical" && row + word.length > rows) {
    return false;
  }

  for (let i = 0; i < word.length; i++) {
    const r = direction === "horizontal" ? row : row + i;

    const c = direction === "horizontal" ? col + i : col;

    for (const placed of placements) {
      for (let j = 0; j < placed.word.length; j++) {
        const pr =
          placed.direction === "horizontal" ? placed.row : placed.row + j;

        const pc =
          placed.direction === "horizontal" ? placed.col + j : placed.col;

        if (pr === r && pc === c) {
          const existingLetter = placed.word[j];

          if (existingLetter !== word[i]) {
            return false;
          }
        }
      }
    }
  }

  return true;
}

export function generatePlacements(
  words: string[],
  rows: number,
  cols: number,
): WordPlacement[] {
  const placements: WordPlacement[] = [];

  const sortedWords = [...words].sort((a, b) => b.length - a.length);

  for (const word of sortedWords) {
    let placed = false;

    for (let attempt = 0; attempt < 200; attempt++) {
      const direction = Math.random() > 0.5 ? "horizontal" : "vertical";

      const row = Math.floor(Math.random() * rows);

      const col = Math.floor(Math.random() * cols);

      if (canPlace(word, row, col, direction, placements, rows, cols)) {
        placements.push({
          id: crypto.randomUUID(),
          word,
          row,
          col,
          direction,
          color: "",
        });

        placed = true;
        break;
      }
    }

    if (!placed) {
      console.warn(`Não foi possível posicionar: ${word}`);
    }
  }

  return placements;
}
