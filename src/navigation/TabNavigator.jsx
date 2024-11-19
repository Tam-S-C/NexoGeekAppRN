import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { colors } from '../global/colors';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ShopNavigator from "./ShopNavigator"
import CartNavigator from "./CartNavigator"
import OrdersNavigator from './OrdersNavigator';
import FavsNavigator from './FavsNavigator';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator()

const TabNavigator = () => {

    const cartLength = useSelector(state => state.cartReducer.value.cartLength);

    return (

        <Tab.Navigator
            initialRouteName="Home"
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
                    tabBarIcon: ({ focused }) => (<Icon name="shopping-cart" marginBottom={16} size={24} color={focused ? colors.blanco : colors.violetaSecundario} />),
                    tabBarBadge: cartLength > 0 ? cartLength : null,
                    tabBarBadgeStyle: {
                        backgroundColor: colors.fucsiaAcento,
                        color: colors.blanco,
                        fontSize: 12,
                        fontWeight: 'bold',
                        paddingBottom: 2,
                        borderRadius: 10,
                        marginTop: -8
                    },
                }}
            />

            <Tab.Screen
                name="Orders"
                component={OrdersNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (<Icon name="receipt" marginBottom={16} size={24} color={focused ? colors.blanco : colors.violetaSecundario} />)
                }}
            />

            <Tab.Screen
                name="Favs"
                component={FavsNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (<Icon name="heart" solid marginBottom={16} size={24} color={focused ? colors.blanco : colors.violetaSecundario} />)
                }}
            />


            <Tab.Screen
                name="Profile"
                component={ProfileNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (<Icon name="user-astronaut" marginBottom={16} size={24} color={focused ? colors.blanco : colors.violetaSecundario} />)
                }}
            />

        </Tab.Navigator>

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
