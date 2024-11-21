import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../global/colors';
import { useState, useEffect } from 'react';
import { useLoginMutation } from '../services/authService';
import { useDispatch } from 'react-redux';
import { setUser, clearUser, loadUserFromStorage } from '../features/auth/authSlice';
import Icon from 'react-native-vector-icons/FontAwesome5';

const textInputWidth = Dimensions.get('window').width * 0.85;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [triggerLogin, result] = useLoginMutation();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

    const onsubmit = () => {     
      triggerLogin({ email, password })
  }

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(setUser(result.data));
      if (rememberMe) {
        dispatch(clearUser());
        loadUserFromStorage({
          email: result.data.email,
          token: result.data.idToken
        });
      }
      setIsLoggedIn(true);
    }
  }, [result, rememberMe, dispatch]);
  
  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Categorías');
    }
  }, [isLoggedIn, navigation]);
  
  

  return (
    <LinearGradient
      colors={[colors.fucsiaAcento, colors.violetaPrimario]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <Text style={styles.title}>NEXO GEEK</Text>
      <Text style={styles.subTitle}>Inicia Sesión</Text>

      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setEmail}
          placeholderTextColor={colors.violetaPrimario}
          placeholder="Email"
          style={styles.textInput}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={colors.violetaPrimario}
            style={styles.textInput}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
            <Icon
              name={isPasswordVisible ? 'eye' : 'eye-slash'}
              size={24}
              color={colors.violetaPrimario}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rememberMeContainer}>
        <Text style={styles.buttonText}>Mantener sesión iniciada</Text>
        {rememberMe ? (
          <Pressable onPress={() => setRememberMe(!rememberMe)}>
            <Icon name="toggle-on" size={36} color={colors.violetaSecundario} />
          </Pressable>
        ) : (
          <Pressable onPress={() => setRememberMe(!rememberMe)}>
            <Icon name="toggle-off" size={36} color={colors.fucsiaAcento} />
          </Pressable>
        )}
      </View>

      <Pressable
        onPress={onsubmit}
        style={({ pressed }) => [
          styles.buttons,
          { backgroundColor: pressed ? colors.violetaSombra : colors.violetaPrimario }
        ]}
      >
        <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
      </Pressable>

      <View style={styles.footTextContainer}>
        <Text style={styles.askText}>¿No tienes una cuenta?</Text>
        <Pressable
          onPress={() => navigation.navigate('Signup')}
          style={({ pressed }) => [
            styles.buttons,
            { backgroundColor: pressed ? colors.violetaSombra : colors.violetaPrimario }
          ]}
        >
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </Pressable>
      </View>

      <View style={styles.footTextContainer}>
        <Text style={styles.askText}>O inicia sesión como invitado</Text>
        <Pressable
          onPress={() => dispatch(setUser({ email: "invitado@nekogeek.com", token: "invitado" }))}
          style={({ pressed }) => [
            styles.buttons,
            { backgroundColor: pressed ? colors.violetaSombra : colors.violetaPrimario }
          ]}
        >
          <Text style={styles.buttonText}>Ingresar</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.blanco,
    fontFamily: 'PressStart',
    fontSize: 32,
    marginTop: 36,
  },
  subTitle: {
    fontSize: 20,
    color: colors.blanco,
    fontWeight: '700',
    letterSpacing: 6,
  },
  inputContainer: {
    gap: 14,
    margin: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  textInput: {
    padding: 7,
    paddingLeft: 16,
    borderRadius: 16,
    backgroundColor: colors.violetaSecundario,
    width: textInputWidth,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: textInputWidth,
  },
  icon: {
    position: 'absolute',
    right: 16,
  },
  footTextContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttons: {
    padding: 10,
    paddingHorizontal: 24,
    backgroundColor: colors.violetaPrimario,
    color: colors.blanco,
    fontSize: 16,
    fontWeight: '700',
    borderRadius: 16,
    marginTop: 8,
    shadowColor: colors.violetaSecundario,
    shadowOpacity: 1,
    elevation: 4,
  },
  buttons2: {
    padding: 10,
    paddingHorizontal: 24,
    backgroundColor: colors.violetaPrimario,
    color: colors.blanco,
    fontSize: 16,
    fontWeight: '700',
    borderRadius: 16,
    shadowColor: colors.violetaSecundario,
    shadowOpacity: 1,
    elevation: 4,
    marginBottom: 4
  },
  buttonText: {
    color: colors.blanco,
    fontSize: 14,
    fontWeight: '700',
  },
  askText: {
    color: colors.blanco,
    alignItems: 'center',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '700',
  },
  error: {
    color: colors.fucsiaClaro,
    marginTop: 10,
  },
  guestOptionContainer: {
    alignItems: 'center',
    marginTop: 64
  },
  rememberMeContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 2,
  }
});
