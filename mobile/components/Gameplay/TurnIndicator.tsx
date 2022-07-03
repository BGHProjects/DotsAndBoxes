import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import {
  nodeAnim,
  playerIndicatorAnimOffset,
  turnIndicatorAnimOffset,
} from "../../consts/variables";

interface TurnIndicatorProps {
  whoseTurn: number;
  playerNo: number;
  gameOver: boolean;
  gridSize: number;
}

const TurnIndicator = ({
  playerNo,
  whoseTurn,
  gameOver,
  gridSize,
}: TurnIndicatorProps) => {
  const [label, setLabel] = useState<string | undefined>();
  const [gameStarted, setGameStarted] = useState(false);

  const fadeStart = 0;
  const fadeEnd = 1;

  const switchFadeStart = 1;
  const switchFadeEnd = 0;

  const scaleStart = 1;
  const scaleEnd = 0.5;

  const appearAnim = useRef(new Animated.Value(fadeStart)).current;
  const scaleAnim = useRef(new Animated.Value(scaleStart)).current;
  const switchFadeAnim = useRef(new Animated.Value(switchFadeStart)).current;

  const delay =
    gridSize * 2 * nodeAnim +
    playerIndicatorAnimOffset +
    turnIndicatorAnimOffset;

  const appearAnimDuration = 1000;
  const turnSwitchDuration = 200;

  useEffect(() => {
    Animated.timing(appearAnim, {
      toValue: fadeEnd,
      duration: appearAnimDuration,
      delay: delay,
      useNativeDriver: true,
    }).start((finished) => {
      if (finished) setGameStarted(true);
    });
  }, [appearAnim]);

  const changeLabel = (label: string) => {
    setLabel(label);
  };

  const turnLabel =
    whoseTurn === playerNo ? "Your turn" : `Player ${whoseTurn}'s turn`;

  useEffect(() => {
    if (gameStarted) {
      setTimeout(() => {
        if (gameOver) {
          changeLabel("GAME OVER");
        } else {
          changeLabel(turnLabel);
        }
      }, turnSwitchDuration);
    } else {
      changeLabel(turnLabel);
    }
  }, [whoseTurn, gameOver]);

  useEffect(() => {
    if (gameStarted) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(switchFadeAnim, {
            toValue: switchFadeEnd,
            duration: turnSwitchDuration,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: scaleEnd,
            duration: turnSwitchDuration,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(switchFadeAnim, {
            toValue: switchFadeStart,
            duration: turnSwitchDuration,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: scaleStart,
            duration: turnSwitchDuration,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [whoseTurn, gameOver]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: gameStarted ? switchFadeAnim : appearAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <AutoSizeText
        fontSize={36}
        numberOfLines={2}
        mode={ResizeTextMode.max_lines}
        style={styles.label}
      >
        {label}
      </AutoSizeText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    textAlign: "center",
    color: "white",
    fontFamily: "Main",
  },
});

export default TurnIndicator;
