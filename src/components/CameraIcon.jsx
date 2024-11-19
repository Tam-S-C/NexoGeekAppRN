import { StyleSheet, View } from 'react-native'
import { colors } from '../global/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CameraIcon = () => {
  return (
    <View style={styles.iconContainer}>
      <Icon name="camera-retro" size={28} color="#fff" />
    </View>
  )
}

export default CameraIcon

const styles = StyleSheet.create({
    iconContainer:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.violetaPrimario,
        width: 48,
        height: 48,
        borderRadius:32,
        shadowColor: colors.violetaPrimario,
        elevation: 4
    }
})