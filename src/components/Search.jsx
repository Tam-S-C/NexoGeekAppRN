import { StyleSheet, TextInput, View } from 'react-native'
import { colors } from '../global/colors'

const Search = ({ style, setSearch }) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder= "Busca tu evento o local"
        onChangeText={(text) => setSearch(text)} style={styles.searchInput}
      />
    </View>
  )
}


export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    borderRadius: 16,
    paddingLeft: 16,
    borderWidth: 2,
    borderColor: colors.violetaPrimario,
    width: '92%',
    marginLeft: 16,
  },
});
