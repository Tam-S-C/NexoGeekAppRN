import { StyleSheet, Text, View, Image } from 'react-native'
import { colors } from '../global/colors.js'
import { LinearGradient } from 'expo-linear-gradient'

const Header = ({ screenName }) => {
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
    fontSize: 28,
    color: colors.violetaPrimario,
    paddingTop: 24,
    marginRight: 8
  },
  title2: {
    fontFamily: 'PressStart',
    fontSize: 28,
    color: colors.fucsiaAcento,
    paddingTop: 24,
  },
  image: {
    width: 44,
    height: 44,
    marginRight: 8
  },
  screenNameStyle: {
    paddingTop: 8,
    color: colors.violetaPrimario
  }
})
