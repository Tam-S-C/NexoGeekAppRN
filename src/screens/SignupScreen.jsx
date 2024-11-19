import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../global/colors';
import { useState, useEffect } from 'react';
import { useSignupMutation } from '../services/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import Icon from 'react-native-vector-icons/FontAwesome5';

const textInputWidth = Dimensions.get('window').width * 0.85;

const SignupScreen = ({ navigation }) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [errorEmail, setErrorEmail] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("")
  //const [genericValidationError, setGenericValidationError] = useState("")
  const [errorAddUser,setErrorAddUser] = useState(false)

  const [triggerSignup, result] = useSignupMutation()

  const dispatch = useDispatch()

  
  useEffect(() => {
    if (result.status === 'rejected') {
        setErrorAddUser('Ups! No se pudo agregar el usuario.');
    } else if (result.status === 'fulfilled') {
        console.log('Usuario agregado con éxito', result.data);
        const { idToken, email } = result.data;
        dispatch(
            setUser({
                email,
                token: idToken,
            })
        );
    }
  }, [result, dispatch]);
  


  const onsubmit = () => {
    /*try {
        validationSchema.validateSync({ email, password, confirmPassword });
        setErrorEmail("");
        setErrorPassword("");
        setErrorConfirmPassword("");
        console.log("Validación exitosa, enviando datos...");
        triggerSignup({ email, password });
    } catch (error) {
        console.log("Error de validación:", error);
        switch (error.path) {
            case "email":
                setErrorEmail(error.message);
                break;
            case "password":
                setErrorPassword(error.message);
                break;
            case "confirmPassword":
                setErrorConfirmPassword(error.message);
                break;
            default:
                console.log('Error desconocido:', error.message);
                break;
        }
    }*/
        triggerSignup({ email, password });
    };
  

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
          onChangeText={setEmail}
          placeholderTextColor={colors.violetaPrimario}
          placeholder="Email"
          style={styles.textInput}
        />
        {(errorEmail && !errorPassword) && <Text style={styles.error}>{errorEmail}</Text>}

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
        {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}

        <View style={styles.passwordContainer}>
          <TextInput
            onChangeText={setConfirmPassword}
            placeholder="Repetir Password"
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
        {errorConfirmPassword && <Text style={styles.error}>{errorConfirmPassword}</Text>}

      </View>

      <Pressable
        onPress={onsubmit}
        style={({ pressed }) => [
          styles.buttons,
          { backgroundColor: pressed ? colors.violetaSombra : colors.violetaPrimario }
        ]}
      >
        <Text style={styles.buttonText}>CREAR E INICIAR</Text>
      </Pressable>
      {errorAddUser && <Text style={styles.error}>{errorMessage}</Text>}

      <View style={styles.footTextContainer}>
        <Text style={styles.askText}>¿Ya tienes una cuenta?</Text>
        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={({ pressed }) => [
            styles.buttons,
            { backgroundColor: pressed ? colors.violetaSombra : colors.violetaPrimario }
          ]}
        >
          <Text style={styles.buttonText}>Inicia sesión</Text>
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
    color: colors.blanco,
    fontSize: 16,
    fontWeight: '700',
    borderRadius: 16,
    marginTop: 8,
    shadowColor: colors.violetaSecundario,
    shadowOpacity: 1,
    elevation: 4,
  },
  buttonText: {
    color: colors.blanco,
    fontSize: 14,
    fontWeight: '700',
  },
  askText: {
    color: colors.blanco,
    alignItems: 'center',
    marginTop: 12,
    fontSize: 14,
    fontWeight: '700',
  },
  error: {
    color: colors.fucsiaClaro,
    marginTop: 10,
  },
});



