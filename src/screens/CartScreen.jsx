import { StyleSheet, Text, FlatList } from 'react-native'
import cart from '../data/cart.json'


const CartScreen = () => {

  const renderCartItem = ({item})=>(
    <Text>{item.title}</Text>
  )

  return (
    <FlatList
      data={cart}
      keyExtractor={item=>item.id}
      renderItem={renderCartItem}
      ListHeaderComponent={<Text style={styles.cartScreenTitle}>Mi carrito:</Text>}
    />
  )
}

export default CartScreen

const styles = StyleSheet.create({

  cartScreenTitle:{

  }
})

