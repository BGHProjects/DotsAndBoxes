import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AnimatedBackground from "../components/Common/AnimatedBackground";
import Button from "../components/MainMenu/Button";
import { Screens } from "../consts/types";

const MainMenu = () => {
  return (
    <>
      <AnimatedBackground />
      <View style={styles.backgroundContainer}>
        <Text style={styles.titleLabel}>Dots and Boxes</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Button
            destination={Screens.CreateLobby}
            label="Create a Lobby"
            bgColour="dodgerblue"
          />
          <Button
            destination={Screens.AllLobbies}
            label="All Lobbies"
            bgColour="red"
          />
          <Button
            destination={Screens.ComputerConfig}
            label="Play Computer"
            bgColour="limegreen"
          />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  titleLabel: {
    fontSize: 40,
    marginTop: 160,
    marginBottom: 30,
    color: "white",
    fontFamily: "Main",
  },
});

export default MainMenu;
