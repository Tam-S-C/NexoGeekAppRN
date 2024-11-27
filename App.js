import { useFonts } from "expo-font";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { enableScreens } from "react-native-screens";
import { store } from "./src/app/store";
import { Provider, useDispatch } from "react-redux";
import { View, Text } from "react-native";
import { colors } from "./src/global/colors";
import { createSessionsTable, fetchSession } from './src/db';
import { setUser } from "./src/features/auth/authSlice";
import MainNavigator from "./src/navigation/MainNavigator";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message"

enableScreens();
SplashScreen.preventAutoHideAsync();

const toastConfig = {
  success: ({ text1, text2 }) => (
    <View
      style={{
        backgroundColor: colors.blanco,
        padding: 16,
        borderRadius: 16,
        marginTop: 160,
        marginHorizontal: 16,
        height: 100,
      }}
    >
      <Text style={{ color: colors.violetaPrimario, fontWeight: "bold", fontSize: 18 }}>{text1}</Text>
      <Text style={{ color: colors.violetaPrimario, fontSize: 18 }}>{text2}</Text>
    </View>
  ),
};

function AppWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeSession = async () => {
      try {
        await createSessionsTable();
        const sessions = await fetchSession();
        if (sessions.length > 0) {
          const session = sessions[0];
          dispatch(setUser({
            email: session.email,
            idToken: session.token,
            localId: session.localId,
          }));
          Toast.show({
            type: 'success',
            text1: 'Sesión Restaurada',
            text2: `Bienvenido de nuevo, ${session.email}`,
            visibilityTime: 2000,
            position: 'top',
          });
        }
      } catch (error) {
        console.error("Error al restaurar la sesión:", error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No se pudo restaurar la sesión',
          visibilityTime: 2000,
          position: 'top',
        });
      } finally {
        SplashScreen.hideAsync();
      }
    };

    initializeSession();
  }, [dispatch]);

  return <MainNavigator />;
}

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
      <AppWrapper />
      <StatusBar style="light" />
      <Toast config={toastConfig} />
    </Provider>
  );
}
