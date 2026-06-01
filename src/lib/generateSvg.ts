export function generateSvg(
  grid: string[][]
) {
  const lineHeight = 40;

  const margin = 40;

  const width = 1200;
  const height =
    grid.length *
      lineHeight +
    margin * 2;

  let svg = `
<svg
 xmlns="http://www.w3.org/2000/svg"
 width="${width}"
 height="${height}"
>
`;

  grid.forEach(
    (row, rowIndex) => {
      svg += `
<text
 x="${margin}"
 y="${
   margin +
   rowIndex *
     lineHeight
 }"
 font-family="Arial"
 font-size="24"
 letter-spacing="12"
>
${row.join(" ")}
</text>
`;
    }
  );

  svg += `
</svg>
`;

  return svg;
}