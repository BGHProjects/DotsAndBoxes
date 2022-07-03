import { range } from "lodash";
import React, { useContext, useEffect, useState } from "react";
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
import emitMove from "../helpers/Gameplay/emitMove";
import generateCellData from "../helpers/Gameplay/generateCellData";
import updateBoard from "../helpers/Gameplay/updateBoard";
import { SocketContext } from "../tools/SocketContext";
import GridNode from "../components/GameGrid/GridNode";

const Gameplay = ({ route }: any) => {
  const { socket } = useContext(SocketContext);

  const lobby = route.params.lobby;
  const playerNo = route.params.playerNo;
  const gridSize = route.params.lobby.gridSelection;

  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);

  // Assumes only two players
  const otherPlayer = playerNo === 1 ? 2 : 1;

  // Array used so playerIndicators can be mapped below
  const players = [playerNo, otherPlayer];

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
      colour: "red",
      label: playerNo === 1 ? "You" : "Player 1",
      score: player1Score,
      changeScore: setPlayer1Score,
    },
    2: {
      colour: "dodgerblue",
      label: playerNo === 2 ? "You" : "Player 2",
      score: player2Score,
      changeScore: setPlayer2Score,
    },
  };

  useEffect(() => {
    rows.map((row: number) => {
      cols.map((col: number) => {
        generateCellData(row, col, board, setBoard);
      });
    });

    if (socket) {
      socket.current.on(lobby, (msg: any) => {
        updateBoard(msg, setCurrentMove, setWhoseTurn, setBoard);
      });
    }

    return () => {
      socket?.current?.disconnect();
    };
  }, [socket]);

  // Checks the scores to see if the game is over
  useEffect(() => {
    if (player1Score + player2Score === gridSize * gridSize) {
      setGameOver(true);
    }
  }, [player1Score, player2Score]);

  useEffect(() => {
    if (gameOver) setShowGameOver(true);
  }, [gameOver]);

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
          playerNo={playerNo}
          whoseTurn={whoseTurn}
          gameOver={gameOver}
          gridSize={gridSize}
        />
        <BackButton mainMenu />
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
            {rows.map((row: number) => {
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
                  {cols.map((col: number) => {
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
            {rows.map((row: number) => {
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
                      emitMove(
                        row,
                        col,
                        Line.Horizontal,
                        board,
                        lobby,
                        whoseTurn,
                        socket
                      )
                    }
                    whoseTurn={whoseTurn}
                    playerNo={playerNo}
                  />
                );
              });
            })}

            {/* Vertical Lines */}
            {nodeRows.map((row) => {
              return cols.map((col: number) => {
                return (
                  <GridLine
                    key={row + col}
                    variant={Line.Vertical}
                    row={row}
                    col={col}
                    lineThickness={lineThickness}
                    cellLengthNumber={cellLengthNumber}
                    currentMove={currentMove}
                    makeMove={() =>
                      emitMove(
                        row,
                        col,
                        Line.Vertical,
                        board,
                        lobby,
                        whoseTurn,
                        socket
                      )
                    }
                    whoseTurn={whoseTurn}
                    playerNo={playerNo}
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

export default Gameplay;
