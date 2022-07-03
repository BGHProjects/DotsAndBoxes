import { forIn, includes } from "lodash";
/**
 * Updates the board in accordance with the new move received from the socket
 * @param response The move, who moved and the current board
 */
const updateBoard = (
  response: any,
  setCurrentMove: React.Dispatch<React.SetStateAction<string>>,
  setWhoseTurn: React.Dispatch<React.SetStateAction<number>>,
  setBoard: React.Dispatch<React.SetStateAction<any>>
) => {
  setCurrentMove(response.currentMove);

  let boxFormed = false;

  forIn(response.board, (cell) => {
    if (!boxFormed) {
      if (includes(Object.keys(cell), response.currentMove)) {
        const cellValues = Object.values(cell);

        if (includes(cellValues, "played")) {
          /**
           * Sets can only contain unique values
           * Therefore, if the length of the set if one
           * and cellValues contains "played", they must all be "played"
           * and the box must be complete
           */
          if (new Set(cellValues).size === 1) {
            boxFormed = true;
          }
        }
      }
    }
  });

  if (boxFormed) {
    setWhoseTurn(response.whoMoved);
  } else {
    setWhoseTurn(response.whoMoved === 1 ? 2 : 1);
  }

  // Setting the board is asynchronous, so use the response for the update logic
  setBoard(response.board);
};

export default updateBoard;
