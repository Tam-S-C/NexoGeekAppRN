import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopNavigator from "./ShopNavigator"
import CartNavigator from "./CartNavigator"
import OrdersNavigator from './OrdersNavigator';
import { StyleSheet } from 'react-native';
import { colors } from '../global/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';


const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabBar,
                    tabBarShowLabel: false
                }}
            >

                <Tab.Screen
                    name="Home"
                    component={ShopNavigator}
                    options={{
                        tabBarIcon: ({ focused }) => (<Icon name="store" marginBottom={16} size={24} color={focused ? colors.blanco : colors.violetaSecundario} />)
                    }}
                />

                <Tab.Screen
                    name="Cart"
                    component={CartNavigator}
                    options={{
                        tabBarIcon: ({ focused }) => (<Icon name="shopping-cart" marginBottom={16} size={24} color={focused ? colors.blanco : colors.violetaSecundario} />)
                    }}
                />

                <Tab.Screen
                    name="Orders"

                    component={OrdersNavigator}
                    options={{
                        tabBarIcon: ({ focused }) => (<Icon name="receipt" marginBottom={16} size={24} color={focused ? colors.blanco : colors.violetaSecundario} />)
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBar: {
        height: 64,
        padding: 16,
        shadowColor: colors.violetaSombra,
        elevation: 8,
        backgroundColor: colors.violetaPrimario,
    },
});
