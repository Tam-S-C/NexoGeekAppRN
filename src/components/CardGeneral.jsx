import { StyleSheet, View } from 'react-native'
import { colors } from '../global/colors.js'

const CardGeneral = ({ children, style }) => {
  return (
    <View style={{ ...styles.cardContainer, ...style }}>
      {children}
    </View>
  )
}

export default CardGeneral;

const styles = StyleSheet.create({

  cardContainer: {
    backgroundColor: colors.blanco,
    shadowColor: colors.violetaSombra,
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: { width: 8, height: 4 },
    elevation: 8,
    borderRadius: 16
  }

})