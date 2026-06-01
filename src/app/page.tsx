"use client";

import { useState } from "react";

import WordSearchForm from "@/components/WordSearchForm";
import WordSearchGrid from "@/components/WordSearchGrid";
import ExportButtons from "@/components/ExportButtons";

import { buildGrid } from "@/lib/buildGrid";

import { generateSvg } from "@/lib/generateSvg";
import { exportSvg } from "@/lib/exportSvg";
import { exportPdf } from "@/lib/exportPdf";

import { WordPlacement } from "@/types/word-placement";
import { canPlaceWord } from "@/lib/canPlaceWord";

export default function Home() {
  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(15);

  const [words, setWords] = useState("");
  const [wordMap, setWordMap] = useState<Record<string, string>>({});
  const [
    hoverPosition,
    setHoverPosition,
  ] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const [grid, setGrid] = useState<string[][]>([]);
 

  const [
    movingWordId,
    setMovingWordId,
  ] = useState<string | null>(
    null
  );

  
  const moveWord = (
    row: number,
    col: number
  ) => {
    if (!movingWordId) {
      return;
    }

    const movingWord =
      placedWords.find(
        (word) =>
          word.id === movingWordId
      );

    if (!movingWord) {
      return;
    }

    const isValid =
      canPlaceWord(
        movingWord,
        row,
        col,
        placedWords,
        rows,
        cols
      );

    if (!isValid) {
      alert(
        "Não é possível posicionar a palavra aqui."
      );
      return;
    }

    const updatedWords =
      placedWords.map((word) => {
        if (
          word.id !== movingWordId
        ) {
          return word;
        }

        return {
          ...word,
          row,
          col,
        };
      });

    setPlacedWords(
      updatedWords
    );

    const result =
      buildGrid(
        rows,
        cols,
        updatedWords
      );

    setGrid(result.grid);

    setCellColors(
      result.colors
    );

    setWordMap(
      result.wordMap
    );

    setMovingWordId(null);
  };

  const rotateWord = (
    wordId: string
  ) => {
    const updatedWords =
      placedWords.map(
        (word): WordPlacement => {
          if (word.id !== wordId) {
            return word;
          }

          return {
            ...word,
            direction:
              word.direction ===
              "horizontal"
                ? "vertical"
                : "horizontal",
          };
        }
      );

    setPlacedWords(
      updatedWords
    );

    const result =
      buildGrid(
        rows,
        cols,
        updatedWords
      );

    setGrid(result.grid);

    setCellColors(
      result.colors
    );

    setWordMap(
      result.wordMap
    );
  };

  const handleCellClick = (
    row: number,
    col: number
  ) => {
    if (movingWordId) {
      moveWord(row, col);
      return;
    }

    const wordId =
      wordMap[
        `${row}-${col}`
      ];

    if (!wordId) {
      return;
    }

    setMovingWordId(wordId);
  };

  const [placedWords, setPlacedWords] =
    useState<WordPlacement[]>([]);

  const [cellColors, setCellColors] =
    useState<Record<string, string>>({});

 const previewWord: WordPlacement | null =
  movingWordId
    ? (
        placedWords.find(
          (w) =>
            w.id ===
            movingWordId
        ) ?? null
      )
    : null;

  const handleCellHover = (
    row: number,
    col: number
  ) => {
    if (!movingWordId) {
      return;
    }

    setHoverPosition({
      row,
      col,
    });
  };

  const handleGenerate = () => {
    const wordsList = words
      .split("\n")
      .map((word) => word.trim())
      .filter(Boolean)
      .map((word) => word.toUpperCase());

    const colors = [
      "#ef4444",
      "#22c55e",
      "#3b82f6",
      "#eab308",
      "#a855f7",
      "#ec4899",
      "#06b6d4",
      "#f97316",
    ];

    const placements: WordPlacement[] =
      wordsList.map((word, index) => ({
        id: crypto.randomUUID(),

        word,

        row: index,

        col: 0,

        direction: "horizontal",

        color:
          colors[
            index % colors.length
          ],
      }));

    setPlacedWords(placements);

    const result = buildGrid(
      rows,
      cols,
      placements
    );

    setGrid(result.grid);

    setCellColors(
      result.colors
    );

    setWordMap(
      result.wordMap
);
  };

  const handleCellChange = (
    row: number,
    col: number,
    value: string
  ) => {
    const newGrid = [...grid];

    newGrid[row] = [...newGrid[row]];

    newGrid[row][col] =
      value.toUpperCase();

    setGrid(newGrid);
  };

  const handleCellRightClick = (
    row: number,
    col: number
  ) => {
    const wordId =
      wordMap[
        `${row}-${col}`
      ];

    if (!wordId) {
      return;
    }

    rotateWord(wordId);
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Gerador de Caça-Palavras
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <WordSearchForm
            rows={rows}
            cols={cols}
            words={words}
            onRowsChange={setRows}
            onColsChange={setCols}
            onWordsChange={setWords}
            onGenerate={handleGenerate}
          />

          <WordSearchGrid
            grid={grid}
            colors={cellColors}
            wordMap={wordMap}
            movingWordId={
              movingWordId
            }
            placedWords={
              placedWords
            }
            onCellChange={
              handleCellChange
            }
            onCellClick={
              handleCellClick
            }
            onCellRightClick={
              handleCellRightClick
            }
            onCellHover={
              handleCellHover
            }
            previewWord={
              previewWord
            }
            hoverPosition={
              hoverPosition
            }
          />

          <ExportButtons
            onExportSvg={() => {
              const svg =
                generateSvg(grid);

              exportSvg(svg);
            }}
            onExportPdf={() => {
              exportPdf(grid);
            }}
          />
        </div>
      </div>
    </main>
  );
}