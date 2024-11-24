import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useGetProfilePictureQuery } from "../services/userService";
import { setProfilePicture, setUser } from "../features/auth/authSlice";
import { fetchSession } from "../db";
import TabNavigator from "./TabNavigator";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
    </AuthStack.Navigator>
  );
};

const MainNavigator = () => {
  const user = useSelector(state => state.authReducer.value.email);
  const localId = useSelector(state => state.authReducer.value.localId);
  const dispatch = useDispatch();

  const { data: profilePicture } = useGetProfilePictureQuery(localId);

  useEffect(() => {
    if (!user) {
      (async () => {
        try {
          const session = await fetchSession();
          if (session.length) {
            dispatch(setUser(session[0]));
          }
        } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Error al recuperar la sesión',
            visibilityTime: 2000,
            position: 'top',
          });
        }
      })();
    }
  }, [user]);

  useEffect(() => {
    if (profilePicture) {
      dispatch(setProfilePicture(profilePicture.image));
    }
  }, [profilePicture]);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <RootStack.Screen name="Main" component={TabNavigator} />
            <RootStack.Screen 
              name="InAppAuth" 
              component={AuthNavigator}
              options={{
                presentation: 'modal',
                animation: 'slide_from_bottom'
              }}
            />
          </>
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;