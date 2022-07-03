import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./tools/AppNavigation";
import { SocketContextProvider } from "./tools/SocketContext";
import AppLoading from "expo-app-loading";
import { useFonts, Lexend_400Regular } from "@expo-google-fonts/dev";

export default function App() {
  const [fontsLoaded] = useFonts({
    Main: Lexend_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SocketContextProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </SocketContextProvider>
  );
}
