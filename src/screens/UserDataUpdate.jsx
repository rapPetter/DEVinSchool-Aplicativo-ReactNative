import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import validarAlteracoes from "../utils/UserDataUpdate/ValidarAlteracoes";
import alertaDeErro from "../components/Common/AlertaDeErro";
import OlhoSenha from "../components/Common/OlhoSenha";
import Botao from "../components/Common/Botao";
import Header from "../components/Login/Header";
import { getDataLocal } from "../services/LocalStorage";
import api from "../services/api";
import * as ImagePicker from "expo-image-picker";

function UserDataUpdate({ navigation }) {
  const [usuario, setUsuario] = useState({
    id: "",
    nome: "",
    idade: "",
    senha: "",
  });

  useEffect(() => {
    getDataLocal("userId").then((id) => {
      getDataLocal("token").then((token) => {
        fetch(api + "/api/Usuario/" + id, {
          method: "GET",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            try {
              setUsuario({
                id: data.id,
                nome: data.nome,
                idade: data.idade.toString(),
                senha: data.senha,
              });
            } catch (e) {
              console.error(e);
            }
          })
          .catch((error) => console.error("Error:", error));
      });
    });
  }, []);

  const HomeTab = () => {
    navigation.goBack();
  };

  const [mensagemDeErro, setMensagemDeErro] = useState({
    id: "",
    mensagem: "",
  });

  const [showPassword, setShowPassoword] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#7353BA"} />
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={{ marginTop: -40 }}>
          <Header />
        </View>

        <Text style={styles.textoEscuro}>Nome</Text>
        <TextInput
          style={styles.input}
          selectionColor="#7353BA"
          maxLength={120}
          value={usuario.nome}
          onChangeText={(value) => {
            setUsuario({ ...usuario, nome: value });
          }}
        />
        {mensagemDeErro.id === 1 && alertaDeErro(mensagemDeErro.mensagem)}

        <Text style={styles.textoEscuro}>Idade</Text>
        <TextInput
          style={styles.input}
          selectionColor="#7353BA"
          keyboardType="number-pad"
          maxLength={3}
          value={usuario.idade}
          onChangeText={(value) => {
            setUsuario({ ...usuario, idade: value });
          }}
        />
        {mensagemDeErro.id === 3 && alertaDeErro(mensagemDeErro.mensagem)}

        <Text style={styles.textoEscuro}>Senha</Text>
        <View style={styles.senhaArea}>
          <TextInput
            style={styles.input}
            selectionColor="#7353BA"
            secureTextEntry={showPassword}
            maxLength={40}
            value={usuario.senha}
            onChangeText={(value) => {
              setUsuario({ ...usuario, senha: value });
            }}
          />
          <OlhoSenha variavel={showPassword} funcao={setShowPassoword} />
        </View>
        {mensagemDeErro.id === 5 && alertaDeErro(mensagemDeErro.mensagem)}

        <Botao
          texto="Salvar Dados"
          funcao={() => {
            validarAlteracoes(usuario, { setEstado: setMensagemDeErro });
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    paddingVertical: 20,
  },
  input: {
    width: "80%",
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#7353BA",
    paddingHorizontal: 10,
    fontSize: 18,
    marginBottom: 10,
    alignSelf: "center",
    color: "#0F1020",
  },
  senhaArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
    height: 40,
    marginBottom: 30,
  },
  textoEscuro: {
    color: "#7353BA",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginHorizontal: "10%",
    marginTop: 10,
  },
});

export default UserDataUpdate;
