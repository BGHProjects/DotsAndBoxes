import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import BackButton from "../components/Common/BackButton";
import Button from "../components/Common/Button";
import renderGridOption from "../components/CreateLobby/renderGridOption";
import { purpleBackground } from "../consts/colours";
import { Screens } from "../consts/types";
import { gridOptions, colourOptions } from "../consts/variables";
import { sample } from "lodash";
import renderColourOption from "../components/ComputerConfig/renderColourOption";

const { width: screenWidth } = Dimensions.get("window");

const ComputerConfig = () => {
  const navigation = useNavigation();

  // Start at the initial value, because that is where the carousel starts
  const [gridSelection, setGridSelection] = useState(gridOptions[0].value);
  const [colourSelection, setColourSelection] = useState(
    colourOptions[0].value
  );

  const carouselRef = useRef<any>();

  const createGame = () => {
    const otherColours: string[] = [];

    Object.values(colourOptions).map((option) => {
      if (option.value !== colourSelection) otherColours.push(option.value);
    });

    const AIColour = sample(otherColours);

    navigation.navigate(Screens.VersusComputer as any, {
      gridSelection: gridSelection,
      playerColour: colourSelection,
      AIColour: AIColour,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.pageContainer}>
      <BackButton />
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
      <Text style={styles.settingLabel}>Colour</Text>
      <View style={[styles.carouselContainer, { marginBottom: 40 }]}>
        <Carousel
          ref={carouselRef}
          data={colourOptions}
          sliderWidth={screenWidth}
          itemWidth={120}
          renderItem={renderColourOption}
          onSnapToItem={(index) =>
            setColourSelection(colourOptions[index].value)
          }
          slideStyle={styles.carouselItem}
        />
      </View>

      <Button label={"Start Game"} operation={() => createGame()} />
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
    marginVertical: 20,
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
    fontSize: 20,
    color: "white",
  },
  lobbyNameErrorLabel: {
    marginTop: 10,
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  inputContainer: { marginVertical: 30, width: "60%" },
});

export default ComputerConfig;
