import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { AnimatedShapeColour } from "../../consts/types";

const AnimatedGridContent = () => {
  const isFocused = useIsFocused();
  const fadeStart = 0;
  const fadeEnd = 0.5;
  const animDuration = 1000;

  enum Shape {
    Box = "Box",
    Dot = "Dot",
  }

  const [show, setShow] = useState(false);
  const [colour, setColour] = useState("transparent");
  const [shape, setShape] = useState<Shape>(Shape.Box);
  const [delay, setDelay] = useState(0);

  const fadeAnim = useRef(new Animated.Value(fadeStart)).current;

  const determineAppearance = () => {
    const randDelay = Math.random();
    const show = Math.random();
    const whichShape = Math.random();
    const WC = Math.random();

    setDelay(animDuration + animDuration * randDelay);

    show >= 0.4 ? setShow(true) : setShow(false);
    whichShape >= 0.5 ? setShape(Shape.Box) : setShape(Shape.Dot);

    if (WC >= 0.3 && WC < 0.4) {
      setColour(AnimatedShapeColour.Orange);
    } else if (WC >= 0.4 && WC < 0.5) {
      setColour(AnimatedShapeColour.Red);
    } else if (WC >= 0.5 && WC < 0.6) {
      setColour(AnimatedShapeColour.Gold);
    } else if (WC >= 0.6 && WC < 0.7) {
      setColour(AnimatedShapeColour.Blue);
    } else if (WC >= 0.7 && WC < 0.8) {
      setColour(AnimatedShapeColour.Green);
    } else if (WC >= 0.8 && WC < 0.9) {
      setColour(AnimatedShapeColour.Aqua);
    }
  };

  const loopAnimation = Animated.sequence([
    Animated.timing(fadeAnim, {
      toValue: fadeEnd,
      duration: delay,
      useNativeDriver: true,
    }),
    Animated.timing(fadeAnim, {
      toValue: fadeStart,
      duration: delay,
      useNativeDriver: true,
    }),
  ]).start(({ finished }) => {
    if (finished) {
      determineAppearance();
    }
  });

  useEffect(() => {
    if (isFocused) {
      determineAppearance();
      Animated.loop(loopAnimation as any).start();
    }
  }, [fadeAnim, isFocused]);

  return (
    <>
      {show && (
        <Animated.View
          style={[
            styles.gridContent,
            shape === Shape.Dot ? styles.dotStyle : styles.boxStyle,
            shape === Shape.Dot && { backgroundColor: colour },
            shape === Shape.Box && { borderColor: colour },
            { opacity: fadeAnim },
          ]}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  gridContent: { height: "70%", width: "70%" },
  dotStyle: { borderRadius: 90 },
  boxStyle: {
    borderRadius: 20,
    borderWidth: 5,
    backgroundColor: "transparent",
  },
});

export default AnimatedGridContent;
