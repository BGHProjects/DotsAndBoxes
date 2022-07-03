import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import styles from "../../consts/styles/gameplay";
import { nodeAnim } from "../../consts/variables";

interface GridNodeProps {
  row: number;
  col: number;
  cellLengthNumber: number;
  cellLengthPercent: string;
  nodeSize: number;
  gridContainerSize: number;
}

const GridNode = ({
  row,
  col,
  cellLengthNumber,
  cellLengthPercent,
  nodeSize,
  gridContainerSize,
}: GridNodeProps) => {
  const isFocused = useIsFocused();
  const scaleStart = 0;
  const scaleEnd = 1;
  const animDuration = nodeAnim;
  const appearAnim = useRef(new Animated.Value(scaleStart)).current;
  const delay = (col + 1 + (row + 1)) * animDuration;

  useEffect(() => {
    if (isFocused) {
      Animated.timing(appearAnim, {
        toValue: scaleEnd,
        duration: animDuration,
        delay: delay,
        useNativeDriver: true,
      }).start();
    }
  }, [appearAnim]);

  return (
    <Animated.View
      style={[
        styles(
          row,
          col,
          cellLengthNumber,
          cellLengthPercent,
          nodeSize,
          gridContainerSize
        ).gridNode,
        { transform: [{ scale: appearAnim }] },
      ]}
    />
  );
};

export default GridNode;
