import { StyleSheet, Text, FlatList, View, Image, Pressable, Modal } from 'react-native';
import { colors } from '../global/colors';
import { useState } from 'react';
import { clearCart, removeItem, increaseQuantity, decreaseQuantity } from '../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { usePostOrderMutation } from '../services/ordersService';
import CardGeneral from '../components/CardGeneral';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CartScreen = ({ navigation }) => {

  const [thanksModalVisible, setThanksModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const total = useSelector((state) => state.cartReducer.value.total);
  const cart = useSelector((state) => state.cartReducer.value.cartItems);
  const [deleteItemModalVisible, setDeleteItemModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [triggerPost, result] = usePostOrderMutation();

  const dispatch = useDispatch();

  const openDeleteItemModal = (item) => {
    setItemToDelete(item);
    setDeleteItemModalVisible(true);
  };

  const closeDeleteItemModal = () => {
    setDeleteItemModalVisible(false);
    setItemToDelete(null);
  };

  const handleIncrease = (item) => {
    if (item.quantity < item.stock) {
      dispatch(increaseQuantity({ id: item.id, stock: item.stock }));
    }
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity({ id: item.id }));
    }
  };

  const handleDeleteItem = () => {
    if (itemToDelete) {
      dispatch(removeItem(itemToDelete.id));
    }
    closeDeleteItemModal();
  };

  const deleteAllEvents = () => {
    dispatch(clearCart());
  };

  const confirmBtn = () => {
   setThanksModalVisible(true);
   setTimeout(() => {
      setThanksModalVisible(false);
      dispatch(clearCart());
      navigation.navigate('Orders');
      triggerPost({ cart, total, createdAt: Date.now() });
   }, 1300);
  };
  

  const FooterComponent = () => (

    <View style={styles.footerContainer}>

      <Text style={styles.itemsText}>Tienes {cart.length} producto/os del mismo evento/local en tu carrito.</Text>
      <Text style={styles.footerTotal}>Total: ${total}</Text>

      <Pressable onPress={() => {
          confirmBtn()
      }}
        style={({ pressed }) => [
          { backgroundColor: pressed ? colors.violetaSombra : colors.violetaPrimario },
          styles.confirmButton,
        ]}
      >
        <Text style={styles.confirmButtonText}>CONFIRMAR COMPRA</Text>
      </Pressable>

      <Pressable onPress={() => setModalVisible(true)}>
        <Icon name="trash" size={28} color={colors.fucsiaAcento} style={styles.trashAllEvents} />
      </Pressable>
      <Text style={styles.deleteText}>Vaciar Carrito</Text>

    </View>
  );

  const renderCartItem = ({ item }) => {

    const discountedPrice = item.price - item.price * (item.discount / 100);

    return (
      <CardGeneral style={styles.eventContainer}>
        <View>
          <Image source={{ uri: item.mainImage }} style={styles.eventImage} resizeMode="contain" />
          <Pressable onPress={() => openDeleteItemModal(item)}>
            <Icon name="trash" size={28} color={colors.fucsiaAcento} style={styles.trashStyle} />
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
            keyExtractor={(tag) => tag}
            renderItem={({ item }) => <Text style={styles.tagsStyle}>{item}</Text>}
          />
          <Text style={styles.stockStyle}>
            {item.stock > 0 ? `Stock: ${item.stock - item.quantity}` : 'AGOTADO'}
          </Text>
          <Text style={styles.quantityStyle}>Cantidad: {item.quantity}</Text>
          <View style={styles.lessPlusContainer}>

            <Pressable onPress={() => handleDecrease(item)} style={styles.lessItem}>
              <Icon name="minus-square" color={colors.violetaSecundario} size={32} />
            </Pressable>

            <Pressable onPress={() => handleIncrease(item)} style={styles.plusItem}>
              <Icon name="plus-square" color={colors.violetaSecundario} size={32} />
            </Pressable>

          </View>
        </View>
        <View style={styles.column3Style}>
          <Text style={styles.discountTextStyle}>¡DESCUENTO!</Text>
          <Text style={styles.discountStyle}>{item.discount}%</Text>
          <Text style={styles.priceStyle1}>${item.price}</Text>
          <Text style={styles.priceStyle}>${discountedPrice}</Text>
          <Text style={styles.subtotalStyle}>
            SUBTOTAL: ${(discountedPrice * item.quantity).toFixed(2)}
          </Text>
        </View>
      </CardGeneral>
    );
  };

  return (
    <>
      <Text style={styles.cartScreenTitle}>Mi carrito:</Text>

      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={renderCartItem}
            ListFooterComponent={<FooterComponent />}
          />

          <Modal
            visible={modalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >

            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>¿Seguro quiere vaciar todo el carrito?</Text>
                <View style={styles.modalButtons}>
                  <Pressable
                    style={styles.modalCancelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.modalButtonText}>No, cancelar</Text>
                  </Pressable>
                  <Pressable
                    style={styles.modalConfirmButton}
                    onPress={() => {
                      deleteAllEvents();
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalButtonText}>Sí, vaciar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            visible={deleteItemModalVisible}
            transparent
            animationType="slide"
            onRequestClose={closeDeleteItemModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>¿Seguro quieres eliminar este ítem del carrito?</Text>
                <View style={styles.modalButtons}>
                  <Pressable style={styles.modalCancelButton} onPress={closeDeleteItemModal}>
                    <Text style={styles.modalButtonText}>No, cancelar</Text>
                  </Pressable>
                  <Pressable style={styles.modalConfirmButton} onPress={handleDeleteItem}>
                    <Text style={styles.modalButtonText}>Sí, eliminar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          <Modal 
            visible={thanksModalVisible}
            transparent={true} 
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.thanksModalContainer}>
              <Text style={styles.thanksText}>¡GRACIAS POR TU COMPRA!</Text>
            </View>
          </Modal>

        </>
      ) : (
        <View>
          <Text style={styles.errorText}>Aún no hay eventos en tu carrito</Text>
        </View>
      )}
    </>
  );
};

