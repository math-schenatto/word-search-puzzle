"use client";

import { WordPlacement } from "@/types/word-placement";

interface Props {
  grid: string[][];
  colors: Record<string, string>;
  wordMap: Record<string, string>;
  movingWordId: string | null;
  placedWords: WordPlacement[];
  previewWord:
  WordPlacement | null;
    hoverPosition: {
    row: number;
    col: number;
    } | null;
  onCellClick: (
    row: number,
    col: number
  ) => void;
  onCellChange: (
    row: number,
    col: number,
    value: string
  ) => void;
  onCellRightClick: (
    row: number,
    col: number
  ) => void;
  onCellHover: (
    row: number,
    col: number
    ) => void;
}

export default function WordSearchGrid({
  grid,
  colors,
  wordMap,
  movingWordId,
  placedWords,
  previewWord,
  hoverPosition,
  onCellClick,
  onCellRightClick,
  onCellChange,
  onCellHover,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      {grid.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-1"
        >
          {row.map((cell, colIndex) => {
            const color =
              colors[
                `${rowIndex}-${colIndex}`
              ];
            const cellWordId =
                wordMap[
                    `${rowIndex}-${colIndex}`
                ];

          

            const isMoving =
                cellWordId === movingWordId;

            const word =
                placedWords.find(
                    (w) => w.id === cellWordId
                );

            let isPreview = false;
            if (
  previewWord &&
  hoverPosition
) {
  if (
    previewWord.direction ===
    "horizontal"
  ) {
    if (
      rowIndex ===
      hoverPosition.row
    ) {
      const startCol =
        hoverPosition.col;

      const endCol =
        startCol +
        previewWord.word.length -
        1;

      isPreview =
        colIndex >= startCol &&
        colIndex <= endCol;
    }
  } else {
    if (
      colIndex ===
      hoverPosition.col
    ) {
      const startRow =
        hoverPosition.row;

      const endRow =
        startRow +
        previewWord.word.length -
        1;

      isPreview =
        rowIndex >= startRow &&
        rowIndex <= endRow;
    }
  }
}

            let borderRadius = {};

if (word) {
  const isStart =
    rowIndex === word.row &&
    colIndex === word.col;

  const isEnd =
    word.direction ===
    "horizontal"
      ? rowIndex === word.row &&
        colIndex ===
          word.col +
            word.word.length -
            1
      : rowIndex ===
          word.row +
            word.word.length -
            1 &&
        colIndex === word.col;

  if (isStart) {
    borderRadius =
      word.direction ===
      "horizontal"
        ? {
            borderTopLeftRadius:
              "12px",
            borderBottomLeftRadius:
              "12px",
          }
        : {
            borderTopLeftRadius:
              "12px",
            borderTopRightRadius:
              "12px",
          };
  }

  if (isEnd) {
    borderRadius =
      word.direction ===
      "horizontal"
        ? {
            ...borderRadius,
            borderTopRightRadius:
              "12px",
            borderBottomRightRadius:
              "12px",
          }
        : {
            ...borderRadius,
            borderBottomLeftRadius:
              "12px",
            borderBottomRightRadius:
              "12px",
          };
  }
}

            return (
              <input
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                maxLength={1}
                onClick={() =>
                    onCellClick(
                        rowIndex,
                        colIndex
                    )
                }
                onChange={(e) =>
                  onCellChange(
                    rowIndex,
                    colIndex,
                    e.target.value.toUpperCase()
                  )
                }
                onContextMenu={(e) => {
                    e.preventDefault();

                    onCellRightClick(
                        rowIndex,
                        colIndex
                    );
                }}
                onMouseEnter={() =>
                    onCellHover(
                        rowIndex,
                        colIndex
                    )
                }
                className="
                  w-10
                  h-10
                  border-2
                  text-center
                  font-bold
                "
                style={{
                    borderColor:
                        isMoving
                        ? "#9ca3af"
                        : color ??
                        "#d1d5db",

                    borderWidth:
                        isMoving
                        ? "3px"
                        : "2px",

                    backgroundColor:
                        isPreview
                        ? "#d1d5db80"
                        : isMoving
                        ? "#9ca3af40"
                        : color
                        ? `${color}20`
                        : undefined,
                    ...borderRadius,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}