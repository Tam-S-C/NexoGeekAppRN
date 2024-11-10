import { StyleSheet, Text, View, Pressable } from 'react-native'
import { colors } from '../global/colors'
import Icon from 'react-native-vector-icons/FontAwesome5';
import events from '../data/events.json'
import { useEffect, useState } from 'react';


const OneEventScreen = ({ route, navigation }) => {
  
    const [eventFound, setEventFound] = useState({})

    const eventId = route.params || "";
  
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

        <Text>{eventId}</Text>

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
      }

})