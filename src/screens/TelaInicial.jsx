import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import images from "../constants/Images";
import { useEffect } from "react";
import { getDataLocal } from "../services/LocalStorage";

function TelaInicial({ navigation }) {
  function Login() {
    navigation.navigate("Login");
  }

  useEffect(() => {
    const buscaDados = async () => {
      if ((await getDataLocal("email")) != null) {
        navigation.navigate("Login");
      }
    };
    buscaDados();
  }, []);

  return (
    <ImageBackground
      source={images.imagemFundoTelaInicial}
      style={styles.imagemFundo}
    >
      <StatusBar style="light" />
      <Text style={styles.textoCabecalho}>DevInSchool</Text>
      <TouchableOpacity
        onPress={() => {
          Login();
        }}
        style={styles.botao}
      >
        <Text style={styles.textoBotao}>Procurar cursos</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imagemFundo: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
  textoCabecalho: {
    color: "white",
    fontSize: 60,
    fontWeight: 300,
  },
  botao: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 50,
    borderRadius: 25,
    height: 60,
    width: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textoBotao: {
    color: "#2F195F",
    fontSize: 20,
  },
});

export default TelaInicial;
