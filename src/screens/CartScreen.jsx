import { StyleSheet, Text, FlatList, View, Image, Pressable } from 'react-native'
import cart from '../data/cart.json'
import { colors } from '../global/colors'
import CardGeneral from '../components/CardGeneral'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useState, useEffect } from 'react'

const CartScreen = () => {
  
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const newTotal = cart.reduce((acu, item) => {
      const discountedPrice = item.price - (item.price * (item.discount / 100));
      return acu + discountedPrice * item.quantity;
    }, 0);
    setTotal(newTotal.toFixed(2));
  }, [cart]);

  const FooterComponent = () => (
      <View style={styles.footerContainer}>
        <Text style={styles.footerTotal}>Total: ${total} </Text>
        <Pressable style={styles.confirmButton} >
          <Text style={styles.confirmButtomText}>CONFIRMAR COMPRA</Text>
        </Pressable>
      </View>
  )


  const renderCartItem = ({ item }) => {
    
    const discountedPrice = item.price - (item.price * (item.discount / 100));

    return (
      <CardGeneral style={styles.eventContainer}>
        <View>
          <Image
            source={{ uri: item.mainImage }}
            style={styles.eventImage}
            resizeMode='contain'
          />

        <Icon name="trash" size={24} color={colors.fucsiaAcento} style={styles.trashStyle} />

        </View>

        <View style={styles.eventDescription}>
          <Text style={styles.titleStyle}>{item.title}</Text>
          <Text>{item.dateAndPlace}</Text>

          <FlatList
            style={styles.tagsStyleDirection}
            data={item.tags}
            keyExtractor={() => Math.random().toString()}
            renderItem={({ item }) => <Text style={styles.tagsStyle}>{item}</Text>}
          />

          {item.stock > 0 ? (
            <Text style={styles.stockStyle}>Stock: {item.stock} </Text>
          ) : (
            <Text style={styles.stockStyle}>AGOTADO </Text>
          )}

          <Text style={styles.quantityStyle}>Cantidad: {item.quantity}</Text>

          <View style={styles.lessPlusContainer}>
            <Pressable style={styles.lessItem} >
              <Icon name='minus-square' color={colors.violetaSecundario} size={28}/>
            </Pressable>
            <Pressable style={styles.plusItem} >
              <Icon name='plus-square' color={colors.violetaSecundario} size={28} />
            </Pressable>  
          </View>

        </View>

        <View style={styles.column3Style}>
          <Text style={styles.discountTextStyle}>¡DESCUENTO!</Text>
          <Text style={styles.discountStyle}>{item.discount}%</Text>
          <Text style={styles.priceStyle1}>${item.price}</Text>
          <Text style={styles.priceStyle}>${discountedPrice}</Text>
          <Text style={styles.subtotalStyle}>
            SUBTOTAL: ${(discountedPrice * item.quantity)}
          </Text>
        </View>
      </CardGeneral>
    );
  };

  return (
    <>
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={renderCartItem}
        ListHeaderComponent={<Text style={styles.cartScreenTitle}>Mi carrito:</Text>}
        ListFooterComponent={<FooterComponent/>}
      />
    </>
  );
};

export default CartScreen

const styles = StyleSheet.create({

  cartScreenTitle:{
      fontFamily: 'PressStart',
      color: colors.violetaPrimario,
      fontSize: 16,
      marginLeft: 24,
      marginTop: 12
  },
  eventContainer:{
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 4,
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 8
  },
  eventImage:{
    width: 72,
    height: 72,
    marginTop: 12,
    marginRight: 8,
  },
  eventDescription:{
    paddingHorizontal: 2,
    width: '32%',
    flex: 1
  },
  stockStyle:{
    color: colors.fucsiaAcento,
    fontFamily: 'Roboto',
    fontSize: 14,
    marginTop: 2
  },
  priceStyle:{
    color: colors.violetaPrimario,
    fontSize: 13,
    fontFamily: 'PressStart',
    paddingTop: 8
  },
  priceStyle1:{
    color: colors.violetaPrimario,
    textDecorationLine: 'line-through',
    fontSize: 16,
    paddingTop: 4
  },
  titleStyle:{
    color: colors.violetaPrimario,
    fontSize: 17,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    paddingTop: 8
  },
  tagsStyle:{
    alignItems: 'center',
    color: colors.violetaSecundario,
    fontStyle: 'italic'
  },
  tagsStyleDirection:{
    flexDirection: 'row',
    gap: 4
  },
  discountStyle:{
    backgroundColor: colors.violetaSecundario,
    fontWeight: 'bold',
    fontSize: 16,
    borderRadius: 100,
    margin: 4,
    padding: 12,
    shadowColor: colors.violetaSombra,
    shadowOpacity: 0.5,
    elevation: 5,
    color: colors.blanco,
  },
  column3Style:{
    paddingVertical: 10,
    paddingHorizontal: 2,
    alignItems: 'center'
  },
  backArrow:{
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  backSearchContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  noSearch: {
    backgroundColor: colors.violetaPrimario,
    textAlign: 'center',
    color: colors.blanco,
    fontSize: 16,
    padding: 16,
    margin: 16,
    borderRadius:16
  },
  subtotalStyle:{
    color: colors.violetaPrimario,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8
  },
  quantityStyle:{
    marginTop: 2,
    color: colors.violetaPrimario,
  },
  discountTextStyle: {
    color: colors.violetaPrimario,
    fontSize: 13,
    marginTop: 2
  },
  trashStyle:{
    marginTop: 24,
    alignSelf: 'center',
    marginRight: 8
  },
  confirmButton:{
    backgroundColor: colors.violetaPrimario,
    fontWeight: 'bold',
    fontSize: 16,
    borderRadius: 100,
    padding: 12,
    shadowColor: colors.violetaSombra,
    shadowOpacity: 0.5,
    elevation: 4,
    marginHorizontal: 16,
    marginVertical: 8,
    marginBottom: 16
  },
  confirmButtomText:{
    color: colors.blanco,
    fontFamily: 'PressStart',
    fontSize: 12,
    alignSelf: 'center',
    paddingTop: 4
  },
  footerTotal:{
    alignSelf: 'center',
    color: colors.violetaPrimario,
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600'
  },
  lessPlusContainer:{
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8


  }

})

