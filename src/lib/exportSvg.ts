export function exportSvg(
  svg: string
) {
  const blob = new Blob(
    [svg],
    {
      type: "image/svg+xml",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;
  a.download =
    "caca-palavras.svg";

  a.click();

  URL.revokeObjectURL(url);
}