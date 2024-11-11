import { StyleSheet, Text, FlatList, Image, Pressable, useWindowDimensions } from 'react-native';
//import categories from "../data/categories.json";
import CardGeneral from '../components/CardGeneral.jsx';
import { colors } from '../global/colors.js';
import { useSelector } from 'react-redux';

const CategoriesScreen = ({ navigation }) => {

    const categories = useSelector(state=>state.shopSlice.value.categories)

    const {width, height} = useWindowDimensions()


    const renderCategoryItem = ({ item, index }) => {

        return (

            <Pressable onPress={()=>navigation.navigate('Eventos', item.title)}>

                <CardGeneral style={
                    index % 2 === 0 ? 
                    { ...styles.cardGeneralContainer, ...styles.row } 
                    : 
                    { ...styles.cardGeneralContainer, ...styles.rowReverse }
                    }>

                    <Image
                        source={{ uri: item.image }}
                        style={ styles.image }
                        resizeMode='contain'
                    />

                    <Text style={styles.categoryTitle}>{item.title}</Text>

                </CardGeneral>

            </Pressable>
        )
    }

    return (
        <>

            <Text style={styles.subtitle}>Bienvenid@s a la única App de Argentina de búsqueda y compra de tickets de eventos y locales del universo geek!!  </Text>
            <FlatList
                data={categories}
                keyExtractor={item => item.id.toString()}
                renderItem={renderCategoryItem}
            />
        </>
    );
}

export default CategoriesScreen;

const styles = StyleSheet.create({


    subtitle:{
        color: colors.violetaPrimario,
        fontSize: 18,
        fontWeight: '600',
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    cardGeneralContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 24,
    },
    image: {
        width: 64,
        height: 52,
    },
    categoryTitle: {
        fontFamily: 'PressStart',
        fontSize: 11,
        color: colors.violetaPrimario,
    },
    row: {
        flexDirection: "row",
    },
    rowReverse: {
        flexDirection: "row-reverse",
    },
});
