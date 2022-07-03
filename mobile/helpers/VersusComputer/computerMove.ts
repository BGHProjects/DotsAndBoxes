import { cloneDeep, forIn } from "lodash";
import checkPossibility from "./checkPossibility";

const computerMove = (board: any, playerScore: number, AIScore: number) => {
  // Step 0 - Make a copy of the board, so nothing else is affected
  const newBoard = cloneDeep(board);

  // Step 1 - Gather all the current possible moves

  // Object used initially so there are no duplicate values
  const possibleUniqueMoves: any = {};

  forIn(newBoard, (cell) => {
    const cellEntries = Object.entries(cell);
    cellEntries.forEach((line) => {
      // First element is the key
      // Second element is the value
      if (line[1] === "notPlayed") possibleUniqueMoves[line[0]] = "newOption";
    });
  });

  const possibleMoves = Object.keys(possibleUniqueMoves);

  // Step 2 - Evaluate the player's move following a possible move made by the AI

  const allOutcomes: any = {};

  possibleMoves.forEach((move) => {
    const pms = cloneDeep(possibleMoves);
    const index = pms.indexOf(move);
    pms.splice(index, 1);

    const newPlayerScore = playerScore;
    const newAIScore = AIScore;

    const worstOutcome = checkPossibility(
      move,
      newPlayerScore,
      newAIScore,
      pms,
      newBoard
    );

    allOutcomes[move] = worstOutcome;
  });

  const bestMove = Object.entries(allOutcomes).reduce((prev, curr) => {
    return prev[1] > curr[1] ? prev : curr;
  });

  return bestMove[0];
};

export default computerMove;
