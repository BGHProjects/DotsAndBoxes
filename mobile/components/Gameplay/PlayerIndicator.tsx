import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { nodeAnim, playerIndicatorAnimOffset } from "../../consts/variables";

interface PlayerIndicatorProps {
  whichPlayer: string;
  score: number;
  colour: string;
  gridSize: number;
}

const PlayerIndicator = ({
  whichPlayer,
  score,
  colour,
  gridSize,
}: PlayerIndicatorProps) => {
  const fadeStart = 0;
  const fadeEnd = 1;

  const scaleMin = 1;
  const scaleMax = 1.2;

  const appearAnim = useRef(new Animated.Value(fadeStart)).current;
  const scaleAnim = useRef(new Animated.Value(scaleMin)).current;

  const delay = gridSize * 2 * nodeAnim + playerIndicatorAnimOffset;
  const scaleAnimDuration = 200;
  const appearAnimDuration = 1000;

  useEffect(() => {
    Animated.timing(appearAnim, {
      toValue: fadeEnd,
      duration: appearAnimDuration,
      delay: delay,
      useNativeDriver: true,
    }).start();
  }, [appearAnim]);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: scaleMax,
        duration: scaleAnimDuration,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: scaleMin,
        duration: scaleAnimDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [score]);

  return (
    <Animated.View
      style={[
        styles(colour).container,
        { opacity: appearAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <View style={styles(colour).headerContainer}>
        <AutoSizeText
          fontSize={18}
          numberOfLines={2}
          mode={ResizeTextMode.max_lines}
          style={styles(colour).headerLabel}
        >
          {whichPlayer}
        </AutoSizeText>
      </View>
      <View style={styles(colour).scoreContainer}>
        <AutoSizeText
          fontSize={40}
          numberOfLines={2}
          mode={ResizeTextMode.max_lines}
          style={styles(colour).scoreLabel}
        >
          {score}
        </AutoSizeText>
      </View>
    </Animated.View>
  );
};

const styles = (colour: string) =>
  StyleSheet.create({
    container: {
      height: 100,
      width: 100,
      borderRadius: 10,
      borderColor: colour,
      borderWidth: 5,
      backgroundColor: "black",
      alignItems: "center",
      position: "relative",
      marginTop: 30,
    },
    headerContainer: {
      width: "100%",
      height: "25%",
      backgroundColor: colour,
      alignItems: "center",
    },
    headerLabel: {
      color: "white",
      fontSize: 18,
      marginTop: -3,
      fontFamily: "Main",
    },
    scoreContainer: {
      flexGrow: 1,
      backgroundColor: "transparent",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    scoreLabel: {
      color: "white",
      fontSize: 40,
      alignSelf: "center",
      fontFamily: "Main",
      marginTop: -3,
    },
  });

export default PlayerIndicator;
