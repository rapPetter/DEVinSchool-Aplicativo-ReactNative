import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet } from "react-native"

function alertaDeErro(mensagem) {
    return (
        <View style={styles.viewDeErro}>
            <Icon
                name="alert-circle-outline"
                size={26}
                color="red"
                style={{ alignSelf: "flex-start" }}
            />
            <Text style={styles.textoDeErro}>{mensagem}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    textoDeErro: {
        fontSize: 18,
        color: "red",
    },

    viewDeErro: {
        flexDirection: "row",
        width: "80%",
        marginHorizontal: 10,
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 5,
    },

})

export default alertaDeErro;