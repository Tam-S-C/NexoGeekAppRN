import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { colors } from '../global/colors.js'
import { useSelector, useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { clearUser } from '../features/auth/authSlice'
import { clearSessions } from '../db/index.js'
import Toast from 'react-native-toast-message'
import Icon from 'react-native-vector-icons/Ionicons'


const Header = ({ screenName }) => {

  const user = useSelector(state=>state.authReducer.value.email)
  const dispatch = useDispatch()

  const onLogout = ()=>{
    dispatch(clearUser())
    clearSessions()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Sesión finalizada',
          text2: 'Has cerrado sesión correctamente',
          visibilityTime: 1500,
          position: 'top',
        });
      });
  };


  return (

    <LinearGradient
            colors={[colors.violetaSecundario, colors.fucsiaClaro]}
            start={{ x: 0, y: 1 }} 
            end={{ x: 0, y: 0 }}  
            style={styles.gradient}
        >
    <View style={styles.headerContainer}>

      <Image source={require('../../assets/icon.png')} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>NEXO</Text>
      <Text style={styles.title2}>GEEK</Text>
      <Text style={styles.screenNameStyle}>{screenName}</Text>
      {
        user &&  <Pressable onPress={onLogout} style={styles.access}><Icon name="log-out-outline" size={32} color={colors.fucsiaAcento} /></Pressable>
      }

    </View>
    </LinearGradient>

  )
}

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 104,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 36,
    flexDirection: 'row'
  },
  title: {
    fontFamily: 'PressStart',
    fontSize: 24,
    color: colors.violetaPrimario,
    paddingTop: 24,
    marginRight: 4
  },
  title2: {
    fontFamily: 'PressStart',
    fontSize: 24,
    color: colors.fucsiaAcento,
    paddingTop: 24,
  },
  image: {
    width: 36,
    height: 36,
    marginRight: 4
  },
  screenNameStyle: {
    paddingTop: 8,
    color: colors.violetaPrimario
  },
  access:{
    alignSelf: "flex-end",
    marginBottom: 12,
    marginLeft:4
  } 
})
