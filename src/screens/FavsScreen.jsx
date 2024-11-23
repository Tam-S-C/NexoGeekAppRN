import { StyleSheet, Text, View, Pressable, FlatList, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../global/colors';
import { clearUser } from '../features/auth/authSlice';
import { useGetFavsQuery, useRemoveFavMutation } from "../services/favsService";
import { setEventId } from "../features/shop/shopSlice";
import CardGeneral from "../components/CardGeneral";
import Icon from "react-native-vector-icons/FontAwesome5";
import Toast from 'react-native-toast-message';


const FavsScreen = ({ navigation }) => {

  const { token } = useSelector((state) => state.authReducer.value);
  const { data: favs, isLoading, isError, refetch } = useGetFavsQuery();
  const [removeFavMutation] = useRemoveFavMutation();
  const dispatch = useDispatch();

  const uniqueFavs = favs ? favs.filter((value, index, self) =>
    index === self.findIndex((t) => t.id === value.id)
  ) : [];

  const handleNavigateToEvent = (eventId) => {
    dispatch(setEventId(eventId));
    navigation.navigate("Evento");
  };

  
  const handleRemoveFav = async (favId) => {
    try {
      await removeFavMutation(favId);
      Toast.show({
        type: 'success',
        text1: '¡Evento eliminado de favoritos con éxito!',
        visibilityTime: 1500,
      });
      refetch();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Hubo un error al eliminar el favorito.',
        visibilityTime: 1500,
      });
    }
  };



  const renderFavItem = ({ item }) => (
    <Pressable onPress={() => handleNavigateToEvent(item.id)}>
      <CardGeneral style={styles.eventContainer}>
        <View>
          <Image source={{ uri: item.mainImage }} style={styles.eventImage} />
        </View>
        <View style={styles.eventDescription}>
          <Text style={styles.titleStyle}>{item.title}</Text>
          <Text>{item.dateAndPlace}</Text>
        </View>
        <Pressable onPress={() => handleRemoveFav(item.id)} style={styles.removeFavButton}>
          <Icon name="trash" size={24} color={colors.fucsiaAcento} />
        </Pressable>
      </CardGeneral>
    </Pressable>
  );

  const handleLoginRedirect = () => {
    dispatch(clearUser());
    navigation.navigate('InAppAuth', { screen: 'LoginScreen' });
  };


  if (!token) {
    return (
      <>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Esta sección es solo para usuarios registrados. Inicia sesión para poder usar esta sección. Gracias.</Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? colors.violetaSombra : colors.violetaPrimario },
            styles.btnContainer
          ]}
          onPress={handleLoginRedirect}
        >
          <Text style={styles.errorText}> Volver al Login </Text>
        </Pressable>
      </>
    );
  }

  if (isLoading) return <Text style={styles.loadingText}>Cargando favoritos...</Text>;
  if (isError) return <Text style={styles.errorText}>Error al cargar favoritos. Inténtalo nuevamente.</Text>;

  return (
    <>
      <View style={styles.container2}>
        <Text style={styles.cartScreenTitle}>Mis Eventos Favs:</Text>
      </View>

      <View style={styles.container2}>
      {favs.length === 0 ? (
        <View>
        <Text style={styles.errorText2}>Aún no hay eventos favoritos.</Text>
      </View>
      ) : (
        <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={uniqueFavs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFavItem}
        />
        </View>
      )}
    </View>
    </>
  );
};

export default FavsScreen;

const styles = StyleSheet.create({

  flatListContainer: {
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 16,
    marginTop:-280
  },
  container2: {
    flex: 1,
    padding: 16,
  },
  cartScreenTitle: {
    fontFamily: 'PressStart',
    color: colors.violetaPrimario,
    fontSize: 16,
    marginLeft: 4,
    marginTop: 4
  },
  errorContainer: {
    backgroundColor: colors.violetaPrimario,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginTop: 64,
    textAlign: 'center'
  },
  errorText: {
    fontSize: 18,
    color: colors.blanco,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  btnContainer: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 24,
    marginHorizontal: 80
  },
  favItem: {
    padding: 12,
    backgroundColor: colors.violetaSecundario,
    borderRadius: 8,
    marginBottom: 8,
  },
  favTitle: {
    color: colors.blanco,
    fontSize: 16,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 16,
    color: colors.violetaPrimario,
  },
  eventContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.violetaSecundario,
  },
  eventImage: {
    width: 96,
    height: 96,
    borderRadius: 8,
  },
  eventDescription: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.violetaPrimario,
  },
  removeFavButton: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8
  },
  errorText2: {
    fontSize: 18,
    color: colors.blanco,
    fontWeight: 'bold',
    backgroundColor: colors.violetaPrimario,
    borderRadius: 16,
    padding: 24,
    marginVertical: -260,
    textAlign: 'center'
  },

});
