import evaluateState from "./evaluateState";
import hypotheticalNewScore from "./hypotheticalNewScore";
import { cloneDeep, forEach, isUndefined } from "lodash";

const checkPossibility = (
  lineKey: string,
  humanScore: number,
  AIScore: number,
  possibleMoves: string[],
  board: any
) => {
  const boardString = JSON.stringify(board);
  // Step 1 - Evalute the computer move
  const { newScore, newBoard } = hypotheticalNewScore(
    boardString,
    lineKey,
    AIScore
  );
  AIScore = newScore;

  // Step 2 - Find all possible human moves
  const pms = cloneDeep(possibleMoves);
  const index = pms.indexOf(lineKey);
  pms.splice(index, 1);

  // Step 3 - For each possible human move, evaluate it, and store it

  const humanMoves: any = {};

  forEach(pms, (pm) => {
    // So each possible new move has its own board

    let newBoardString = JSON.stringify(newBoard);
    newBoardString = newBoardString.replace(/\\/g, "");

    const thisVariantHumanScore = humanScore;
    const thisVariantAIScore = AIScore;

    const { newScore: newPlayerScore, newBoard: new2ndMoveBoard } =
      hypotheticalNewScore(newBoardString, pm, thisVariantHumanScore);

    humanMoves[pm] = evaluateState(newPlayerScore, thisVariantAIScore);
  });

  // Step 4 - Of all the evaluated moves, pick the one where the human scored the highest
  // This is so we assume that the human makes the best move

  let worstOutcome: number;

  if (Object.values(humanMoves).length === 0) {
    worstOutcome = -1;
  } else if (Object.values(humanMoves).length === 1) {
    worstOutcome = Object.values(humanMoves)[0] as number;
  } else {
    worstOutcome = Object.entries(humanMoves).reduce((prev: any, curr: any) => {
      const prevValue: number = Array.isArray(prev)
        ? (prev[1] as number)
        : prev;
      return prevValue < (curr[1] as number) ? (prevValue as number) : curr[1];
    });
  }

  // Step 5 - Return the move and its score
  return worstOutcome;
};

export default checkPossibility;
