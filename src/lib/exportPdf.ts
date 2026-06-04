import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import { WordPlacement } from "@/types/word-placement";

export async function exportPdf(
  grid: string[][],
  placedWords: WordPlacement[],
) {
  const pdf = await PDFDocument.create();

  const font = await pdf.embedFont(StandardFonts.Helvetica);

  // ======================
  // PÁGINA 1
  // ======================

  const puzzlePage = pdf.addPage([595.28, 841.89]);

  const letterSpacing = 24;

  const startX = 60;
  const startY = 760;

  puzzlePage.drawText("Caça-Palavras", {
    x: 60,
    y: 800,
    size: 22,
    font,
    color: rgb(0, 0, 0),
  });

  grid.forEach((row, rowIndex) => {
    row.forEach((letter, colIndex) => {
      puzzlePage.drawText(letter, {
        x: startX + colIndex * letterSpacing,
        y: startY - rowIndex * letterSpacing,
        size: 16,
        font,
        color: rgb(0, 0, 0),
      });
    });
  });

  // ======================
  // PÁGINA 2 - RESPOSTA
  // ======================

  const answerPage = pdf.addPage([595.28, 841.89]);

  answerPage.drawText("Resposta", {
    x: 60,
    y: 800,
    size: 22,
    font,
    color: rgb(0, 0, 0),
  });

  const cellSize = 24;
  const padding = 4;

  // desenha todas as letras das palavras
  for (const word of placedWords) {
    for (let i = 0; i < word.word.length; i++) {
      const row = word.direction === "horizontal" ? word.row : word.row + i;

      const col = word.direction === "horizontal" ? word.col + i : word.col;

      const x = startX + col * cellSize;

      const y = startY - row * cellSize;

      answerPage.drawText(word.word[i], {
        x: x + 8,
        y: y + 7,
        size: 14,
        font,
        color: rgb(0, 0, 0),
      });
    }
  }

  // desenha um único retângulo por palavra
  for (const word of placedWords) {
    const x = startX + word.col * cellSize;

    const y = startY - word.row * cellSize;

    if (word.direction === "horizontal") {
      answerPage.drawRectangle({
        x: x + padding,
        y: y + padding,
        width: word.word.length * cellSize - padding * 2,
        height: cellSize - padding * 2,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
      });
    } else {
      answerPage.drawRectangle({
        x: x + padding,
        y: y - (word.word.length - 1) * cellSize + padding,
        width: cellSize - padding * 2,
        height: word.word.length * cellSize - padding * 2,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
      });
    }
  }

  const pdfBytes = await pdf.save();

  const blob = new Blob([pdfBytes as unknown as BlobPart], {
    type: "application/pdf",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "caca-palavras.pdf";

  link.click();

  URL.revokeObjectURL(url);
}
