import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  operation: () => void;
  label: string;
}

const Button = ({ operation, label }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={() => operation()}>
      <View style={styles.button}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 250,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "navy",
  },
  label: {
    fontFamily: "Main",
    color: "white",
    fontSize: 20,
  },
});

export default Button;
