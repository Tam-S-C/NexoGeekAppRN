import { StyleSheet, Text, View, Pressable, Image, ActivityIndicator, ScrollView, Modal } from 'react-native';
import { colors } from '../global/colors';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import { useGetEventQuery } from '../services/shopService';
import { clearUser } from '../features/auth/authSlice';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useAddFavMutation, useRemoveFavMutation } from "../services/favsService";
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';

const OneEventScreen = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const eventId = useSelector(state => state.shopReducer.value.eventId);
  const token = useSelector(state => state.authReducer.value.token);
  const favs = useSelector(state => state.favsReducer.value);
  const { data: eventFound, error, isLoading } = useGetEventQuery(eventId)

  const dispatch = useDispatch();

  const [addFav] = useAddFavMutation();
  const [removeFav] = useRemoveFavMutation();

  useEffect(() => {
    const favorite = favs.some(fav => fav.id === eventFound?.id);
    setIsFavorite(favorite);
  }, [favs, eventFound?.id]);


  const handleAddToCart = () => {
    if (!token) {
      dispatch(clearUser());
      navigation.navigate('InAppAuth', { screen: 'LoginScreen' });
      return;
    }
    setModalVisible(true);
    dispatch(addItem({ ...eventFound, quantity: 1 }));
    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate('Cart');
    }, 1300);
  };


  const handleAddToFavs = async () => {
    if (!token) {
      Toast.show({
        type: 'success',
        text1: 'Debes iniciar sesión para poder guardar los eventos como Favoritos',
        visibilityTime: 1500,
      });
      return;
    }
    try {
      if (isFavorite) {
        await removeFav(eventFound.id).unwrap();
        setIsFavorite(false);
        Toast.show({
          type: 'success',
          text1: '¡El evento ha sido eliminado de tus Favoritos!',
          visibilityTime: 1500,
        });
      } else {
        const newFav = {
          id: eventFound.id,
          title: eventFound.title,
          mainImage: eventFound.mainImage,
          dateAndPlace: eventFound.dateAndPlace
        };

        await addFav(newFav).unwrap();
        setIsFavorite(true);
        Toast.show({
          type: 'success',
          text1: '¡Se ha guardado el evento en la lista de tus Favoritos!',
          visibilityTime: 1500,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Hubo un error al guardar el evento, prueba nuevamente más tarde.',
        visibilityTime: 1500,
      });
    }
  };


  const handleImagePress = (imageUri) => {
    setSelectedImage(imageUri);
  };


  //location-maps
  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso para acceder a la locación denegada');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleMapPress = () => {
    setMapModalVisible(true);
  };


  return (

    <>
      {
        isLoading
          ?
          <ActivityIndicator size={80} color={colors.fucsiaAcento} style={styles.spinner} />
          :
          error
            ?
            <Text style={styles.errorText}>
              Ha ocurrido un error al cargar el evento, lo sentimos mucho 🙇‍♀️. Prueba nuevamente.
            </Text>
            :
            <>

              <View style={styles.backTitleContainer}>
                <Pressable onPress={() => navigation.goBack()}>
                  <Icon style={styles.backArrow} name="angle-left" size={32} color={colors.fucsiaAcento} />
                </Pressable>
                <Text style={styles.eventSelected}>{eventFound.title}</Text>
              </View>

              <ScrollView horizontal={true} style={styles.imageScrollContainer}>

                <Pressable onPress={() => handleImagePress(eventFound.mainImage)}>
                  <Image
                    source={{ uri: eventFound.mainImage }}
                    alt={eventFound.title}
                    style={styles.scrollImage}
                  />
                </Pressable>

                <Pressable onPress={() => handleImagePress(eventFound.mainImage2)}>
                  <Image
                    source={{ uri: eventFound.mainImage2 }}
                    alt={eventFound.title}
                    style={styles.scrollImage}
                  />
                </Pressable>

                <Pressable onPress={() => handleImagePress(eventFound.mainImage3)}>
                  <Image
                    source={{ uri: eventFound.mainImage3 }}
                    alt={eventFound.title}
                    style={styles.scrollImage}
                  />
                </Pressable>
              </ScrollView>

              <View style={styles.descriptionFavContainer}>
                <Text style={styles.eventDescription}>{eventFound.description}</Text>

                <Pressable onPress={handleAddToFavs}>
                  <FontAwesome
                    name={isFavorite ? "heart" : "heart-o"}
                    size={32}
                    color={isFavorite ? colors.fucsiaAcento : colors.violetaPrimario}
                    style={styles.favIcon}
                  />
                </Pressable>

                <Pressable onPress={handleMapPress}>
                  <Icon
                    name="map-marked-alt"
                    size={31}
                    color={colors.violetaPrimario}
                    style={styles.mapIcon}
                  />
                </Pressable>

                <Modal
                  visible={mapModalVisible}
                  transparent={true}
                  animationType="slide"
                  onRequestClose={() => setMapModalVisible(false)}
                >
                  <View style={styles.mapModalContainer}>
                    <View style={styles.mapModalContent}>
                      {eventFound?.coordinates && (
                        <MapView
                          style={styles.map}
                          initialRegion={{
                            latitude: eventFound.coordinates.latitude,
                            longitude: eventFound.coordinates.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                          }}
                        >
                          <Marker
                            coordinate={{
                              latitude: eventFound.coordinates.latitude,
                              longitude: eventFound.coordinates.longitude,
                            }}
                            title={eventFound.title}
                            description={eventFound.dateAndPlace}
                          />
                        </MapView>
                      )}
                      <Pressable
                        style={styles.closeMapButton}
                        onPress={() => setMapModalVisible(false)}
                      >
                        <Text style={styles.closeMapButtonText}>Cerrar</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>

              </View>

              <View style={styles.tagsStyleDirection}>
                {
                  eventFound.tags?.map(tag => <Text key={Math.random()} style={styles.tagsStyle}>{tag}</Text>)
                }
              </View>

              <View style={styles.dateContainer}>
                <Text style={styles.dateTextStyle}>FECHA Y LUGAR: </Text>
                <Text style={styles.dateStyle}>{eventFound.dateAndPlace}</Text>
              </View>

              {
                eventFound.stock > 0 ?
                  <Text style={styles.stockStyle}>Stock: {eventFound.stock} </Text>
                  :
                  <Text style={styles.stockStyle2}>AGOTADO </Text>
              }

              <View style={styles.discountContainer}>
                <Text style={styles.discountTextStyle}>DESCUENTO: </Text>
                <Text style={styles.discountStyle}>{eventFound.discount}%</Text>
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.priceTextStyle}>PRECIO: </Text>
                <Text style={styles.priceStyle}>${eventFound.price}</Text>
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.priceTextStyle}>TOTAL: </Text>
                <Text style={styles.priceStyle2}>${(eventFound.price - (eventFound.price * (eventFound.discount / 100)))}</Text>
              </View>


              {
                eventFound.stock > 0
                  ?
                  <Pressable
                    style={({ pressed }) => [
                      { backgroundColor: pressed ? colors.violetaSombra : colors.violetaPrimario },
                      styles.addToCardButton
                    ]}
                    onPress={handleAddToCart}
                  >
                    <Text style={styles.addToCardText}>
                      {token ? 'Agregar al Carrito ' : 'Iniciar Sesión '}
                      <FontAwesome name="ticket" size={24} />
                    </Text>
                  </Pressable>
                  :
                  <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? colors.fucsiaSombra : colors.fucsiaAcento }, styles.addToCardButton2]}
                    onPress={null}>
                    <Text style={styles.addToCardText2}>Evento Sin Stock </Text>
                  </Pressable>
              }


              <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalText}>¡Evento agregado con éxito al carrito!</Text>
                  </View>
                </View>
              </Modal>

              <Modal
                visible={selectedImage !== null}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setSelectedImage(null)}
              >
                <Pressable style={styles.modalContainer} onPress={() => setSelectedImage(null)}>
                  <Image
                    source={{ uri: selectedImage }}
                    style={styles.modalImage}
                  />
                </Pressable>
              </Modal>

            </>
      }
    </>
  );
};

