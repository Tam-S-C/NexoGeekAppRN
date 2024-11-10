import { StyleSheet, Text, View, Image } from 'react-native'
import { colors } from '../global/colors.js'

const Header = ({screenName}) => {
  return (

    <View style={styles.headerContainer}>

      <Image source={require('../../assets/icon.png')} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>NEXO</Text>
      <Text style={styles.title2}>GEEK</Text>
      <Text style={styles.screenNameStyle}>{screenName}</Text>

    </View>

  )
}

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 112,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.violetaSecundario,
    paddingTop: 24,
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
    marginRight: 16
  }
})
