import { includes, isNull, isUndefined } from "lodash";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Vibration, Animated } from "react-native";

interface GridCellProps {
  row: number;
  col: number;
  cellLengthPercent: string;
  currentMove: string;
  playerColour: string;
  changeScore: React.Dispatch<React.SetStateAction<number>>;
}

const GridCell = ({
  row,
  col,
  cellLengthPercent,
  currentMove,
  playerColour,
  changeScore,
}: GridCellProps) => {
  const [colour, setColour] = useState("transparent");
  const [cellData, setCellData] = useState({});

  const fadeStart = 0;
  const fadeEnd = 1;
  const fadeAnimDuration = 200;

  const fadeAnim = useRef(new Animated.Value(fadeStart)).current;

  const generateCellData = (row: number, col: number) => {
    const top = col.toString() + row.toString() + "H";
    const left = col.toString() + row.toString() + "V";
    const down = col.toString() + (row + 1).toString() + "H";
    const right = (col + 1).toString() + row.toString() + "V";

    const newSquare: Record<string, string> = {
      [top]: "notPlayed",
      [left]: "notPlayed",
      [down]: "notPlayed",
      [right]: "notPlayed",
    };

    setCellData(newSquare);
  };

  useEffect(() => {
    generateCellData(row, col);
  }, []);

  useEffect(() => {
    if (colour === playerColour) {
      Animated.timing(fadeAnim, {
        toValue: fadeEnd,
        duration: fadeAnimDuration,
        useNativeDriver: true,
      }).start((finished) => {
        if (finished) {
          Vibration.vibrate(100);
        }
      });
    }
  }, [colour]);

  useEffect(() => {
    if (
      isUndefined(cellData) ||
      isNull(cellData) ||
      !includes(Object.keys(cellData), currentMove)
    )
      return;

    if (includes(Object.keys(cellData), currentMove)) {
      const newCellData = cellData;
      newCellData[currentMove] = "played";
      setCellData(newCellData);
    }

    if (includes(Object.values(cellData), "notPlayed")) {
      setColour("transparent");
    } else {
      setColour(playerColour);
      changeScore((old) => old + 1);
    }
  }, [currentMove]);

  const styles = StyleSheet.create({
    container: {
      height: "100%",
      width: cellLengthPercent,
      backgroundColor: colour,
    },
  });

  return <Animated.View style={[styles.container, { opacity: fadeAnim }]} />;
};

export default GridCell;
