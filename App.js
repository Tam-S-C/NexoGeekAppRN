import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import Navigator from './src/navigation/Navigator';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [loaded, error] = useFonts({
    'Roboto': require('./assets/fonts/RobotoVar.ttf'),
    'PressStart': require('./assets/fonts/PressStart.ttf'),
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
    <>
      <Navigator/>
      <StatusBar style="light" />
 
    </>
    )
};