export default CartScreen;


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
    backgroundColor: colors.violetaPrimario,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalConfirmButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: colors.fucsiaAcento,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: colors.blanco,
    fontWeight: 'bold',
    fontSize: 14,
  },
  thanksModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  thanksText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.blanco,
    backgroundColor: colors.violetaPrimario,
    padding: 16,
    borderRadius: 16,
    textAlign: 'center',
  },


  //Screen

  cartScreenTitle: {
    fontFamily: 'PressStart',
    color: colors.violetaPrimario,
    fontSize: 16,
    marginLeft: 24,
    marginTop: 12
  },
  eventContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 2,
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 8
  },
  eventImage: {
    width: 72,
    height: 72,
    marginTop: 12,
    marginRight: 18,
  },
  eventDescription: {
    paddingHorizontal: 2,
    width: '32%',
    flex: 1,
    color: colors.violetaPrimario
  },
  stockStyle: {
    color: colors.fucsiaAcento,
    fontFamily: 'Roboto',
    fontSize: 14,
    marginTop: 2
  },
  priceStyle: {
    color: colors.violetaPrimario,
    fontSize: 12,
    fontFamily: 'PressStart',
    paddingTop: 8
  },
  priceStyle1: {
    color: colors.violetaPrimario,
    textDecorationLine: 'line-through',
    fontSize: 16,
    paddingTop: 4
  },
  titleStyle: {
    color: colors.violetaPrimario,
    fontSize: 17,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    paddingTop: 8
  },
  tagsStyle: {
    alignItems: 'center',
    color: colors.violetaSecundario,
    fontStyle: 'italic'
  },
  tagsStyleDirection: {
    flexDirection: 'row',
    gap: 6
  },
  discountStyle: {
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
  column3Style: {
    paddingVertical: 10,
    alignItems: 'flex-end'
  },
  subtotalStyle: {
    color: colors.violetaPrimario,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8
  },
  quantityStyle: {
    marginTop: 2,
    color: colors.violetaPrimario,
  },
  trashStyle: {
    marginTop: 16,
    alignSelf: 'center',
    marginRight: 18,
    marginBottom: 2,
    paddingHorizontal: 16,
  },
  trashAllEvents: {
    marginTop: 10,
    alignSelf: 'center',
  },
  confirmButton: {
    borderRadius: 100,
    padding: 12,
    shadowColor: colors.violetaSombra,
    shadowOpacity: 0.5,
    elevation: 4,
    marginHorizontal: 16,
    marginVertical: 12,
    marginBottom: 12
  },
  confirmButtonText: {
    color: colors.blanco,
    fontFamily: 'PressStart',
    fontSize: 12,
    alignSelf: 'center',
    paddingTop: 4
  },
  footerTotal: {
    alignSelf: 'center',
    color: colors.violetaPrimario,
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600'
  },
  lessPlusContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
  },
  deleteText: {
    alignSelf: 'center',
    color: colors.fucsiaAcento,
    marginTop: 2,
    fontSize: 18,
    fontWeight: '600'
  },
  deleteEventText: {
    alignSelf: 'center',
    color: colors.fucsiaAcento,
    fontSize: 12,
    fontWeight: '600',
    marginRight: 16,
  },
  errorText: {
    fontSize: 18,
    color: colors.blanco,
    fontWeight: 'bold',
    backgroundColor: colors.violetaPrimario,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 40,
    textAlign: 'center'
  },
  itemsText:{
    alignSelf: 'center',
    color: colors.violetaPrimario,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 16
  }

})

