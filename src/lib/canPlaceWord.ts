import { WordPlacement } from "@/types/word-placement";

export function canPlaceWord(
  wordToMove: WordPlacement,
  targetRow: number,
  targetCol: number,
  placedWords: WordPlacement[],
  rows: number,
  cols: number
) {
  const direction =
    wordToMove.direction;

  const letters =
    wordToMove.word.split("");

  for (
    let i = 0;
    i < letters.length;
    i++
  ) {
    const row =
      direction ===
      "horizontal"
        ? targetRow
        : targetRow + i;

    const col =
      direction ===
      "horizontal"
        ? targetCol + i
        : targetCol;

    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols
    ) {
      return false;
    }

    const currentLetter =
      letters[i];

    for (const placed of placedWords) {
      if (
        placed.id ===
        wordToMove.id
      ) {
        continue;
      }

      const placedLetters =
        placed.word.split("");

      for (
        let j = 0;
        j <
        placedLetters.length;
        j++
      ) {
        const placedRow =
          placed.direction ===
          "horizontal"
            ? placed.row
            : placed.row + j;

        const placedCol =
          placed.direction ===
          "horizontal"
            ? placed.col + j
            : placed.col;

        if (
          placedRow === row &&
          placedCol === col
        ) {
          const existingLetter =
            placedLetters[j];

          if (
            existingLetter !==
            currentLetter
          ) {
            return false;
          }
        }
      }
    }
  }

  return true;
}