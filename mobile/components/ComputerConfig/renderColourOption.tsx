import React from "react";
import { StyleSheet, View } from "react-native";

const size = 80;

const renderColourOption = ({ item }: any) => {
  return (
    <View style={[styles.colourOption, { backgroundColor: item.value }]} />
  );
};

const styles = StyleSheet.create({
  colourOption: {
    height: size,
    width: size,
    alignSelf: "center",
    borderRadius: 20,
  },
});

export default renderColourOption;
