import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavsScreen from "../screens/FavsScreen";
import Header from "../components/Header";

const Stack = createNativeStackNavigator()

const FavsNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      header: ({ route }) => <Header screenName={route.name} />
    }}>
    <Stack.Screen name="Favoritos" component={FavsScreen} />

  </Stack.Navigator>
)

export default FavsNavigator;

