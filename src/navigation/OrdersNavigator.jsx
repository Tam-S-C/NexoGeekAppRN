import { createNativeStackNavigator } from "@react-navigation/native-stack"
import OrdersScreen from "../screens/OrdersScreen"
import Header from "../components/Header"

const Stack = createNativeStackNavigator()

const OrdersNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ route }) => <Header screenName={route.name} />
      }}
    >
      <Stack.Screen component={OrdersScreen} name="Mis Compras" />

    </Stack.Navigator>
  )
}

export default OrdersNavigator

