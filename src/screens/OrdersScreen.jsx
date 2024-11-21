import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Modal, Pressable, Image } from 'react-native';
import { useGetOrdersQuery } from '../services/ordersService';
import { colors } from '../global/colors';
import { useSelector } from 'react-redux';
import CardGeneral from '../components/CardGeneral';
import Icon from 'react-native-vector-icons/FontAwesome5';


const OrdersScreen = () => {

  const token = useSelector((state) => state.authReducer.value.token);
  const { data: orders, isLoading, isError } = useGetOrdersQuery();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  if (!token) {
    return (
      <>
        <View>
          <Text style={styles.errorText}>Esta sección es solo para usuarios registrados. Reinicia la app para registrarte y poder usar esta sección. Gracias.</Text>
        </View>

      </>
    );
  }

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalVisible(false);
  };

  const renderOrderItem = ({ item }) => {
    const dateOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };


    return (
      <CardGeneral style={styles.orderContainer}>
        <View style={styles.row}>
          <View>
            <Text style={styles.title}>Orden nº: {item.id}</Text>
            <Text style={styles.date}>
              Fecha: {new Date(item.createdAt).toLocaleString('es-Ar', dateOptions)} hs.
            </Text>
          </View>
          <Pressable onPress={() => openModal(item)}>
            <Icon name="search-plus" size={24} color={colors.violetaSecundario} />
          </Pressable>
        </View>
      </CardGeneral>
    );
  };

  if (isLoading) return <Text style={styles.loadingText}>Cargando órdenes...</Text>;
  if (isError) return <Text style={styles.errorText}>Ha ocurrido un error al cargar las órdenes de compra, lo sentimos mucho 🙇‍♀️. Prueba nuevamente.</Text>;


  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        ListHeaderComponent={<Text style={styles.ordersScreenTitle}>Mis Compras Realizadas:</Text>}
      />

      {selectedOrder && (
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedOrder.cart[0]?.mainImage }}
                style={styles.modalImage}
                resizeMode="contain"
              />
              <Text style={styles.modalTitle}>Orden nº: {selectedOrder.id}</Text>
              <Text style={styles.modalText}>
                Fecha: {new Date(selectedOrder.createdAt).toLocaleString('es-Ar')} hs.
              </Text>
              
              {selectedOrder.cart.map((item, index) => (
                <View key={index} style={styles.modalItem}>
                  <Text style={styles.modalText}>Evento/Local: {item.title}</Text>
                  <Text style={styles.modalText}>Cantidad de Tickets: {item.quantity}</Text>
                  <Text style={styles.modalText}>Total: ${selectedOrder.total}</Text>
                  <Text style={styles.modalText2}>No válido como factura.</Text>
                </View>
              ))}
              <Pressable style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  ordersScreenTitle: {
    fontFamily: 'PressStart',
    color: colors.violetaPrimario,
    fontSize: 14,
    marginLeft: 24,
    marginTop: 12
  },
  orderContainer: {
    marginVertical: 16,
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 16,
    borderColor: colors.violetaSecundario,
    backgroundColor: colors.blanco,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.violetaPrimario
  },
  date: {
    fontSize: 16,
    color: colors.violetaSecundario
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.blanco,
    padding: 24,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
  },
  modalImage: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.violetaPrimario,
  },
  modalText: {
    fontSize: 16,
    color: colors.violetaPrimario,
    marginBottom: 10,
  },
  modalText2: {
    fontSize: 14,
    color: colors.fucsiaAcento,
    marginBottom: 4,
  },
  modalItem: {
    marginBottom: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 8,
    backgroundColor: colors.violetaPrimario,
    padding: 16,
    borderRadius: 16,
  },
  closeButtonText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
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
});

export default OrdersScreen;
