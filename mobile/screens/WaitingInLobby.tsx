import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import AnimatedBackground from "../components/Common/AnimatedBackground";
import BackButton from "../components/Common/BackButton";
import { IPAdd, Screens } from "../consts/types";

const WaitingInLobby = ({ route }: any) => {
  const navigation = useNavigation();
  const currentLobby = route.params;

  const socketRef = useRef<
    Socket<DefaultEventsMap, DefaultEventsMap> | undefined
  >();

  useEffect(() => {
    socketRef.current = io(IPAdd);

    socketRef.current.on(currentLobby, (msg: any) => {
      if (msg === "Game started!")
        navigation.navigate(Screens.Gameplay, {
          lobby: currentLobby,
          playerNo: 1,
        });
    });

    return () => {
      socketRef?.current?.disconnect();
    };
  }, []);

  return (
    <>
      <AnimatedBackground />
      <View style={styles.pageContainer}>
        <BackButton />
        <View style={{ width: "80%" }}>
          <Text style={styles.awaitLabel}>
            Awaiting another player to join your lobby...
          </Text>
        </View>
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
  button: {
    height: 100,
    width: 200,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  awaitLabel: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    fontFamily: "Main",
  },
});

export default WaitingInLobby;
