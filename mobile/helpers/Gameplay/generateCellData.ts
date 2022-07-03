/**
 * Creates the object that holds whether or not each side has been played or not for each cell on the grid
 * @param row The cell's row
 * @param col The cell's column
 */
const generateCellData = (
  row: number,
  col: number,
  board: any,
  setBoard: React.Dispatch<React.SetStateAction<any>>
) => {
  const top = col.toString() + row.toString() + "H";
  const left = col.toString() + row.toString() + "V";
  const down = col.toString() + (row + 1).toString() + "H";
  const right = (col + 1).toString() + row.toString() + "V";

  const newSquare = {
    [top]: "notPlayed",
    [left]: "notPlayed",
    [down]: "notPlayed",
    [right]: "notPlayed",
  };

  let boardSquares = board;

  if (!boardSquares.hasOwnProperty(row.toString() + col.toString())) {
    boardSquares[row.toString() + col.toString()] = newSquare;
  }

  setBoard(boardSquares);
};

export default generateCellData;
