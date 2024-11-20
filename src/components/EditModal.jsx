import { Modal, View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { colors } from "../global/colors";

const EditModal = ({ visible, onClose, onSave, initialValue, field }) => {
    const [value, setValue] = useState(initialValue);

    const handleSave = () => {
        onSave(value);
        onClose();
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Editar {field}:</Text>
                    <TextInput
                        style={styles.modalInput}
                        value={value}
                        onChangeText={setValue}
                    />
                    <View style={styles.modalButtons}>
                        <Pressable style={styles.cerrarBtn} onPress={onClose}>
                            <Text style={styles.textBtn}> Cerrar </Text> 
                        </Pressable>
                        <Pressable style={styles.guardarBtn} onPress={handleSave}>
                            <Text style={styles.textBtn}> Guardar </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "72%",
        height: 156,
        padding: 16,
        backgroundColor: colors.blanco,
        borderRadius: 16,
    },
    modalTitle: {
        fontSize: 14,
        marginBottom: 4,
        color: colors.violetaPrimario,
        fontFamily: 'PressStart',
    },
    modalInput: {
        borderBottomWidth: 1,
        borderColor: colors.fucsiaAcento,
        marginBottom: 16,
        padding: 8,
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cerrarBtn: {
        backgroundColor: colors.fucsiaAcento,
        color: colors.blanco,
        borderRadius: 16,
        shadowColor: colors.fucsiaSombra,
        elevation: 4,
        width: "40%",
        height: 40,
    },
    guardarBtn: {
        backgroundColor: colors.violetaPrimario,
        borderRadius: 16,
        shadowColor: colors.violetaPrimario,
        elevation: 4,
        width: "40%",
        height: 40
    },
    textBtn:{
        color: colors.blanco,
        textAlign: 'center',
        padding: 8,
        fontWeight: 'bold',
        fontSize: 16  
    }
});

export default EditModal;
