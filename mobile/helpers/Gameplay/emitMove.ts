import { forIn, includes } from "lodash";
import { Line } from "../../consts/types";
/**
 * Contructs an object with a move key based on the line's location and variant,
 * along with whether the game is still in progress and the current lobby,
 * and sends it through the socket
 * @param row The row the line is in
 * @param col The column the line is in
 * @param line Whether the line was horizontal or vertical
 */
const emitMove = (
  row: number,
  col: number,
  line: Line,
  board: any,
  lobby: string,
  whoseTurn: number,
  socket: any
) => {
  // Assumes the only options are horizontal and vertical
  const letterOption = line === Line.Vertical ? "V" : "H";
  const lineKey = row.toString() + col.toString() + letterOption;

  forIn(board, (cell) => {
    if (includes(Object.keys(cell), lineKey)) {
      cell[lineKey] = "played";
    }
  });

  const response = {
    lobby: lobby,
    board: board,
    currentMove: lineKey,
    whoMoved: whoseTurn,
  };
  socket?.current?.emit("Gameplay", response);
};

export default emitMove;
