import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../global/colors';
import { setProfilePicture } from '../features/auth/authSlice';
import { usePutProfilePictureMutation } from '../services/userService';
import CameraIcon from '../components/CameraIcon';
import * as ImagePicker from 'expo-image-picker';


const ProfileScreen = () => {
    const token = useSelector((state) => state.authReducer.value.token);
    const user = useSelector((state) => state.authReducer.value.email);
    const image = useSelector((state) => state.authReducer.value.profilePicture);
    const localId = useSelector((state) => state.authReducer.value.localId);

    const dispatch = useDispatch()

    const [triggerPutProfilePicture,result] = usePutProfilePictureMutation()

    const verifyCameraPermissions = async () => {
        const {granted} = await ImagePicker.requestCameraPermissionsAsync()
        if(!granted) return false
        return true
    }

    const pickImage = async () =>{
        const permissionOk = await verifyCameraPermissions()
        if(permissionOk){
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1,1],
                base64: true,
                quality: 0.5
            })
            if(!result.canceled){
                dispatch(setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`))
                triggerPutProfilePicture({image: `data:image/jpeg;base64,${result.assets[0].base64}`,localId})
            }
        }else{
        }
    }


    //Verificacion de user, sino bloquea la sección
    if (!token || !user || !localId) {
        return (
            <>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Esta sección es solo para usuarios registrados. Reinicia la app para registrarte y poder usar esta sección. Gracias.</Text>
                </View>

            </>
        );
    }


    return (
        <>
            <Text style={styles.cartScreenTitle}>Mi Perfil:</Text>
            <View style={styles.profileContainer}>
                <View style={styles.imageProfileContainer}>
                    {
                        image
                            ?
                            <Image source={{ uri: image }} resizeMode='cover' style={styles.profileImage} />
                            :
                            <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
                    }
                    <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }, styles.cameraIcon]} >
                        <CameraIcon />
                    </Pressable>
                </View>
                <Text style={styles.profileData}>Email: {user}</Text>
            </View>
        </>
    );
};


export default ProfileScreen;

const styles = StyleSheet.create({

    cartScreenTitle: {
        fontFamily: 'PressStart',
        color: colors.violetaPrimario,
        fontSize: 16,
        marginLeft: 24,
        marginTop: 12
    },
    errorContainer: {
        backgroundColor: colors.violetaPrimario,
        borderRadius: 16,
        padding: 24,
        marginHorizontal: 16,
        marginVertical: 64,
        textAlign: 'center'
    },
    errorText: {
        fontSize: 18,
        color: colors.blanco,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 16,
    },


    profileContainer: {
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageProfileContainer: {
        width: 160,
        height: 160,
        borderRadius: 128,
        backgroundColor: colors.violetaSecundario,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.violetaSombra,
        elevation: 4
    },
    textProfilePlaceHolder: {
        color: colors.blanco,
        fontSize: 60,
        fontWeight: 'bold'
    },
    profileData: {
        color: colors.violetaPrimario,
        paddingVertical: 16,
        fontSize: 18
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    }
});
