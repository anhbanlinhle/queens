const COLORS = [
  '#ff928b',
  '#7bf1a8',
  '#70d6ff',
  '#fae588',
  '#ffc6ff',
  '#9bf6ff',
  '#ffd6a5',
  '#bdb2ff',
  '#a5ffd6',
  '#a0c4ff',
  '#ff70a6',
  '#c1fba4',
];

type Cell = {
  isQueen: boolean;
  color: string;
  distance: number;
}

export type Position = {
  x: number;
  y: number;
}

type BoardResult = {
  board: (string)[][];
  size: number;
}

const generateBoard = (): BoardResult => {
  const size: number = Math.floor(Math.random() * (12 - 9 + 1)) + 9;

  const board: Cell[][] = Array(size).fill(null).map(() =>
    Array(size).fill(null).map(() => ({
      isQueen: false,
      color: '',
      distance: Infinity
    }))
  );

  const usedColumns = new Set<number>();
  const queenPositions: [number, number][] = [];

  for (let row = 0; row < size; row++) {
    const availableColumns: number[] = [];

    for (let col = 0; col < size; col++) {
      if (isValidPosition(board, row, col, usedColumns)) {
        availableColumns.push(col);
      }
    }

    if (availableColumns.length === 0) {
      return generateBoard();
    }

    const randomCol = availableColumns[Math.floor(Math.random() * availableColumns.length)];
    board[row][randomCol].isQueen = true;
    usedColumns.add(randomCol);
    queenPositions.push([row, randomCol]);
  }

  queenPositions.forEach(([qRow, qCol], index) => {
    const queue: [number, number, number][] = [[qRow, qCol, 0]];
    const visited = new Set<string>();
    const color = COLORS[index % COLORS.length];

    board[qRow][qCol].color = color;
    board[qRow][qCol].distance = 0;
    visited.add(`${qRow},${qCol}`);

    while (queue.length > 0) {
      const [row, col, dist] = queue.shift()!;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;

          const newRow = row + i;
          const newCol = col + j;
          const key = `${newRow},${newCol}`;

          if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size) {
            continue;
          }
          if (visited.has(key)) {
            continue;
          }
          if (board[newRow][newCol].isQueen) {
            continue;
          }

          const newDist = dist + 1;

          if (newDist < board[newRow][newCol].distance) {
            board[newRow][newCol].distance = newDist;
            board[newRow][newCol].color = color;
            visited.add(key);
            queue.push([newRow, newCol, newDist]);
          }
        }
      }
    }
  });

  return {
    board: board.map(row =>
      row.map(cell => cell.color)
    ),
    size,
  };
};

const isValidPosition = (
  board: Cell[][],
  row: number,
  col: number,
  usedColumns: Set<number>
): boolean => {
  const size = board.length;

  if (usedColumns.has(col)) return false;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const newRow = row + i;
      const newCol = col + j;
      if (
        newRow >= 0 && newRow < size &&
        newCol >= 0 && newCol < size &&
        board[newRow][newCol].isQueen
      ) {
        return false;
      }
    }
  }

  return true;
};

export const getRowPenalty = (placedQueens: Position[], size: number): number[] => {
  const duplicates = Array.from({ length: size }, (_, i) => {
    const queensInRow = placedQueens.filter(pos => pos.x === i);
    return queensInRow.length > 1 ? i : -1;
  }).filter(row => row !== -1);

  return duplicates;
};

export const getColPenalty = (placedQueens: Position[], size: number): number[] => {
  const duplicates = Array.from({ length: size }, (_, i) => {
    const queensInCol = placedQueens.filter(pos => pos.y === i);
    return queensInCol.length > 1 ? i : -1;
  }).filter(col => col !== -1);

  return duplicates;
};

export const getAdjacentPenalty = (placedQueens: Position[], size: number): Position[] => {
  const penaltyAdjacent: Position[] = [];

  placedQueens.forEach((queen1, i) => {
    placedQueens.forEach((queen2, j) => {
      if (i !== j) {
        const dx = Math.abs(queen1.x - queen2.x);
        const dy = Math.abs(queen1.y - queen2.y);
        if (dx <= 1 && dy <= 1) {
          if (!penaltyAdjacent.some(pos => pos.x === queen1.x && pos.y === queen1.y)) {
            penaltyAdjacent.push(queen1);
          }
          if (!penaltyAdjacent.some(pos => pos.x === queen2.x && pos.y === queen2.y)) {
            penaltyAdjacent.push(queen2);
          }
        }
      }
    });
  });

  return penaltyAdjacent;
};

export const getColorPenalty = (board: string[][], placedQueens: Position[], size: number): string[] => {
  const penaltyColor: string[] = [];
  const colorCounts = new Map<string, number>();
  placedQueens.forEach(queen => {
    const color = board[queen.x][queen.y];
    colorCounts.set(color, (colorCounts.get(color) || 0) + 1);
  });
  colorCounts.forEach((count, color) => {
    if (count > 1) {
      penaltyColor.push(color);
    }
  });

  return penaltyColor;
}

export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const formatMove = (move: number): string => {
  return move.toString().padStart(2, '0');
};

export default generateBoard;