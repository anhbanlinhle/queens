"use client"

import styles from "@/app/page.module.css";
import React, { useState, useEffect } from "react";
import generateBoard, { getRowPenalty, getColPenalty, getAdjacentPenalty, getColorPenalty, formatTime, formatMove, Position } from "@/utils/Queens";
import Crown from "@/assets/svgs/crown";
import { Button } from "antd";

const Game = () => {
  const [board, setBoard] = useState<string[][]>([[]]);
  const [size, setSize] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);

  const [placedQueens, setPlacedQueens] = useState<Position[]>([]);

  const [penaltyRow, setPenaltyRow] = useState<number[]>([]);
  const [penaltyCol, setPenaltyCol] = useState<number[]>([]);
  const [penaltyAdjacent, setPenaltyAdjacent] = useState<Position[]>([]);
  const [penaltyColor, setPenaltyColor] = useState<string[]>([]);

  const [started, setStarted] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);

  useEffect(() => {
    const penaltyRow = getRowPenalty(placedQueens, size);
    const penaltyCol = getColPenalty(placedQueens, size);
    const penaltyAdjacent = getAdjacentPenalty(placedQueens, size);
    const penaltyColor = getColorPenalty(board, placedQueens, size);

    setPenaltyRow(penaltyRow);
    setPenaltyCol(penaltyCol);
    setPenaltyAdjacent(penaltyAdjacent);
    setPenaltyColor(penaltyColor);
  }, [placedQueens, size, board]);

  useEffect(() => {
    if (placedQueens.length === size
      && placedQueens.length > 0
      && penaltyRow.length === 0
      && penaltyCol.length === 0
      && penaltyAdjacent.length === 0
      && penaltyColor.length === 0
    ) {
      setFinished(true);
    }
  }, [penaltyRow, penaltyCol, penaltyAdjacent, penaltyColor]);

  useEffect(() => {
    let timer: number;
    if (started && !finished) {
      timer = window.setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    if (finished) {
      setStarted(false);
    }
    return () => clearInterval(timer);
  }, [finished, started]);

  useEffect(() => {
    if (started && !finished) {
      setMoves(prevMoves => prevMoves + 1);
    }
  }, [placedQueens]);

  const handleStartGame = () => {
    const _board = generateBoard();
    setBoard(_board.board);
    setSize(_board.size);
    setPlacedQueens([]);
    setPenaltyRow([]);
    setPenaltyCol([]);
    setPenaltyAdjacent([]);
    setPenaltyColor([]);
    setTime(0);
    setMoves(-1);
    setStarted(true);
    setFinished(false);
  }

  const handleCellClick = (row: number, col: number) => {
    if (finished) {
      return;
    }
    if (placedQueens.some((pos) => pos.x === row && pos.y === col)) {
      setPlacedQueens(placedQueens.filter((pos) => pos.x !== row || pos.y !== col));
      return;
    }
    setPlacedQueens([...placedQueens, { x: row, y: col }]);
  };

  const renderHeader = () => {
    return (
      <div className={styles.header}>
        <div className={styles.title}>Queens</div>
      </div>
    );
  };

  const renderStatistics = () => {
    return (
      <div className={styles.statistics}>
        <div>Time: {formatTime(time)}</div>
        <div>Moves: {formatMove(moves)}</div>
      </div>
    );
  };

  const renderCell = (row: number, col: number, color: string) => {
    const isQueenPlaced = placedQueens.some((pos) => pos.x === row && pos.y === col);

    const hasRowPenalty = penaltyRow.includes(row);
    const hasColPenalty = penaltyCol.includes(col);
    const hasAdjacentPenalty = penaltyAdjacent.some(
      pos => pos.x === row && pos.y === col
    );
    const hasColorPenalty = penaltyColor.includes(color);

    const cellStyle = {
      backgroundColor: color,
      position: 'relative' as const,
    };

    const content = isQueenPlaced && (
      <div className={styles.queen}>
        <Crown fill={finished ? '#fff' : '#000'} />
      </div>
    );

    const overlay = (hasRowPenalty || hasColPenalty || hasAdjacentPenalty || hasColorPenalty) && (
      <div className={styles.penaltyOverlay} />
    );

    return (
      <div
        key={`${row}-${col}`}
        style={cellStyle}
        className={styles.cell}
        onClick={() => handleCellClick(row, col)}
      >
        {overlay}
        {content}
      </div>
    );
  }

  const renderBoard = () => {
    return (
      <div className={styles.board} style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => renderCell(rowIndex, colIndex, cell))
        ))}
      </div>
    );
  };

  const renderInfo = () => {
    return (
      <div className={styles.info}>
        <Button className={styles.startButton} onClick={handleStartGame}>
          New Game
        </Button>
        {renderInstructions()}
      </div>
    )
  }

  const renderInstructions = () => {
    return (
      <div className={styles.instructions}>
        <h2>Instructions:</h2>
        <ul>
          <li>Click on a cell to place a queen.</li>
          <li>Queens can't be on the same row, column, or color area.</li>
          <li>Queens can't stay near each other.</li>
        </ul>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {renderHeader()}
      {renderStatistics()}
      <div className={styles.body}>
        {renderBoard()}
        {renderInfo()}
      </div>
    </div>
  );
};

export default Game;