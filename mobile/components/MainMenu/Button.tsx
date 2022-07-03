import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../../consts/types";

interface ButtonProps {
  destination: Screens;
  label: string;
  bgColour: string;
}

const Button = ({ destination, label, bgColour }: ButtonProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(destination as any)}>
      <View style={[styles.button, { backgroundColor: bgColour }]}>
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
  },
  label: {
    fontFamily: "Main",
    color: "white",
    fontSize: 20,
  },
});

export default Button;
