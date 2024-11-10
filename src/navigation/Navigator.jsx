import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CategoriesScreen from "../screens/CategoriesScreen";
import EventsScreen from "../screens/EventsScreen";
import OneEventScreen from "../screens/OneEventScreen";
import Header from "../components/Header"

const Stack = createNativeStackNavigator()


const Navigator = () => {
  return (
    <NavigationContainer>

        <Stack.Navigator
            screenOptions={{
                header: ({route})=> <Header screenName={route.name} />
            }}
        
        >

            <Stack.Screen name="Categorías" component={CategoriesScreen}/>
            <Stack.Screen name="Eventos & Locales" component={EventsScreen}/>
            <Stack.Screen name="Detalle del Evento" component={OneEventScreen}/>

        </Stack.Navigator>

    </NavigationContainer>
  )
}

export default Navigator;

