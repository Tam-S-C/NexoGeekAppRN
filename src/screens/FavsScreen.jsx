import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../global/colors';
import { clearUser } from '../features/auth/authSlice';


const FavsScreen = ({ navigation }) => {
  const { token } = useSelector((state) => state.authReducer.value);  
  const dispatch = useDispatch();

  const handleLoginRedirect = () => {
    dispatch(clearUser());
    navigation.navigate('InAppAuth', { screen: 'LoginScreen' });
  };

  
  if (!token) {
    return (
      <>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Esta sección es solo para usuarios registrados. Inicia sesión para poder usar esta sección. Gracias.</Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? colors.violetaSombra : colors.violetaPrimario },
            styles.btnContainer
          ]}
          onPress={handleLoginRedirect}
        >
          <Text style={styles.errorText}> Volver al Login </Text>
        </Pressable>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.cartScreenTitle}>Mis Eventos Favs:</Text>
    </View>
  );
};

export default FavsScreen;

const styles = StyleSheet.create({

  cartScreenTitle: {
    fontFamily: 'PressStart',
    color: colors.violetaPrimario,
    fontSize: 16,
    marginLeft: 24,
    marginTop: 12
  },
  errorContainer: {
    backgroundColor: colors.violetaPrimario,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginTop: 64,
    textAlign: 'center'
  },
  errorText: {
    fontSize: 18,
    color: colors.blanco,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  btnContainer: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 24,
    marginHorizontal: 80
  },


});
