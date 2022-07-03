import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Line } from "../../consts/types";

interface LineProps {
  variant: Line;
  row: number;
  col: number;
  lineThickness: number;
  cellLengthNumber: number;
  currentMove: string;
  makeMove: () => void;
  whoseTurn: number;
  playerNo: number;
}

/**
 * Represents either a horizontal or vertical line on the grid
 */
const GridLine = ({
  variant,
  row,
  col,
  lineThickness,
  cellLengthNumber,
  currentMove,
  makeMove,
  whoseTurn,
  playerNo,
}: LineProps) => {
  const enum Colours {
    Played = "white",
    NotPlayed = "transparent",
  }

  // Assumes only vertical or horizontal lines
  const letterOption = variant === Line.Vertical ? "V" : "H";
  const lineKey = row.toString() + col.toString() + letterOption;

  const [colour, setColour] = useState<Colours>(Colours.NotPlayed);

  const commonStyle = {
    position: "absolute",
    borderRadius: 10,
    backgroundColor: colour,
    alignItems: "center",
    justifyContent: "center",
  };

  const styles = StyleSheet.create({
    horizontal: {
      ...(commonStyle as any),
      top: -lineThickness / 2 + cellLengthNumber * col,
      left: cellLengthNumber * row,
      height: lineThickness,
      width: cellLengthNumber,
    },
    vertical: {
      ...(commonStyle as any),
      top: cellLengthNumber * col,
      left: -lineThickness / 2 + cellLengthNumber * row,
      height: cellLengthNumber,
      width: lineThickness,
    },
    pressable: {
      height: cellLengthNumber / 1.8,
      width: cellLengthNumber / 1.8,
      borderRadius: 90,
      backgroundColor: "transparent",
    },
  });

  const lineStyle: Record<Line, any> = {
    [Line.Horizontal]: styles.horizontal,
    [Line.Vertical]: styles.vertical,
  };

  const handleColourChange = () => {
    setColour(Colours.Played);
    makeMove();
  };

  useEffect(() => {
    if (currentMove === lineKey) setColour(Colours.Played);
  }, [currentMove]);

  return (
    <TouchableOpacity
      onPress={handleColourChange}
      disabled={colour === Colours.Played || whoseTurn !== playerNo}
      style={lineStyle[variant]}
    >
      <View style={styles.pressable} />
    </TouchableOpacity>
  );
};

export default GridLine;
