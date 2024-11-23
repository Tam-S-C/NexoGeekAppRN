import { useFonts } from "expo-font";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { enableScreens } from "react-native-screens";
import { store } from "./src/app/store";
import { Provider } from "react-redux";
import { View, Text } from "react-native";
import { colors } from "./src/global/colors";
import MainNavigator from "./src/navigation/MainNavigator";
import * as SplashScreen from "expo-splash-screen";
import Toast from 'react-native-toast-message';


enableScreens();
SplashScreen.preventAutoHideAsync();

const toastConfig = {
  success: ({ text1, text2 }) => (
    <View style={{ backgroundColor: colors.blanco, padding: 16, borderRadius: 16, marginTop: 160, marginHorizontal: 16, height: 100 }}>
      <Text style={{ color: colors.violetaPrimario, fontWeight: 'bold', fontSize: 18 }}>{text1}</Text>
      <Text style={{ color: colors.violetaPrimario, fontSize: 18 }}>{text2}</Text>
    </View>
  ),
};

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
      <Toast config={toastConfig} />
    </Provider>
  );
}
