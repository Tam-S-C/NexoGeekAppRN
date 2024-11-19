import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../global/colors';
import { useState, useEffect } from 'react';
import { useSignupMutation } from '../services/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

const textInputWidth = Dimensions.get('window').width * 0.85;

const SignupScreen = ({ navigation }) => {
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorAddUser, setErrorAddUser] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [triggerSignup, result] = useSignupMutation();
  const dispatch = useDispatch();

//NickName en local
  const saveNickNameLocally = async (nickName) => {
    try {
      await AsyncStorage.setItem('nickName', nickName);
    } catch (error) {
      console.error("Error guardando el nickName en AsyncStorage:", error);
    }
  };

  const onsubmit = async () => {
    if (password !== confirmPassword) {
      setErrorAddUser('Las contraseñas no coinciden.');
      return;
    }

    await triggerSignup({ email, password });
    await saveNickNameLocally(nickName);
  };

  useEffect(() => {
    if (result.status === 'rejected') {
      console.log('Error al agregar el usuario:', result.error);
      setErrorAddUser('Ups! No se pudo agregar el usuario.');
    } else if (result.status === 'fulfilled') {
      console.log('Usuario agregado con éxito');

      const { idToken, email } = result.data;

      const fetchNickName = async () => {
        try {
          const savedNickName = await AsyncStorage.getItem('nickName');
          dispatch(
            setUser({
              nickName: savedNickName,
              email,
              token: idToken,
            })
          );
          navigation.navigate('Categories');
        } catch (error) {
          console.error('Error leyendo el nickName desde AsyncStorage:', error);
        }
      };
      fetchNickName();
    }
  }, [result, dispatch, navigation]);

  return (
    <LinearGradient
      colors={[colors.fucsiaAcento, colors.violetaPrimario]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <Text style={styles.title}>NEXO GEEK</Text>
      <Text style={styles.subTitle}>Registrate</Text>

      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setNickName}
          placeholderTextColor={colors.violetaPrimario}
          placeholder="NickName"
          style={styles.textInput}
        />
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

        <View style={styles.passwordContainer}>
          <TextInput
            onChangeText={setConfirmPassword}
            placeholder="Repetir password"
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

      {errorAddUser ? <Text style={styles.error}>{errorAddUser}</Text> : null}

      <View style={styles.footTextContainer}>
        <Text style={styles.askText}>Completa tus datos y...</Text>
        <Pressable style={styles.buttons} onPress={onsubmit}>
          <Text style={styles.buttonText}>Crear e Iniciar!</Text>
        </Pressable>
      </View>

      <View style={styles.footTextContainer}>
        <Text style={styles.askText}>¿Ya tienes una cuenta?</Text>
        <Pressable style={styles.buttons} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Inicia Sesión!</Text>
        </Pressable>
      </View>

      <View style={styles.footTextContainer}>
        <Text style={styles.askText}>O ingresa como invitado</Text>
        <Pressable onPress={() => dispatch(setUser({ email: 'invitado@nexogeek.com', token: 'demo' }))}>
          <Text style={{ ...styles.buttons, ...styles.buttonText }}>Ingresar Ahora</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default SignupScreen;

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
    marginTop: 16,
  },
  buttons: {
    padding: 10,
    paddingHorizontal: 24,
    backgroundColor: colors.violetaPrimario,
    borderRadius: 16,
    marginTop: 10,
    shadowColor: colors.violetaSecundario,
    shadowOpacity: 1,
    elevation: 4,
  },
  buttonText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: '700',
  },
  askText: {
    color: colors.blanco,
    alignItems: 'center',
    marginTop: 12,
  },
  error: {
    color: colors.fucsiaClaro,
    marginTop: 10,
  },
});

