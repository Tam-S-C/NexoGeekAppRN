import { StyleSheet, Text, View, Pressable, FlatList, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../global/colors';
import { clearUser } from '../features/auth/authSlice';
import { useGetFavsQuery, useRemoveFavMutation } from "../services/favsService";
import { setEventId } from "../features/shop/shopSlice";
import BtnWhats from "../components/BtnWhats";
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

  
  const handleRemoveFav = async (id) => {
    try {
      await removeFavMutation(id).unwrap();
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
          <Icon name="trash" size={28} color={colors.fucsiaAcento} />
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
      <View style={styles.mainContainer}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Esta sección es solo para usuarios registrados. Inicia sesión para poder usar esta sección. Gracias.
          </Text>
          
        </View>

        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? colors.violetaSombra : colors.violetaPrimario },
            styles.btnContainer
          ]}
          onPress={handleLoginRedirect}
        >
          <Text style={styles.errorText}>Volver al Login</Text>
        </Pressable>
        <BtnWhats/>
      </View>
    );
  }

  if (isLoading) return (
    <View style={styles.mainContainer}>
      <Text style={styles.loadingText}>Cargando favoritos...</Text>
    </View>
  );
  
  if (isError) return (
    <View style={styles.mainContainer}>
      <Text style={styles.errorText}>Error al cargar favoritos. Inténtalo nuevamente.</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.screenTitle}>Mis Eventos Favs:</Text>
      
      {favs.length === 0 ? (
        <>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Aún no hay eventos favoritos.</Text>
        </View>
        <BtnWhats/>
        </>
      ) : (
        <>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={uniqueFavs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFavItem}
        />
        <BtnWhats/>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  screenTitle: {
    fontSize: 16,
    fontFamily: 'PressStart',
    color: colors.violetaPrimario,
    marginVertical: 16,
  },
  listContainer: {
    flexGrow: 1, 
    paddingBottom: 16,
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 8,
    backgroundColor: colors.violetaSecundario,
    borderRadius: 16,
    shadowColor: colors.violetaSombra,
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 4
  },
  eventDescription: {
    flex: 1,
    marginLeft: 12,
  },
  titleStyle: {
    fontSize: 12,
    fontFamily: 'PressStart',
    marginBottom: 4,
    color: colors.violetaPrimario,
  },
  removeFavButton: {
    padding: 8,
    marginRight: 4
  },
  errorContainer: {
    backgroundColor: colors.violetaPrimario,
    borderRadius: 16,
    marginTop: 64,
    padding: 8,
    textAlign: 'center'
},
  errorText: {
    fontSize: 18,
    color: colors.blanco,
    fontWeight: 'bold',
    backgroundColor: colors.violetaPrimario,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 14,
    textAlign: 'center'
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
  btnContainer: {
    borderRadius: 16,
    marginTop: 24, 
    marginHorizontal: 64
},
});

export default FavsScreen;