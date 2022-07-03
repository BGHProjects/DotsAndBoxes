import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import LobbyCard from "../components/AllLobbies/LobbyCard";
import AnimatedBackground from "../components/Common/AnimatedBackground";
import BackButton from "../components/Common/BackButton";
import { IPAdd, Lobby, Screens } from "../consts/types";

const AllLobbies = () => {
  const [allLobbies, setAllLobbies] = useState([]);
  const navigation = useNavigation();

  const socketRef = useRef<
    Socket<DefaultEventsMap, DefaultEventsMap> | undefined
  >();

  useEffect(() => {
    // Need to use a proper library to get this dynamically
    socketRef.current = io(IPAdd);

    socketRef.current.on("Lobbies", (lobbies: any) => {
      setAllLobbies(lobbies);
    });

    return () => {
      socketRef?.current?.disconnect();
    };
  }, []);

  const startGame = (lobby: any) => {
    socketRef?.current?.emit("GameStarted", lobby);
    navigation.navigate(Screens.Gameplay, { lobby: lobby, playerNo: 2 });
  };

  return (
    <>
      <AnimatedBackground />
      <View style={styles.pageContainer}>
        <BackButton />
        {allLobbies.length < 1 && (
          <Text style={styles.retrievingLabel}>Retrieving lobbies...</Text>
        )}
        {allLobbies.length >= 1 && (
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            style={{
              marginTop: 100,
            }}
          >
            {allLobbies.map((lobby: Lobby, index) => {
              return (
                <TouchableOpacity onPress={() => startGame(lobby)} key={index}>
                  <LobbyCard
                    lobbyName={lobby.lobbyName}
                    gridSize={lobby.gridSelection}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
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
  retrievingLabel: {
    textAlign: "center",
    color: "white",
    fontFamily: "Main",
    fontSize: 30,
  },
  scrollViewContent: {
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
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

export default AllLobbies;
