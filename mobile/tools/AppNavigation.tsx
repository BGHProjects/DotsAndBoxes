import { createStackNavigator } from "@react-navigation/stack";
import { Screens } from "../consts/types";
import AllLobbies from "../screens/AllLobbies";
import ComputerConfig from "../screens/ComputerConfig";
import CreateLobby from "../screens/CreateLobby";
import Gameplay from "../screens/Gameplay";
import MainMenu from "../screens/MainMenu";
import VersusComputer from "../screens/VersusComputer";
import WaitingInLobby from "../screens/WaitingInLobby";

const Stack = createStackNavigator();

function AppNavigation() {
  return (
    // @ts-ignore
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.MainMenu} component={MainMenu} />
      <Stack.Screen name={Screens.Gameplay} component={Gameplay} />
      <Stack.Screen name={Screens.CreateLobby} component={CreateLobby} />
      <Stack.Screen name={Screens.AllLobbies} component={AllLobbies} />
      <Stack.Screen name={Screens.WaitingInLobby} component={WaitingInLobby} />
      <Stack.Screen name={Screens.VersusComputer} component={VersusComputer} />
      <Stack.Screen name={Screens.ComputerConfig} component={ComputerConfig} />
    </Stack.Navigator>
  );
}

export default AppNavigation;
