import { FlatList, Image, StyleSheet, View, Text, Pressable } from 'react-native';
import CardGeneral from '../components/CardGeneral';
import { colors } from '../global/colors';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Search from '../components/Search';
import { useSelector, useDispatch } from 'react-redux';
import { setEventId } from '../features/shop/shopSlice';


const EventsScreen = ({navigation, route}) => {

  const [eventsFiltered, setEventsFiltered] = useState([])
  
  const [search, setSearch] = useState("")

  const eventsFilteredByCategory = useSelector(state=>state.shopReducer.value.eventsFilteredByCategory)

  useEffect(() => {
    let filteredEvents = [...eventsFilteredByCategory];
  
    if (search) {
      filteredEvents = filteredEvents.filter(ev => 
        ev.title.toLowerCase().includes(search.toLowerCase()) 
        ||
        ev.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())) 
        ||
        ev.dateAndPlace.toLowerCase().includes(search.toLowerCase())
      );
    }
    setEventsFiltered(filteredEvents);
  
  }, [search, eventsFilteredByCategory]);
  
  dispatch = useDispatch()

 const renderEventItem = ({ item }) => {
  return (
    <Pressable onPress={() => {
      dispatch(setEventId(item.id)); 
      navigation.navigate("Evento"); 
    }}>

        <CardGeneral style= {styles.eventContainer}>

          <View>
            <Image
              source={{uri: item.mainImage }}
              style={styles.eventImage}
              resizeMode= 'contain'
            />
          </View>

          <View style={styles.eventDescription}>

            <Text style={styles.titleStyle}>{item.title}</Text>

            <Text>{item.dateAndPlace}</Text>

            <FlatList style={styles.tagsStyleDirection}
              data={item.tags}
              keyExtractor={()=>Math.random()}
              renderItem={({item})=><Text style={styles.tagsStyle}>{item}</Text>}
            />

            {
              item.stock > 0 ?
              <Text style={styles.stockStyle} >Stock: {item.stock} </Text>
              : 
              <Text style={styles.stockStyle} >AGOTADO </Text>
            }

          </View>

          <View style={styles.column3Style}>
            <Text style={styles.discountTextStyle}>¡DESCUENTO!</Text>
            <Text style={styles.discountStyle}>{item.discount}%</Text>
            <Text style={styles.priceStyle1}>${item.price}</Text>
            <Text style={styles.priceStyle}>${(item.price - (item.price * (item.discount / 100)))}</Text>

          </View>

          
        </CardGeneral>

      </Pressable>
    )
  }


  return (
    <>
    
      <View style={styles.backSearchContainer}>

        <Pressable onPress={()=>navigation.goBack()}>
          <Icon style={styles.backArrow} name="angle-left" size={32} color={colors.fucsiaAcento}/> 
        </Pressable>
        
        <Search style={styles.searchStyle} setSearch={setSearch} />

      </View>

      {
        eventsFiltered.length === 0
        ?
        <Text style={styles.noSearch}>No hay eventos ni locales que contengan los términos de tu búsqueda. Lo lamentamos 🙇‍♀️ . Intenta con otras palabras.</Text>
        :
        <FlatList
        data= {eventsFiltered}
        keyExtractor= {item=>item.id}
        renderItem={renderEventItem}
        />
      }


    </>
  )
}

export default EventsScreen;


const styles = StyleSheet.create({

  eventContainer:{
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 2,
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 8,
    marginBottom: 16
  },
  eventImage:{
    width: 88,
    height: 88,
    marginTop: 16
  },
  eventDescription:{
    paddingHorizontal: 2,
    width: '32%'
  },
  stockStyle:{
    color: colors.fucsiaAcento,
    fontFamily: 'Roboto',
    fontSize: 14,
    marginTop: 2,
    marginBottom: 2
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
    borderRadius: 50,
    margin: 4,
    paddingHorizontal: 9,
    paddingVertical: 12,
    shadowColor: colors.violetaSombra,
    shadowOpacity: 0.5,
    elevation: 5,
    color: colors.blanco,
  },
  column3Style:{
    paddingVertical: 8,
    paddingHorizontal: 4,
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
  discountTextStyle: {
    color: colors.violetaPrimario,
    fontSize: 13
  },
  

})