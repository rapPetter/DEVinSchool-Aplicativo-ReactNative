import React, { useState, useEffect, useContext } from "react";
import {
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  SafeAreaView,
  Animated,
  Text,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import Cadastro from "../components/Login/Cadastro";
import { Ionicons } from "@expo/vector-icons";
import validarLogin from "../utils/Login/ValidarLogin";
import alertaDeErro from "../components/Common/AlertaDeErro";
import Context from "../contexts/AuthContext";
import Header from "../components/Login/Header";
import OlhoSenha from "../components/Common/OlhoSenha";
import AbaLoginSignUp from "../components/Login/AbaLoginSignUp";
import Botao from "../components/Common/Botao";
import { getDataLocal } from "../services/LocalStorage";
import api from "../services/api";
const useKeyboardEvent = (showCallback, hideCallback) => {
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      showCallback
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      hideCallback
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
};

export function Login({ navigation }) {
  const { context, setContext } = useContext(Context);

  const [inputEmail, setInputEmail] = useState("");

  const [inputPassword, setInputPassword] = useState("");

  const [showPassword, setShowPassword] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  const [emailModal, setEmailModal] = useState("");

  const [errorMessage, setErrorMessage] = useState({
    id: "",
    mensagem: "",
  });
  const [alternarLoginSignUp, setAlternarLoginSignUp] = useState(true);

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 90 }));
  const [logo] = useState(new Animated.ValueXY({ x: 150, y: 150 }));

  function navigateToHome() {
    navigation.navigate("Home");
  }

  useKeyboardEvent(keyboardDidShow, keyboardDidHide);
  useEffect(() => {
    Animated.spring(offset.y, {
      toValue: 0,
      speed: 5,
      bounciness: 10,
      useNativeDriver: true,
    }).start();
  }, []);

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 50,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 50,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 150,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 150,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  function requisicaoSenha() {
    fetch(api + "/api/Usuario/recuperaUsuario?email=" + emailModal, {
      method: "POST",
      headers: {
        Accept: "*/*",
      },
    })
      .then((response) => response.json())
      .then(() => {
        setModalVisible(false);
        Alert.alert(
          "",
          "Um e-mail com o link para alterar sua senha foi enviado"
        );
      })
      .catch((error) => console.error("Error:", error));
  }

  useEffect(() => {
    const buscaDados = async () => {
      const dados = await getDataLocal("email");
      if (dados != null) {
        setInputEmail(dados);
        setEmailModal(dados);
      }
    };
    buscaDados();
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar backgroundColor={"#7353BA"} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Header />
        <AbaLoginSignUp
          alternarLoginSignUp={alternarLoginSignUp}
          setAlternarLoginSignUp={setAlternarLoginSignUp}
        />

        {alternarLoginSignUp ? (
          <Animated.View
            style={[
              styles.container,
              {
                transform: [{ translateY: offset.y }],
              },
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={inputEmail}
              onChangeText={setInputEmail}
            />

            <View style={styles.inputArea}>
              <TextInput
                style={styles.inputSenha}
                placeholder="Senha"
                secureTextEntry={showPassword}
                value={inputPassword}
                onChangeText={(password) => setInputPassword(password)}
              />
              <OlhoSenha variavel={showPassword} funcao={setShowPassword} />
            </View>

            {errorMessage.id === 1 && alertaDeErro(errorMessage.mensagem)}
            {errorMessage.id === 2 && alertaDeErro(errorMessage.mensagem)}
            {errorMessage.id === 3 && alertaDeErro(errorMessage.mensagem)}
            {errorMessage.id === 4 && alertaDeErro(errorMessage.mensagem)}

            <TouchableOpacity
              style={styles.resetarSenha}
              onPress={() => setModalVisible(true)}
            >
              <Text>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Esqueci minha senha</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <Text>
                  Por favor digite o email que voce deseja recuperar a senha.
                </Text>
                <View style={styles.modalBody}>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Digite seu email"
                    onChangeText={(text) => setEmailModal(text)}
                    value={emailModal}
                  />
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={requisicaoSenha}
                  >
                    <Text style={styles.modalButtonText}>Enviar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.containerBotao}>
              <Botao
                texto="Entrar"
                funcao={() => {
                  validarLogin(
                    navigation,
                    inputEmail,
                    inputPassword,
                    { setEstado: setErrorMessage },
                    setContext
                  );
                }}
              />
              <TouchableOpacity
                style={styles.texto}
                onPress={() => {
                  setAlternarLoginSignUp(false);
                }}
              >
                <Text>Abrir conta gratuita</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ) : (
          <Cadastro setAlternarLoginSignUp={setAlternarLoginSignUp} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },

  scroll: {
    width: "100%",
  },

  containerBotao: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },

  texto: {
    marginTop: 10,
    fontSize: 18,
    color: "#F1F1F1",
    marginBottom: 20,
  },
  resetarSenha: {
    width: "90%",
    alignItems: "flex-end",
    marginTop: 20,
    justifyContent: "flex-end",
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

  inputArea: {
    width: "90%",
    height: 50,
    backgroundColor: "white",
    textAlign: "left",
    borderRadius: 10,
    color: "black",
    fontSize: 15,
    margin: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  inputSenha: {
    width: "85%",
    height: 50,
    padding: 8,
    fontSize: 18,
  },

  textoDeErro: {
    fontSize: 18,
    color: "red",
  },

  background: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    width: "90%",
    height: 50,
    padding: 8,
    fontSize: 18,
    backgroundColor: "#FFF",
    marginBottom: 10,
    fontSize: 18,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 100,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%",
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#7353BA",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Login;
