import { useFonts } from "expo-font";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { enableScreens } from "react-native-screens";
import { store } from "./src/app/store";
import { Provider } from "react-redux";
import MainNavigator from "./src/navigation/MainNavigator";
import * as SplashScreen from "expo-splash-screen";


enableScreens();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    Roboto: require("./assets/fonts/RobotoVar.ttf"),
    PressStart: require("./assets/fonts/PressStart.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <MainNavigator />
      <StatusBar style="light" />
    </Provider>
  );
}
