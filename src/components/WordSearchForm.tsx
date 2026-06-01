"use client";

interface Props {
  rows: number;
  cols: number;
  words: string;
  onRowsChange: (value: number) => void;
  onColsChange: (value: number) => void;
  onWordsChange: (value: string) => void;
  onGenerate: () => void;
}

export default function WordSearchForm({
  rows,
  cols,
  words,
  onRowsChange,
  onColsChange,
  onWordsChange,
  onGenerate,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <input
        type="number"
        value={rows}
        onChange={(e) =>
          onRowsChange(Number(e.target.value))
        }
        placeholder="Linhas"
        className="border p-2"
      />

      <input
        type="number"
        value={cols}
        onChange={(e) =>
          onColsChange(Number(e.target.value))
        }
        placeholder="Colunas"
        className="border p-2"
      />

      <textarea
        value={words}
        onChange={(e) =>
          onWordsChange(e.target.value)
        }
        placeholder="Uma palavra por linha"
        className="border p-2 h-40"
      />

      <button
        onClick={onGenerate}
        className="bg-black text-white p-2 rounded"
      >
        Gerar
      </button>
    </div>
  );
}