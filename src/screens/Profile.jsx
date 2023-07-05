import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView
} from "react-native";
import api from "../services/api";
import { useEffect, useState } from "react";
import Botao from "../components/Common/Botao";
import { clearDataLocal, getDataLocal } from "../services/LocalStorage";
import { useIsFocused } from '@react-navigation/native'


import { Octicons } from "@expo/vector-icons";

export default function Profile({ navigation }) {
  const telaFocada = useIsFocused()
  const [usuario, setUsuario] = useState({});
  const [cursoSalvo, setCursoSalvo] = useState({})

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
            console.log(data);
            try {
              setUsuario(data);
            } catch (e) {
              console.error(e);
            }
          })
          .catch((error) => console.error("Error:", error));
          fetch(api + "/api/CursoSalvo/" + id, {
            method: "GET",
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              try {
                setCursoSalvo(data);
              } catch (e) {
                console.error(e);
              }
            })
            .catch((error) => console.error("Error:", error));
      });
    });
  }, [telaFocada]);

  const UpdateProfile = () => {
    navigation.navigate("UserDataUpdate");
  };

  function SairDoApp() {
    navigation.navigate("TelaInicial");
    clearDataLocal();
  }

  function AdicionarMaisCursos() {
    navigation.navigate("Home");
  }
  function MostrarListaCompleta() {
    navigation.navigate("Cursos Favoritos");
  }
  return (
    <SafeAreaView style={styles.recepienteGeral}>
      <StatusBar />
      <View style={styles.cabecalho}>
      <Text style={styles.tituloPrimario}>Meu perfil</Text>
      </View>
      <View>
        <Text style={styles.titulo}>Informações</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={UpdateProfile}>
          <View style={styles.cartaoPerfil} key={usuario.id}>
            <Image
              source={{ uri: usuario.foto }}
              style={styles.fotoUsuario}
              resizeMode="contain"
            />
            <View>
            <Text style={styles.nomeUsuarioPerfil}>{usuario.nome}</Text>
                <Text style={styles.informacaoUsuarioPerfil}>
                Email:  {usuario.email}
                </Text>
                <Text style={styles.informacaoUsuarioPerfil}>
                 Idade: {usuario.idade}
                </Text>
                <Text style={styles.informacaoUsuarioPerfil}>
                 CPF: {usuario.cpf}
                </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.titulo}>Cursos Salvos</Text>
        <View style={styles.cartaoCursos}>
          {cursoSalvo.length > 0 ? (cursoSalvo.slice(0, 3).map((Cursos) => (
            <View style={styles.recipienteCursos} key={Cursos.id}>
              <Image
                source={{ uri: Cursos.link }}
                style={styles.imagemCurso}
                resizeMode="contain"
              />
              <Text style={styles.nomeCurso}>{Cursos.nome}</Text>
            </View>
          ))):
          (
            <View  style={{ flexDirection: "row",margin:10, padding:10, justifyContent:'center', alignItems:'center',}}>
               <Octicons  name="log" size={48} color="#7353BA" />
              <Text style={{...styles.nomeCurso, textAlign:'justify', fontSize: 20}}>Desculpe, não foi encontrado nenhum curso salvo na lista. Por favor, adicione um curso para poder visualizá-lo aqui.</Text>
            </View>
          )}
          {cursoSalvo.length > 0 &&
            <TouchableOpacity
            style={styles.botaoListaCompleta}
            onPress={MostrarListaCompleta}>
            <Text style={{color: "#FFF"}}>Lista completa</Text>
          </TouchableOpacity>
          }
 
        </View>
      </View>
      <View>
      <TouchableOpacity style={styles.botaoAdicionarCurso}
      onPress={AdicionarMaisCursos}
      >
        <Octicons  name="plus-circle" size={48} color="#FFF" />
        </TouchableOpacity>
        <Botao
          texto="Atualizar Dados"
          funcao={() => {
            UpdateProfile();
          }}
        />
        <View style={{ marginBottom: 20 }}>
          <Botao
            texto="Sair do app"
            funcao={() => {
              SairDoApp();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: "1%",
  },
  tituloPrimario: {
    color: "#0f1020",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  recepienteGeral: {
    backgroundColor: "#f1f1f1",
    flex: 1,
    justifyContent: "space-around",
    marginTop: 20,
  },
  titulo: {
    color: "#0f1020",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10,
  },
  cartaoPerfil: {
    backgroundColor: "#FFF",
    width: "90%",
    marginLeft: 20,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20,
    padding: 5,
    marginBottom: 10,
  },
  nomeUsuarioPerfil: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  informacaoUsuarioPerfil: {
    fontSize: 15,
    marginBottom: 5,
  },
  fotoUsuario: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 10,
    flexShrink: 1,
  },
  nomeCurso: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  imagemCurso: {
    width: 42,
    height: 42,
    borderRadius: 30,
  },
  cartaoCursos: {
    backgroundColor: "#FFF",
    width: "90%",
    marginLeft: 20,
    justifyContent: "center",
    borderRadius: 20,
    padding: 5,
    marginBottom: "5%",
  },
  recipienteCursos: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
    marginLeft: "20%",
    marginRight: "20%",
  },
  botaoListaCompleta: {
    width: 130,
    height: 30,
    backgroundColor: "#7353BA",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    position: "absolute",
    bottom: -10,
  },
  botaoAdicionarCurso: {
    width: 48,
    height: 48,
    borderRadius: 30,
    backgroundColor: "#7353BA",
    alignSelf: "flex-end",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "6%",
    marginTop: 30,
  },
  textoBotao: {
    fontSize: 30,
    color: "#FFF",
    textAlign: "center",
  },
});
