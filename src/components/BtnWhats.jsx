import { TouchableOpacity, StyleSheet, Image, Linking } from "react-native";
import { colors } from "../global/colors";

const BtnWhats = () => {
    const phoneNumber = "541132061481";
    const message = "Hola, me gustaría realizar una consulta";

    const openWhatsApp = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        Linking.openURL(url).catch(() => {
            alert("Asegúrate de tener WhatsApp instalado.");
        });
    };

    return (
        <TouchableOpacity style={styles.floatingButton} onPress={openWhatsApp}>
            <Image
                source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png",
                }}
                style={styles.whatsappLogo}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    floatingButton: {
        position: "absolute",
        width: 44,
        height: 44,
        bottom: 16,
        right: 16,
        backgroundColor: "#25D366",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    whatsappLogo: {
        width: 32,
        height: 32,
    },
});

export default BtnWhats;
