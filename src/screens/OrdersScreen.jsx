import { StyleSheet, Text, View, FlatList } from 'react-native'
import orders from '../data/orders.json'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../global/colors'
import CardGeneral from '../components/CardGeneral'



const OrdersScreen = () => {

  const renderOrderItem = ({item})=> {
    
    let total = item.items.reduce((acu, currentItem) => {
      const discountedPrice = currentItem.price - (currentItem.price * (currentItem.discount / 100));
      return acu + discountedPrice * currentItem.quantity;
    }, 0);
    
    dateOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };

    return (
      <CardGeneral style={styles.orderContainer}>
          <Text style={styles.title}>Recibo nº:</Text>
          <Text style={styles.date}>Creado el {new Date(item.createdAt).toLocaleString('es-Ar', dateOptions)} hs.</Text>
          <Text style={styles.total}>Total: ${total} </Text>
          <Icon name="search-plus" size={24} color={colors.violetaSecundario} style={styles.viewIcon} />
      </CardGeneral>
    )
  }


  return (
    <FlatList 
      data={orders}
      keyExtractor={item => item.id}
      renderItem={renderOrderItem}
    
    />
  )
}

export default OrdersScreen

const styles = StyleSheet.create({

  orderContainer:{
    margin: 16,
    paddingHorizontal: 16,
    paddingTop:16
  },
  title:{
    color: colors.violetaPrimario,
    fontSize: 16,
    fontWeight: '800'
  },
  date:{
    color: colors.violetaPrimario,
    fontSize: 14,
    marginTop: 8
  },
  total:{
    color: colors.violetaPrimario,
    fontSize: 12,
    marginTop: 16,
    fontFamily: 'PressStart'
  },
  viewIcon:{
   alignSelf: 'flex-end',
   marginBottom: 12
  }
})