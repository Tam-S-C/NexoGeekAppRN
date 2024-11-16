import { StyleSheet, Text, FlatList, Image, Pressable, useWindowDimensions, ActivityIndicator } from 'react-native';
import CardGeneral from '../components/CardGeneral.jsx';
import { colors } from '../global/colors.js';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../features/shop/shopSlice.js';
import { useGetCategoriesQuery } from '../services/shopService';

const CategoriesScreen = ({ navigation }) => {

    const { data: categories, error, isLoading } = useGetCategoriesQuery()

    const dispatch = useDispatch()

    const renderCategoryItem = ({ item, index }) => {

        return (

            <Pressable onPress={() => {
                dispatch(setCategory(item.title));
                navigation.navigate('Eventos');
              }}>

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
            {
                isLoading
                ?
                <ActivityIndicator size={80} color={colors.fucsiaAcento} style={styles.spinner} />
                :
                error
                ?
                <Text style={styles.errorText}>
                    Ha ocurrido un error al cargar las categorías, lo sentimos mucho 🙇‍♀️, prueba nuevamente.
                </Text>
                :
                <>
                    <Text style={styles.subtitle}>
                        Bienvenid@s a la única App de Argentina de búsqueda y compra de tickets de eventos y locales del universo geek!!  
                    </Text>

                    <FlatList
                        data={categories}
                        keyExtractor={item => item.id}
                        renderItem={renderCategoryItem}
                    />
                </>
            }

            
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
        fontSize: 12,
        color: colors.violetaPrimario,
    },
    row: {
        flexDirection: "row",
    },
    rowReverse: {
        flexDirection: "row-reverse",
    },
    spinner:{
        marginTop: 160
    },
    errorText:{
        fontSize: 18,
        color: colors.blanco,
        fontWeight: 'bold',
        backgroundColor: colors.fucsiaAcento,
        borderRadius: 16,
        padding: 24,
        marginHorizontal: 16,
        marginVertical: 64,
        textAlign: 'center'
    }
});
