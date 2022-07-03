import { forIn, includes } from "lodash";
import { Line } from "../../consts/types";

const makeMove = (row: number, col: number, line: Line, board: any) => {
  // Assumes the only options are horizontal and vertical
  const letterOption = line === Line.Vertical ? "V" : "H";
  const lineKey = row.toString() + col.toString() + letterOption;
  const currentBoard = board;
  let scored = false;

  forIn(currentBoard, (cell) => {
    if (includes(Object.keys(cell), lineKey)) {
      cell[lineKey] = "played";

      if (new Set(Object.values(cell)).size === 1) scored = true;
    }
  });

  return { currentBoard: currentBoard, currentMove: lineKey, scored: scored };
};

export default makeMove;
