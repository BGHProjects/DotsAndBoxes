import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface LobbyCardProps {
  lobbyName: string;
  gridSize: number;
}

const LobbyCard = ({ lobbyName, gridSize }: LobbyCardProps) => {
  return (
    <View style={styles.lobbyCard}>
      <View style={styles.lobbyCardHalf}>
        <Text style={styles.lobbyCardText}>{lobbyName}</Text>
      </View>
      <View style={styles.lobbyCardHalf}>
        <Text style={styles.lobbyCardText}>
          {gridSize} x {gridSize}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lobbyCard: {
    height: 80,
    width: 250,
    borderRadius: 10,
    backgroundColor: "navy",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  lobbyCardHalf: {
    height: "50%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  lobbyCardText: {
    fontFamily: "Main",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});

export default LobbyCard;
