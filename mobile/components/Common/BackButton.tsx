import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Screens } from "../../consts/types";
import Ionicons from "@expo/vector-icons/Ionicons";

interface BackButtonProps {
  mainMenu?: boolean;
}

const BackButton = ({ mainMenu }: BackButtonProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        mainMenu
          ? navigation.navigate(Screens.MainMenu as any)
          : navigation.goBack()
      }
    >
      <Ionicons name="arrow-back" size={30} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: 60,
    position: "absolute",
    borderRadius: 10,
    backgroundColor: "navy",
    alignItems: "center",
    top: 50,
    left: 30,
    borderWidth: 2,
    borderColor: "white",
  },
});

export default BackButton;
