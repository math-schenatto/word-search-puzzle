import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

export async function exportPdf(
  grid: string[][]
) {
  const pdf =
    await PDFDocument.create();

  const page =
    pdf.addPage([
      595.28,
      841.89,
    ]);

  const font =
    await pdf.embedFont(
      StandardFonts.Helvetica
    );

  const letterSpacing = 24;

  const startX = 60;
  const startY = 760;

  grid.forEach(
    (row, rowIndex) => {
      row.forEach(
        (letter, colIndex) => {
          page.drawText(letter, {
            x:
              startX +
              colIndex *
                letterSpacing,

            y:
              startY -
              rowIndex *
                letterSpacing,

            size: 16,
            font,
            color: rgb(0, 0, 0),
          });
        }
      );
    }
  );

  const pdfBytes =
    await pdf.save();

  const blob = new Blob(
    [pdfBytes as unknown as BlobPart],
    {
      type: "application/pdf",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download =
    "caca-palavras.pdf";

  link.click();

  URL.revokeObjectURL(url);
}