import { StyleSheet, Text, View, Pressable, Image, useWindowDimensions, ScrollView } from 'react-native'
import { colors } from '../global/colors'
import Icon from 'react-native-vector-icons/FontAwesome5';
import events from '../data/events.json'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const OneEventScreen = ({ route, navigation }) => {
  
    const [eventFound, setEventFound] = useState({})

    const eventId = useSelector(state=>state.shopReducer.value.eventId)

    const {width, height} = useWindowDimensions()
  
    useEffect(() => {
      if (eventId) {
        setEventFound(events.find(ev => ev.id === eventId));
      }
    }, [eventId]);
    

    const dispatch = useDispatch()
  
    return (
    <ScrollView>

        <View style={styles.backTitleContainer}>

          <Pressable onPress={()=>navigation.goBack()}>
            <Icon style={styles.backArrow} name="angle-left" size={32} color={colors.fucsiaAcento}/> 
          </Pressable>

          <Text style={styles.eventSelected}>{eventFound.title}</Text>

        </View>

        <Image
          source = {{uri: eventFound.mainImage}}
          alt = {eventFound.title}
          width = '100%'
          height={width*0.5}
          resizeMode='contain'
          marginTop= {8}

        />

              <Text style={styles.eventDescription}>{eventFound.description}</Text>

              <View style={styles.tagsStyleDirection}>
              {
                eventFound.tags?.map(tag => <Text key={Math.random()} 
                style={styles.tagsStyle}>{tag}</Text>)
              }
              </View>

              <View style={styles.dateContainer}>
                <Text style={styles.dateTextStyle}>FECHA Y LUGAR: </Text>
              <Text style={styles.dateStyle}>{eventFound.dateAndPlace}</Text>
              </View>

              {   
                eventFound.stock > 0 ?
                <Text style={styles.stockStyle} >Stock: {eventFound.stock} </Text>
                : 
                <Text style={styles.stockStyle2} >AGOTADO </Text>
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
                eventFound.stock > 0 ?
                <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? colors.violetaSombra : colors.violetaPrimario }, styles.addToCardButton]}
                onPress={null}>
                  <Text style={styles.addToCardText}>Agregar al Carrito <FontAwesome name="ticket" size={24}/></Text>
                </Pressable>
                :
                <Pressable 
                  style={({ pressed }) => [{ backgroundColor: pressed ? colors.fucsiaSombra : colors.fucsiaAcento }, styles.addToCardButton2]}
                  onPress={null}>
                  <Text style={styles.addToCardText2}>Evento Sin Stock</Text>
                </Pressable>
              }
    </ScrollView>
  )
}

export default OneEventScreen;

const styles = StyleSheet.create({

    backArrow:{
        paddingVertical: 4,
        paddingHorizontal: 4,
      },
    backTitleContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 4,
      },
    eventSelected:{
        paddingLeft: 16,
        fontFamily: 'PressStart',
        fontSize: 14,
        paddingTop: 8,
        color: colors.violetaPrimario
      },
      stockStyle:{
        color: colors.violetaPrimario,
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        marginBottom: 8,
        marginTop: 16,
      },
      stockStyle2:{
        color: colors.fucsiaAcento,
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        marginBottom: 8,
        marginTop: 16,
      },
      priceStyle:{
        color: colors.violetaPrimario,
        fontSize: 14,
        paddingTop: 10,
        paddingLeft: 4,
        textDecorationLine: 'line-through',
      },
      priceStyle2:{
        color: colors.violetaPrimario,
        fontSize: 14,
        fontFamily: 'PressStart',
        paddingTop: 14,
        paddingLeft: 4
      },
      discountStyle:{
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
      discountTextStyle:{
        marginLeft: 16,
        marginTop: 12,
        marginHorizontal: 4,
        color: colors.violetaPrimario,
        fontWeight: 'bold',
        fontSize: 16
      },
      eventDescription:{
        color: colors.violetaPrimario,
        marginHorizontal: 16,
        marginTop: 16,
        fontSize: 16
      },
      priceTextStyle:{
        marginLeft: 16,
        marginTop: 8,
        color: colors.violetaPrimario,
        fontWeight: 'bold',
        fontSize: 16
      },
      discountContainer:{
        flexDirection: 'row'
      },
      priceContainer:{
        flexDirection: 'row'
      },
      addToCardButton:{
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
      addToCardButton2:{
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
      addToCardText:{
        color: colors.blanco,
        fontFamily: 'PressStart',
        fontSize: 12,
        alignSelf: 'center',
      },
      addToCardText2:{
        color: colors.blanco,
        fontFamily: 'PressStart',
        fontSize: 12,
        alignSelf: 'center',
        paddingTop: 4
      },
      dateStyle:{
        color: colors.violetaPrimario,
        marginLeft: 2,
        marginTop: 2,
      },
      dateTextStyle:{
        marginLeft: 16,
        color: colors.violetaPrimario,
        fontWeight: 'bold',
        fontSize: 16,
      },
      dateContainer:{
        flexDirection: 'row'
      },
      tagsStyle:{
        alignItems: 'center',
        color: colors.violetaSecundario,
        fontSize: 16,
        fontStyle: 'italic'
      },
      tagsStyleDirection:{
        flexDirection: 'row',
        gap: 16,
        marginLeft: 16,
        marginBottom: 16
      },

})