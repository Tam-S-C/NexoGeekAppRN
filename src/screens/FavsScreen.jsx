import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../global/colors';

const FavsScreen = () => {
    const token = useSelector((state) => state.authReducer.value.token);
  
    if (!token) {
      return (
        <>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Esta sección es solo para usuarios registrados. Reinicia la app para registrarte y poder usar esta sección. Gracias.</Text>
          </View>
  
        </>
      );
    }
  
    return (
      <View style={styles.container}>
        <Text>Favs</Text>
      </View>
    );
  };
  
  export default FavsScreen;

const styles = StyleSheet.create({
    errorContainer: {
        backgroundColor: colors.violetaPrimario,
        borderRadius: 16,
        padding: 24,
        marginHorizontal: 16,
        marginVertical: 64,
        textAlign: 'center'
    },
    errorText: {
        fontSize: 18,
        color: colors.blanco,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 16,
    },
   
     
});
