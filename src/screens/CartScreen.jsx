import { StyleSheet, Text, FlatList, View, Image, Pressable, Modal } from 'react-native'
import cart from '../data/cart.json'
import { colors } from '../global/colors'
import CardGeneral from '../components/CardGeneral'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useState, useEffect } from 'react'

const CartScreen = () => {
  
  const [total, setTotal] = useState(0)
  const [modalVisible, setModalVisible] = useState(false); 
  const [eventToDelete, setEventToDelete] = useState(null);


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
        <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? colors.violetaSombra : colors.violetaPrimario }, styles.confirmButton]}  >
          <Text style={styles.confirmButtomText}>CONFIRMAR COMPRA</Text>
        </Pressable>

        <Pressable
        onPress={() => {
          setEventToDelete(null);
          setModalVisible(true); 
        }}
        style={({ pressed }) => [styles.trashAllEvents]}
      >
        {({ pressed }) => (
          <Icon
            name="trash"
            size={28}
            color={pressed ? colors.fucsiaSombra : colors.fucsiaAcento}
          />
        )}
      </Pressable>
        <Text style={styles.deleteText}>Vaciar Carrito</Text>

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
            <Pressable  onPress={() => {
                    setEventToDelete(item.id);
                    setModalVisible(false);
                }}
                style={({ pressed }) => [styles.trashStyle]} >
               {({ pressed }) => (
                      <Icon
                          name="trash"
                          size={28}
                          color={pressed ? colors.fucsiaSombra : colors.fucsiaAcento}
                      />
                  )}
            </Pressable>
            <Text style={styles.deleteEventText}>Eliminar</Text>
            <Text style={styles.deleteEventText}>Evento</Text>
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
              <Icon name='minus-square' color={colors.violetaSecundario} size={32}/>
            </Pressable>
            <Pressable style={styles.plusItem} >
              <Icon name='plus-square' color={colors.violetaSecundario} size={32} />
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
        ListFooterComponent={<FooterComponent />}
      />

      <Modal
        visible={eventToDelete !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEventToDelete(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              ¿Seguro quiere eliminar este evento del carrito?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.modalCancelButton}
                onPress={() => setEventToDelete(null)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={styles.modalConfirmButton}
                onPress={() => {
                  deleteEvent(eventToDelete);
                  setEventToDelete(null);
                }}
              >
                <Text style={styles.modalButtonText}>Sí, eliminar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              ¿Seguro quiere vaciar todo el carrito?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.modalCancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={styles.modalConfirmButton}
                onPress={() => {
                  deleteAllEvents();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonText}>Sí, eliminar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CartScreen

const styles = StyleSheet.create({

  //MODAL

      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: colors.blanco,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        color: colors.violetaPrimario,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalCancelButton: {
        flex: 1,
        marginRight: 10,
        backgroundColor: colors.fucsiaAcento,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    modalConfirmButton: {
        flex: 1,
        marginLeft: 10,
        backgroundColor: colors.violetaPrimario,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    modalButtonText: {
        color: colors.blanco,
        fontWeight: 'bold',
        fontSize: 14,
    },


  //Screen

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
    paddingVertical: 2,
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 8
  },
  eventImage:{
    width: 72,
    height: 72,
    marginTop: 12,
    marginRight: 18,
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
    fontSize: 12,
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
    gap: 6
  },
  discountStyle:{
    backgroundColor: colors.violetaSecundario,
    fontWeight: 'bold',
    fontSize: 16,
    borderRadius: 100,
    margin: 4,
    paddingVertical: 14,
    paddingHorizontal: 10,
    shadowColor: colors.violetaSombra,
    shadowOpacity: 0.5,
    elevation: 5,
    color: colors.blanco,
  },
  discountTextStyle: {
    color: colors.violetaSecundario,
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 2
  },
  column3Style:{
    paddingVertical: 10,
    alignItems: 'flex-end'
  },
  subtotalStyle:{
    color: colors.violetaPrimario,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8
  },
  quantityStyle:{
    marginTop: 2,
    color: colors.violetaPrimario,
  },
  trashStyle:{
    marginTop: 16,
    alignSelf: 'center',
    marginRight: 18,
    marginBottom: 2,
    paddingHorizontal: 16,
  },
  trashAllEvents:{
    marginTop: 16,
    alignSelf: 'center',
  },
  confirmButton:{
    borderRadius: 100,
    padding: 12,
    shadowColor: colors.violetaSombra,
    shadowOpacity: 0.5,
    elevation: 4,
    marginHorizontal: 16,
    marginVertical: 12,
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
    marginTop: 24,
    fontSize: 18,
    fontWeight: '600'
  },
  lessPlusContainer:{
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
  },
  deleteText:{
    alignSelf: 'center',
    color: colors.fucsiaAcento,
    marginTop: 2,
    fontSize: 18,
    fontWeight: '600'
  },
  deleteEventText:{
    alignSelf: 'center',
    color: colors.fucsiaAcento,
    fontSize: 12,
    fontWeight: '600',
    marginRight: 16,
  },

})

