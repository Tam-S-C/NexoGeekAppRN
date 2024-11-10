import { StyleSheet, Text, View, Pressable, Image, useWindowDimensions } from 'react-native'
import { colors } from '../global/colors'
import Icon from 'react-native-vector-icons/FontAwesome5';
import events from '../data/events.json'
import { useEffect, useState } from 'react';


const OneEventScreen = ({ route, navigation }) => {
  
    const [eventFound, setEventFound] = useState({})

    const eventId = route.params || "";

    const {width, height} = useWindowDimensions()
  
    useEffect(()=>{
        setEventFound(events.find(ev => ev.id === eventId))
    },[eventId])
  
    return (
    <View>

        <View style={styles.backTitleContainer}>

          <Pressable onPress={()=>navigation.goBack()}>
            <Icon style={styles.backArrow} name="angle-left" size={24} color={colors.fucsiaAcento}/> 
          </Pressable>

          <Text style={styles.eventSelected}>{eventFound.title}</Text>

        </View>

        <Image
          source = {{uri: eventFound.mainImage}}
          alt = {eventFound.title}
          width = '100%'
          height={width*0.5}
          resizeMode='contain'
          marginTop= {16}

        />


              <Text style={styles.eventDescription}>{eventFound.description}</Text>
              
              <Text style={styles.dateStyle}>{eventFound.dateAndPlace}</Text>
              
              {   
                eventFound.stock > 0 ?
                <Text style={styles.stockStyle} >Stock: {eventFound.stock} </Text>
                : 
                <Text style={styles.stockStyle2} >AGOTADO </Text>
              }
              
              <View style={styles.discountContainer}>
                <Text style={styles.discountTextStyle}>DESCUENTO: </Text>
                <Text style={styles.discountStyle}>{eventFound.discount}</Text>
              </View>
              
              <View style={styles.priceContainer}>
                <Text style={styles.priceTextStyle}>PRECIO: </Text>
                <Text style={styles.priceStyle}>${eventFound.price}</Text>
              </View>
              
              { 
                eventFound.stock > 0 ?
                <Pressable style={styles.addToCardButton}>
                  <Text style={styles.addToCardText}>Agregar Ticket al Carrito</Text>
                </Pressable>
                :
                <Pressable style={styles.addToCardButton2}>
                  <Text style={styles.addToCardText2}>Evento Sin Stock</Text>
                </Pressable>
              }
    </View>
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
        paddingTop: 6,
        color: colors.violetaPrimario
      },
      stockStyle:{
        color: colors.violetaPrimario,
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        marginBottom: 16
      },
      stockStyle2:{
        color: colors.fucsiaAcento,
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        marginBottom: 16
      },
      priceStyle:{
        color: colors.violetaPrimario,
        fontSize: 14,
        fontFamily: 'PressStart',
        paddingTop: 22,
        paddingLeft: 4
      },
      discountStyle:{
        backgroundColor: colors.violetaSecundario,
        fontWeight: 'bold',
        fontSize: 16,
        borderRadius: 100,
        padding: 12,
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
        padding: 16,
        fontSize: 16,
      },
      priceTextStyle:{
        marginLeft: 16,
        marginTop: 16,
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
        backgroundColor: colors.violetaPrimario,
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
        backgroundColor: colors.fucsiaAcento,
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
        paddingTop: 4
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
        marginLeft: 16,
        marginBottom: 16
      }

})