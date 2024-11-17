import { createNativeStackNavigator } from "@react-navigation/native-stack"
import OrdersScreen from "../screens/OrdersScreen"
import Header from "../components/Header"

const OrdersStack = createNativeStackNavigator()

const OrdersNavigator = () => {
  return (
    <OrdersStack.Navigator
      screenOptions={{
        header: ({ route }) => <Header screenName={route.name} />
      }}
    >

      <OrdersStack.Screen component={OrdersScreen} name="Mis Compras" />

    </OrdersStack.Navigator>
  )
}

export default OrdersNavigator

