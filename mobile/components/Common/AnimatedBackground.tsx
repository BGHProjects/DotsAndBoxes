import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import { purpleBackground } from "../../consts/colours";
import { range } from "lodash";
import { useIsFocused } from "@react-navigation/native";
import AnimatedGridContent from "./AnimatedGridContent";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const AnimatedBackground = () => {
  const cols = range(4);
  const rows = range(Math.ceil(screenHeight / (screenWidth / 4)));
  const isFocused = useIsFocused();

  const fadeStart = 0;
  const fadeEnd = 0.3;
  const animDuration = 1000;

  const fadeAnim = useRef(new Animated.Value(fadeStart)).current;

  useEffect(() => {
    if (isFocused) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: fadeEnd,
            duration: animDuration,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: fadeStart,
            duration: animDuration,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [fadeAnim, isFocused]);

  return (
    <View style={styles.backgroundContainer}>
      {rows.map((row) => {
        return (
          <View key={row} style={{ flexDirection: "row" }}>
            {cols.map((col) => {
              const RN = Math.random();

              return (
                <View
                  key={col.toString() + row.toString()}
                  style={styles.gridCell}
                >
                  <AnimatedGridContent />
                  {/* {RN >= 0.4 && RN < 0.5 && (
                    <Animated.View
                      style={[
                        styles.gridContent,
                        { opacity: fadeAnim },
                        styles.dotStyle,
                        { backgroundColor: "limegreen" },
                      ]}
                    />
                  )}
                  {RN > 0.5 && RN < 0.6 && (
                    <Animated.View
                      style={[
                        styles.gridContent,
                        { opacity: fadeAnim },
                        styles.boxStyle,
                        { borderColor: "dodgerblue" },
                      ]}
                    />
                  )}
                  {RN >= 0.6 && RN < 0.7 && (
                    <Animated.View
                      style={[
                        styles.gridContent,
                        { opacity: fadeAnim },
                        styles.dotStyle,
                        { backgroundColor: "orange" },
                      ]}
                    />
                  )}
                  {RN > 0.7 && RN < 0.8 && (
                    <Animated.View
                      style={[
                        styles.gridContent,
                        { opacity: fadeAnim },
                        styles.boxStyle,
                        { borderColor: "red" },
                      ]}
                    />
                  )}
                  {RN > 0.8 && RN < 0.9 && (
                    <Animated.View
                      style={[
                        styles.gridContent,
                        { opacity: fadeAnim },
                        styles.boxStyle,
                        { borderColor: "gold" },
                      ]}
                    />
                  )} */}
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: purpleBackground,
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  gridCell: {
    width: screenWidth / 4,
    height: screenWidth / 4,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  gridContent: { height: "70%", width: "70%" },
  dotStyle: { borderRadius: 90 },
  boxStyle: {
    borderRadius: 20,
    borderWidth: 5,
    backgroundColor: "transparent",
  },
});

export default AnimatedBackground;