export default OneEventScreen;

const styles = StyleSheet.create({
  backArrow: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  backTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  eventSelected: {
    paddingLeft: 16,
    fontFamily: 'PressStart',
    fontSize: 14,
    paddingTop: 8,
    color: colors.violetaPrimario
  },
  stockStyle: {
    color: colors.violetaPrimario,
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  stockStyle2: {
    color: colors.fucsiaAcento,
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  priceStyle: {
    color: colors.fucsiaAcento,
    fontSize: 14,
    paddingTop: 10,
    paddingLeft: 4,
    textDecorationLine: 'line-through',
  },
  priceStyle2: {
    color: colors.violetaPrimario,
    fontSize: 14,
    fontFamily: 'PressStart',
    paddingTop: 14,
    paddingLeft: 4
  },
  discountStyle: {
    backgroundColor: colors.violetaSecundario,
    fontWeight: 'bold',
    fontSize: 16,
    borderRadius: 100,
    paddingVertical: 14,
    paddingHorizontal: 10,
    shadowColor: colors.violetaSombra,
    shadowOpacity: 0.5,
    elevation: 5,
    color: colors.blanco,
    width: 'contain'
  },
  discountContainer: {
    flexDirection: 'row'
  },
  discountTextStyle: {
    marginLeft: 16,
    marginTop: 16,
    marginHorizontal: 4,
    color: colors.violetaPrimario,
    fontWeight: 'bold',
    fontSize: 16
  },
  eventDescription: {
    color: colors.violetaPrimario,
    fontSize: 16,
    width: '66%',
  },
  favIcon: {
    marginRight: 4,
    marginTop: 4
  },
  descriptionFavContainer: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'space-between',
    marginLeft: 16,
  },
  priceTextStyle: {
    marginLeft: 16,
    marginTop: 8,
    color: colors.violetaPrimario,
    fontWeight: 'bold',
    fontSize: 16
  },
  priceContainer: {
    flexDirection: 'row'
  },
  addToCardButton: {
    fontWeight: 'bold',
    fontSize: 16,
    borderRadius: 100,
    padding: 12,
    shadowColor: colors.violetaSombra,
    shadowOpacity: 0.5,
    elevation: 5,
    marginHorizontal: 16,
    marginVertical: 16
  },
  addToCardButton2: {
    fontWeight: 'bold',
    fontSize: 16,
    borderRadius: 100,
    padding: 12,
    shadowColor: colors.violetaSombra,
    shadowOpacity: 0.5,
    elevation: 5,
    marginHorizontal: 16,
    marginVertical: 16
  },
  addToCardText: {
    color: colors.blanco,
    fontFamily: 'PressStart',
    fontSize: 12,
    alignSelf: 'center',
  },
  addToCardText2: {
    color: colors.blanco,
    fontFamily: 'PressStart',
    fontSize: 12,
    alignSelf: 'center',
    paddingTop: 4
  },
  dateStyle: {
    color: colors.violetaPrimario,
    marginLeft: 16,
    marginTop: 2,
  },
  dateTextStyle: {
    marginLeft: 16,
    color: colors.violetaPrimario,
    fontWeight: 'bold',
    fontSize: 16,
  },
  tagsStyle: {
    alignItems: 'center',
    color: colors.violetaSecundario,
    fontSize: 16,
    fontStyle: 'italic'
  },
  tagsStyleDirection: {
    flexDirection: 'row',
    gap: 16,
    marginLeft: 16,
    marginVertical: 6,
  },
  scrollImage: {
    width: 200,
    height: 190,
    marginHorizontal: 16,
    borderRadius: 60,
    marginTop: 12,
  },

  //Modal

  mapModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  mapModalContent: {
    backgroundColor: colors.blanco,
    width: '90%',
    height: '80%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  map: {
    width: '100%',
    height: '90%',
    borderRadius: 16,
  },
  closeMapButton: {
    marginTop: 10,
    backgroundColor: colors.violetaPrimario,
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  closeMapButtonText: {
    color: colors.blanco,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapIcon: {
    marginRight: 16,
    marginTop: 4
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.violetaPrimario,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },

  spinner: {
    marginTop: 80
  },
  errorText: {
    fontSize: 18,
    color: colors.blanco,
    fontWeight: 'bold',
    backgroundColor: colors.fucsiaAcento,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 64,
    textAlign: 'center'
  },
  btnContainer: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 24,
    marginHorizontal: 80
  },
  errorContainer: {
    backgroundColor: colors.violetaPrimario,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginTop: 64,
    textAlign: 'center'
  },
  errorText2: {
    fontSize: 18,
    color: colors.blanco,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 16,
  },

});
