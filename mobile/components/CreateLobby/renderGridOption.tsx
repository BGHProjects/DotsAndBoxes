import React from "react";
import { StyleSheet, View } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

const size = 100;

const renderGridOption = ({ item }: any) => {
  return (
    <View style={styles.optionContainer}>
      <AutoSizeText
        fontSize={30}
        numberOfLines={1}
        mode={ResizeTextMode.max_lines}
        style={styles.optionLabel}
      >
        {item.title}
      </AutoSizeText>
    </View>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: size,
    width: size,
  },
  optionLabel: { color: "white", fontFamily: "Main" },
});

export default renderGridOption;
