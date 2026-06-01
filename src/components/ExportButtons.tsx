interface Props {
  onExportSvg: () => void;
  onExportPdf: () => void;
}

export default function ExportButtons({
  onExportSvg,
  onExportPdf,
}: Props) {
  return (
    <div className="flex gap-4">
      <button
        onClick={onExportSvg}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Exportar SVG
      </button>

      <button
        onClick={onExportPdf}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Exportar PDF
      </button>
    </div>
  );
}