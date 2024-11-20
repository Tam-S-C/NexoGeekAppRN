import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../global/colors';
import { setProfilePicture } from '../features/auth/authSlice';
import { usePutProfilePictureMutation } from '../services/userService';
import { usePutNickNameMutation, usePutEdadMutation, usePutCiudadMutation } from '../services/userService';
import { updateNickName, updateEdad, updateCiudad } from '../features/auth/authSlice'; 
import { useGetNickNameQuery,useGetEdadQuery, useGetCiudadQuery } from '../services/userService';
import { updateProfile } from '../features/auth/authSlice';
import EditModal from '../components/EditModal';
import CameraIcon from '../components/CameraIcon';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';


const ProfileScreen = () => {
    const token = useSelector((state) => state.authReducer.value.token);
    const user = useSelector((state) => state.authReducer.value.email);
    const image = useSelector((state) => state.authReducer.value.profilePicture);
    const localId = useSelector((state) => state.authReducer.value.localId);
    const nickName = useSelector((state) => state.authReducer.value.nickName);
    const edad = useSelector((state) => state.authReducer.value.edad);
    const ciudad = useSelector((state) => state.authReducer.value.ciudad);

    const dispatch = useDispatch()

    const [triggerPutProfilePicture, result] = usePutProfilePictureMutation()
    const [triggerPutNickName] = usePutNickNameMutation();
    const [triggerPutEdad] = usePutEdadMutation();
    const [triggerPutCiudad] = usePutCiudadMutation();

    const [modalVisible, setModalVisible] = useState(false);
    const [editingField, setEditingField] = useState(null);

    const { data: nickNameData } = useGetNickNameQuery(localId);
    const { data: edadData } = useGetEdadQuery(localId);
    const { data: ciudadData } = useGetCiudadQuery(localId);

    useEffect(() => {
        if (nickNameData || edadData || ciudadData) {
          dispatch(
            updateProfile({
              nickName: nickNameData?.nickName || null,
              edad: edadData?.edad || null,
              ciudad: ciudadData?.ciudad || null,
            })
          );
        }
      }, [nickNameData, edadData, ciudadData, dispatch]);

    const [formData, setFormData] = useState({ nickName, edad, ciudad });

    const saveProfileField = (value) => {
        switch (editingField) {
          case "nickName":
            triggerPutNickName({ localId, nickName: value });
            dispatch(updateNickName(value));
            break;
          case "edad":
            triggerPutEdad({ localId, edad: value });
            dispatch(updateEdad(value));
            break;
          case "ciudad":
            triggerPutCiudad({ localId, ciudad: value });
            dispatch(updateCiudad(value));
            break;
          default:
            break;
        }
    };
    

    const openModal = (field) => {
        setEditingField(field);
        setModalVisible(true); 
      };
      
    const verifyCameraPermissions = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync()
        if (!granted) return false
        return true
    }

    const pickImage = async () => {
        const permissionOk = await verifyCameraPermissions()
        if (permissionOk) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                base64: true,
                quality: 0.5
            })
            if (!result.canceled) {
                dispatch(setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`))
                triggerPutProfilePicture({ image: `data:image/jpeg;base64,${result.assets[0].base64}`, localId })
            }
        } else {
        }
    }


    //Verificacion de user, sino bloquea la sección
    if (!token) {
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
                <View style={styles.profileField}>
                    <Text style={styles.textField}>Nickname: {nickName || "Completar"}</Text>
                    <Icon
                        name="pencil-alt"
                        size={20}
                        onPress={() => openModal("nickName")}
                        color={colors.fucsiaAcento}
                        marginLeft= {8}
                    />
                </View>

                <View style={styles.profileField}>
                    <Text style={styles.textField}>Edad: {edad || "Completar"}</Text>
                    <Icon
                        name="pencil-alt"
                        size={20}
                        onPress={() => openModal("edad")}
                        color={colors.fucsiaAcento}
                        marginLeft= {8}
                    />
                </View>

                <View style={styles.profileField}>
                    <Text style={styles.textField}>Ciudad: {ciudad || "Completar"}</Text>
                    <Icon
                        name="pencil-alt"
                        size={20}
                        onPress={() => openModal("ciudad")}
                        color={colors.fucsiaAcento}
                        marginLeft= {8}
                    />
                </View>

                <EditModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSave={saveProfileField}
                    initialValue={formData[editingField]}
                    field={editingField}
                />
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
        paddingVertical: 32,
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
    },
    profileField: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 24,
      },
      textField:{
        color: colors.violetaPrimario,
        fontSize: 18
      }
});
