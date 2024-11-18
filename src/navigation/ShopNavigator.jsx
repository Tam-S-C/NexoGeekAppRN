import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CategoriesScreen, EventsScreen, OneEventScreen } from '../screens';
import Header from "../components/Header"

const Stack = createNativeStackNavigator()

const ShopNavigator = () => {
  return (

        <Stack.Navigator
            screenOptions={{
                header: ({route})=> <Header screenName={route.name} />
            }}
        >

            <Stack.Screen name="Categorías" component={CategoriesScreen}/>
            <Stack.Screen name="Eventos" component={EventsScreen}/>
            <Stack.Screen name="Evento" component={OneEventScreen}/>

        </Stack.Navigator>

  )
}

export default ShopNavigator;

