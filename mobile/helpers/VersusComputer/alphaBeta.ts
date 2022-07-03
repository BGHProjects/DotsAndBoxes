import evaluateState from "./evaluateState";
import hypotheticalNewScore from "./hypotheticalNewScore";
import { cloneDeep } from "lodash";

const alphaBeta = (
  lineKey: string,
  depth: any,
  // alpha: any, // Best move for the computer
  // beta: any, // Best move for the human
  maximisingPlayer: boolean,
  humanScore: number,
  AIScore: number,
  possibleMoves: string[],
  board: any
) => {
  let value: number = 0;

  // TODO Figure out what the terminal nodes would be
  if (depth === 0 || possibleMoves.length === 1) {
    return evaluateState(humanScore, AIScore);
  }

  if (maximisingPlayer) {
    value = -9999;
    // We don't want to include the current move in the list of next possible moves
    let pms = cloneDeep(possibleMoves);
    const index = pms.indexOf(lineKey);
    pms.splice(index, 1);

    pms.every((pm) => {
      // Only the AI can score on the AI's move
      const { newScore, newBoard } = hypotheticalNewScore(board, pm, AIScore);

      AIScore = newScore;

      value = Math.max(
        value,
        alphaBeta(pm, depth - 1, false, humanScore, AIScore, pms, newBoard)
      );
    });
    return value;
  } else {
    value = 9999;
    // We don't want to include the current move in the list of next possible moves
    let pms = cloneDeep(possibleMoves);
    const index = pms.indexOf(lineKey);
    pms.splice(index, 1);

    pms.every((pm) => {
      // Only the human can score on the human's move
      const { newScore, newBoard } = hypotheticalNewScore(
        board,
        pm,
        humanScore
      );

      humanScore = newScore;

      value = Math.min(
        value,
        alphaBeta(pm, depth - 1, true, humanScore, AIScore, pms, newBoard)
      );
    });
    return value;
  }
};

export default alphaBeta;
