import { StyleSheet } from "react-native";
import { purpleBackground } from "../colours";

const styles = (
  row: number,
  col: number,
  cellLengthNumber: number,
  cellLengthPercent: string,
  nodeSize: number,
  gridContainerSize: number
) =>
  StyleSheet.create({
    pageContainer: {
      flex: 1,
      backgroundColor: purpleBackground,
      alignItems: "center",
    },
    rowContainer: {
      width: "100%",
      height: cellLengthPercent,
      position: "relative",
      flexDirection: "row",
    },
    gridContainer: {
      height: gridContainerSize,
      width: gridContainerSize,
      position: "relative",
      marginTop: 50,
    },
    playerRowContainer: {
      marginTop: 40,
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "90%",
    },
    gridNode: {
      position: "absolute",
      backgroundColor: "white",
      borderRadius: 90,
      height: nodeSize,
      width: nodeSize,
      top: -nodeSize / 2 + cellLengthNumber * col,
      left: -nodeSize / 2 + cellLengthNumber * row,
    },
  });

export default styles;
