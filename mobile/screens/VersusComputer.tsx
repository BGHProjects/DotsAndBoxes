import { cloneDeep, range } from "lodash";
import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import BackButton from "../components/Common/BackButton";
import GridCell from "../components/GameGrid/GridCell";
import GridLine from "../components/GameGrid/GridLine";
import EndGameCard from "../components/Gameplay/EndGameCard";
import PlayerIndicator from "../components/Gameplay/PlayerIndicator";
import TurnIndicator from "../components/Gameplay/TurnIndicator";
import styles from "../consts/styles/gameplay";
import { Line } from "../consts/types";
import decideWinner from "../helpers/Gameplay/decideWinner";
import generateCellData from "../helpers/Gameplay/generateCellData";
import computerMove from "../helpers/VersusComputer/computerMove";
import makeMove from "../helpers/VersusComputer/makeMove";
import GridNode from "../components/GameGrid/GridNode";

const VersusComputer = ({ route }: any) => {
  const gridSize = route.params.gridSelection;
  const playerColour = route.params.playerColour;
  const AIColour = route.params.AIColour;

  const [player1Score, setPlayer1Score] = useState(0); // Player
  const [player2Score, setPlayer2Score] = useState(0); // AI
  const [gameOver, setGameOver] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [moveMade, setMoveMade] = useState(false);

  const players = [1, 2];

  // Player 1 starts the game
  const [whoseTurn, setWhoseTurn] = useState(1);

  const rows = range(gridSize);
  const cols = range(gridSize);

  // Need to add an extra element for the nodes, because they rest on vertices
  const nodeRows = [...rows, gridSize];
  const nodeCols = [...rows, gridSize];

  // Used for styling
  const { width: screenWidth } = Dimensions.get("window");
  const gridContainerSize = screenWidth * 0.7;
  const cellLengthNumber = gridContainerSize / gridSize;
  const nodeSize = cellLengthNumber / 2.5;
  const cellLengthPercent = `${100 / gridSize}%`;
  const lineThickness = nodeSize / 3;

  const [board, setBoard] = useState<any>({});
  const [currentMove, setCurrentMove] = useState<any>();

  const playerDetails: Record<number, any> = {
    1: {
      colour: playerColour,
      label: "You",
      score: player1Score,
      changeScore: setPlayer1Score,
    },
    2: {
      colour: AIColour,
      label: "AI",
      score: player2Score,
      changeScore: setPlayer2Score,
    },
  };

  useEffect(() => {
    rows.map((row) => {
      cols.map((col) => {
        generateCellData(row, col, board, setBoard);
      });
    });
  }, []);

  // Checks the scores to see if the game is over
  useEffect(() => {
    if (player1Score + player2Score === gridSize * gridSize) {
      setGameOver(true);
    }
  }, [player1Score, player2Score]);

  useEffect(() => {
    if (gameOver) setShowGameOver(true);
  }, [gameOver]);

  const handleMove = (row: number, col: number, line: Line, board: any) => {
    const { currentBoard, currentMove, scored } = makeMove(
      row,
      col,
      line,
      board
    );

    setBoard(currentBoard);
    setCurrentMove(currentMove);

    if (!scored) setWhoseTurn((whoseTurn) => (whoseTurn === 1 ? 2 : 1));
    setMoveMade(true);
  };

  const computersTurn = () => {
    setTimeout(() => {
      const boardCopy = cloneDeep(board);
      const cm = computerMove(boardCopy, player1Score, player2Score);
      const line = cm[2] === "H" ? Line.Horizontal : Line.Vertical;
      handleMove(Number(cm[0]), Number(cm[1]), line, board);
    }, 300);
  };

  useEffect(() => {
    if (moveMade) {
      setTimeout(() => {
        if (
          whoseTurn === 2 &&
          !(player1Score + player2Score === gridSize ** 2)
        ) {
          computersTurn();
        }
      }, 250);

      setMoveMade(false);
    }
  }, [moveMade]);

  return (
    <>
      <View
        style={
          styles(
            0,
            0,
            cellLengthNumber,
            cellLengthPercent,
            nodeSize,
            gridContainerSize
          ).pageContainer
        }
      >
        <TurnIndicator
          playerNo={1}
          whoseTurn={whoseTurn}
          gameOver={gameOver}
          gridSize={gridSize}
        />
        <BackButton />
        <View
          style={
            styles(
              0,
              0,
              cellLengthNumber,
              cellLengthPercent,
              nodeSize,
              gridContainerSize
            ).gridContainer
          }
        >
          <>
            {/* Draws the square cells */}
            {rows.map((row) => {
              return (
                <View
                  key={row}
                  style={
                    styles(
                      row,
                      0,
                      cellLengthNumber,
                      cellLengthPercent,
                      nodeSize,
                      gridContainerSize
                    ).rowContainer
                  }
                >
                  {cols.map((col) => {
                    return (
                      <GridCell
                        key={row.toString() + col.toString()}
                        row={row}
                        col={col}
                        cellLengthPercent={cellLengthPercent}
                        currentMove={currentMove}
                        playerColour={playerDetails[whoseTurn].colour}
                        changeScore={playerDetails[whoseTurn].changeScore}
                      />
                    );
                  })}
                </View>
              );
            })}

            {/* Draws the player-drawn lines */}

            {/* Horizontal Lines */}
            {rows.map((row) => {
              return nodeCols.map((col) => {
                return (
                  <GridLine
                    key={row + col}
                    variant={Line.Horizontal}
                    row={row}
                    col={col}
                    lineThickness={lineThickness}
                    cellLengthNumber={cellLengthNumber}
                    currentMove={currentMove}
                    makeMove={() =>
                      handleMove(row, col, Line.Horizontal, board)
                    }
                    whoseTurn={whoseTurn}
                    playerNo={1}
                  />
                );
              });
            })}

            {/* Vertical Lines */}
            {nodeRows.map((row) => {
              return cols.map((col) => {
                return (
                  <GridLine
                    key={row + col}
                    variant={Line.Vertical}
                    row={row}
                    col={col}
                    lineThickness={lineThickness}
                    cellLengthNumber={cellLengthNumber}
                    currentMove={currentMove}
                    makeMove={() => handleMove(row, col, Line.Vertical, board)}
                    whoseTurn={whoseTurn}
                    playerNo={1}
                  />
                );
              });
            })}

            {/* Draws the nodes at the corners */}
            {nodeRows.map((row) => {
              return nodeCols.map((col) => {
                return (
                  <GridNode
                    key={row.toString() + col.toString()}
                    row={row}
                    col={col}
                    cellLengthPercent={cellLengthPercent}
                    cellLengthNumber={cellLengthNumber}
                    nodeSize={nodeSize}
                    gridContainerSize={gridContainerSize}
                  />
                );
              });
            })}
          </>
        </View>
        <View
          style={
            styles(
              0,
              0,
              cellLengthNumber,
              cellLengthPercent,
              nodeSize,
              gridContainerSize
            ).playerRowContainer
          }
        >
          {players.map((player) => {
            return (
              <PlayerIndicator
                key={player}
                whichPlayer={playerDetails[player].label}
                colour={playerDetails[player].colour}
                score={playerDetails[player].score}
                gridSize={gridSize}
              />
            );
          })}
        </View>
      </View>
      {showGameOver && (
        <EndGameCard
          winner={decideWinner(player1Score, player2Score)}
          close={() => setShowGameOver(false)}
        />
      )}
    </>
  );
};

export default VersusComputer;
