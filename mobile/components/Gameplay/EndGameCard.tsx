import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Vibration,
} from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import Ionicons from "@expo/vector-icons/Ionicons";

interface EndGameCardProps {
  winner: number;
  close: () => void;
}

const EndGameCard = ({ winner, close }: EndGameCardProps) => {
  const fadeStart = 0;
  const fadeEnd = 1;
  const scaleStart = 0;
  const scaleEnd = 1;
  const animDuration = 300;

  const fadeAnim = useRef(new Animated.Value(fadeStart)).current;
  const scaleAnim = useRef(new Animated.Value(scaleStart)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: fadeEnd,
        duration: animDuration,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: scaleEnd,
        duration: animDuration,
        useNativeDriver: true,
      }),
    ]).start((finished) => {
      if (finished) {
        Vibration.vibrate(200);
      }
    });
  }, []);

  return (
    <View style={styles.background}>
      <Animated.View
        style={[
          styles.cardContainer,
          ,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <AutoSizeText
          fontSize={20}
          numberOfLines={2}
          mode={ResizeTextMode.max_lines}
          style={styles.winnerLabel}
        >
          {winner === -1 ? "Tie" : "Player " + winner + " wins"}
        </AutoSizeText>
        <TouchableOpacity style={styles.closeButton} onPress={close}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  cardContainer: {
    width: "60%",
    height: 150,
    borderRadius: 10,
    backgroundColor: "navy",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderWidth: 2,
    borderColor: "white",
  },
  winnerLabel: {
    color: "white",
    textAlign: "center",
    fontFamily: "Main",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    height: 30,
    width: 30,
    borderRadius: 90,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  closeCross: {
    color: "white",
    textAlign: "center",
  },
});

export default EndGameCard;
