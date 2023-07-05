import { ScrollView, StyleSheet, TextInput, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { useState } from "react";
import validarRegistro from "../../utils/SignUp/ValidarRegistro";
import alertaDeErro from "../Common/AlertaDeErro";
import OlhoSenha from "../Common/OlhoSenha";
import Botao from "../Common/Botao";

function Cadastro({ setAlternarLoginSignUp }) {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    idade: "",
    CPF: "",
    senha: "",
    foto: "",
  });
  const [mensagemDeErro, setMensagemDeErro] = useState({
    id: "",
    mensagem: "",
  });
  const [mostrarSenha, setMostrarSenha] = useState(true);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setUsuario({ ...usuario, foto: result.assets[0].uri });
    }
  };

  return (
    <ScrollView style={styles.signUpView}>
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

      <Text style={styles.textoEscuro}>E-mail</Text>
      <TextInput
        style={styles.input}
        selectionColor="#7353BA"
        keyboardType="email-address"
        maxLength={30}
        value={usuario.email}
        onChangeText={(value) => {
          setUsuario({ ...usuario, email: value });
        }}
      />
      {mensagemDeErro.id === 2 && alertaDeErro(mensagemDeErro.mensagem)}

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

      <Text style={styles.textoEscuro}>CPF</Text>
      <TextInput
        style={styles.input}
        selectionColor="#7353BA"
        keyboardType="number-pad"
        maxLength={14}
        value={usuario.CPF}
        onChangeText={(value) => {
          setUsuario({ ...usuario, CPF: value });
        }}
      />
      {mensagemDeErro.id === 4 && alertaDeErro(mensagemDeErro.mensagem)}

      <Text style={styles.textoEscuro}>Senha</Text>
      <View style={styles.senhaArea}>
        <TextInput
          style={styles.input}
          selectionColor="#7353BA"
          secureTextEntry={mostrarSenha}
          maxLength={40}
          value={usuario.senha}
          onChangeText={(value) => {
            setUsuario({ ...usuario, senha: value });
          }}
        />
        <OlhoSenha variavel={mostrarSenha} funcao={setMostrarSenha} />
      </View>
      {mensagemDeErro.id === 5 && alertaDeErro(mensagemDeErro.mensagem)}

      <Botao
        texto="Foto de Perfil"
        funcao={() => {
          pickImage();
        }}
      />
      <Botao
        texto="Cadastrar"
        funcao={() => {
          validarRegistro(
            usuario,
            { setEstado: setMensagemDeErro },
            setAlternarLoginSignUp
          );
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  abasView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
    height: 45,
    marginTop: 10,
    marginBottom: 15,
  },

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

  loginTouchable: {
    marginHorizontal: "8%",
  },

  senhaArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
    height: 40,
    marginBottom: 10,
  },

  signUpView: {
    width: "100%",
  },

  textoBotaoCadastrar: {
    fontSize: 25,
    color: "#F1F1F1",
  },

  textoBotaoFotoPerfil: {
    fontSize: 25,
    color: "#F1F1F1",
  },

  textoEscuro: {
    color: "#7353BA",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginHorizontal: "10%",
    marginTop: 10,
  },

  textoLogin: {
    fontSize: 22,
    color: "#7353BA",
  },
});

export default Cadastro;
