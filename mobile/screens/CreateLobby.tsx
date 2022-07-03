import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import BackButton from "../components/Common/BackButton";
import Button from "../components/Common/Button";
import renderGridOption from "../components/CreateLobby/renderGridOption";
import { purpleBackground } from "../consts/colours";
import { IPAdd } from "../consts/types";
import { gridOptions } from "../consts/variables";
import createLobby from "../helpers/CreateLobby/createLobby";

const { width: screenWidth } = Dimensions.get("window");

const CreateLobby = () => {
  const navigation = useNavigation();

  // Start at the initial value, because that is where the carousel starts
  const [gridSelection, setGridSelection] = useState(gridOptions[0].value);
  const [lobbyName, setLobbyName] = useState("");
  const [lobbyNameError, setLobbyNameError] = useState(false);

  const socketRef = useRef<
    Socket<DefaultEventsMap, DefaultEventsMap> | undefined
  >();

  const carouselRef = useRef<any>();

  useEffect(() => {
    // Need to use a proper library to get this dynamically
    socketRef.current = io(IPAdd);

    return () => {
      socketRef?.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (lobbyName.length > 0) setLobbyNameError(false);
  }, [lobbyName]);

  const checkLobbyDetails = () => {
    if (lobbyName.length < 1) {
      setLobbyNameError(true);
    } else {
      createLobby(socketRef, navigation, { gridSelection, lobbyName });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.pageContainer}>
      <BackButton />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.lobbyNameInput}
          placeholder="Enter lobby name"
          placeholderTextColor={"#FFFFFF80"}
          textAlign="center"
          onChangeText={(value) => setLobbyName(value)}
          maxLength={16}
        />
        {lobbyNameError && (
          <Text style={styles.lobbyNameErrorLabel}>
            Please enter a lobby name
          </Text>
        )}
      </View>

      <Text style={styles.settingLabel}>Grid Size</Text>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          data={gridOptions}
          sliderWidth={screenWidth}
          itemWidth={100}
          renderItem={renderGridOption}
          onSnapToItem={(index) => setGridSelection(gridOptions[index].value)}
          slideStyle={styles.carouselItem}
        />
      </View>

      <Button label={"Create a Lobby"} operation={() => checkLobbyDetails()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: purpleBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 50,
    width: 150,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  carouselContainer: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
    height: 100,
  },
  carouselItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  settingLabel: {
    color: "white",
    fontSize: 30,

    textAlign: "center",
    fontFamily: "Main",
  },
  lobbyNameInput: {
    borderBottomColor: "white",
    borderBottomWidth: 3,
    width: "100%",
    height: 50,
    fontSize: 30,
    color: "white",
    fontFamily: "Main",
  },
  lobbyNameErrorLabel: {
    marginTop: 10,
    color: "red",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Main",
  },
  inputContainer: { marginVertical: 30, width: "80%", marginBottom: 70 },
});

export default CreateLobby;
