import { forIn, includes } from "lodash";

/**
 * Evaluates the state of the game following an inputted move
 * @param board Current state of the board
 * @param move The move to be evaluated
 * @param scoreToUpdate Which score should be changed if a box is formed
 * @returns The newly updated score and board
 */
const hypotheticalNewScore = (
  board: string,
  move: string,
  scoreToUpdate: number
) => {
  // Get rid of outer quotes from the string, so that is parses correctly
  let strippedBoard = board.replace(/"{/g, "{").replace(/}"/g, "}");

  const boardJSON = JSON.parse(strippedBoard);

  forIn(boardJSON, (value, key) => {
    const cellKeys = Object.keys(boardJSON[key]);

    if (includes(cellKeys, move)) {
      if (boardJSON[key][move] === "notPlayed") {
        boardJSON[key][move] = "played";

        const playedLines = Object.values(boardJSON[key]).filter(
          (line) => line === "played"
        ).length;

        // Four played lines means a box has been formed
        if (playedLines === 4) {
          scoreToUpdate += 1;
        }
      }
    }
  });

  return { newScore: scoreToUpdate, newBoard: boardJSON };
};

export default hypotheticalNewScore;
