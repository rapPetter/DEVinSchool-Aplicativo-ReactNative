import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import api from "../services/api";
import Botao from "../components/Common/Botao";
import { getDataLocal } from "../services/LocalStorage";
import FavoritarDesfavoritar from "../components/Common/FavoritarDesfavoritar";

function Course({ route }) {
  const { id } = route.params;

  const [curso, setCurso] = useState({});

  const [categoria, setCategoria] = useState({});

  const [cursoSalvo, setCursoSalvo] = useState(true);

  useEffect(() => { getCursoSalvo() }, [])

  function getCursoSalvo() {
    getDataLocal("userId").then((userId) => {
      getDataLocal("token").then((token) => {
        fetch(api + `/api/CursoSalvo/?cursoId=${id}&usuarioId=${userId}`, {
          method: "GET",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              setCursoSalvo(false)
            }
            else {
              setCursoSalvo(true)
            }

          })
          .catch((error) => console.error("Error:", error))
      })
    });

  }


  function salvarDessalvar() {
    if (cursoSalvo === true) {
      getDataLocal("userId").then((usuarioId) => {
        getDataLocal("token").then((token) => {
          fetch(api + "/api/CursoSalvo", {
            method: "POST",
            headers: {
              accept: "/",
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json-patch+json",
            },
            body: JSON.stringify({
              usuarioId: usuarioId,
              cursoId: id
            }),
          });
        })
      })
        .then(() => { alert("Curso salvo!") })
        .catch((error) => console.error("Error:", error));

    }

    else {
      getDataLocal("userId").then((userId) => {
        getDataLocal("token").then((token) => {
          fetch(api + `/api/CursoSalvo/?cursoId=${id}&usuarioId=${userId}`, {
            method: "GET",
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              const registro = data[0].id
              getDataLocal("token").then((token) => {
                fetch(api + "/api/CursoSalvo/" + registro, {
                  method: "DELETE",
                  headers: {
                    accept: "*/*",
                    Authorization: `Bearer ${token}`,
                  },
                })
              })
            })
        })

      })

        .then(() => { alert("Curso deletado da lista de salvos.") })
        .catch((error) => console.error("Error:", error));

    }

  }

  useEffect(() => {
    getDataLocal("token").then((token) => {
      fetch(api + "/api/Curso/" + id, {
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
            setCurso(data);
          } catch (e) {
            console.error(e);
          }
        })
        .catch((error) => console.error("Error:", error));

      fetch(api + "/api/CategoriaCurso/" + id, {
        method: "GET",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          try {
            setCategoria(data);
          } catch (e) {
            console.error(e);
          }
        })
        .catch((error) => console.error("Error:", error));
    });
  }, []);

  const navigation = useNavigation();


  const acessar = () => {
    // implementação do acesso ao curso
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <ScrollView>
          <View style={styles.view}>
            <Image style={styles.imagem} source={{ uri: curso.link }} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.titulo}>{curso.nome}</Text>
              <TouchableOpacity>
                <FavoritarDesfavoritar variavel={cursoSalvo} funcao={setCursoSalvo} salvarDessalvar={salvarDessalvar} />
              </TouchableOpacity>
            </View>

            <Text style={styles.categoria}>{categoria.titulo}</Text>
          </View>
          <View>
            <Text style={styles.textoView}>Informações</Text>
            <Text style={styles.info}>{curso.informacao}</Text>
            <Text style={styles.textoView}>Resumo</Text>
            <Text style={styles.resumo}>{curso.resumo}</Text>
            <Text style={styles.duracao}>
              Duração: {curso.cargaHoraria} horas
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.view}>
        <Botao texto="Acessar curso" funcao={acessar} />
      </View>
      <StatusBar backgroundColor={"#7353BA"} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 34,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  categoria: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 16,
    color: "#7353BA",
  },
  info: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 16,
  },
  resumo: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 16,
  },
  duracao: {
    fontSize: 16,
    padding: 16,
  },
  botaoAcesso: {
    backgroundColor: "#7353BA",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: 280,
    height: 60,
  },
  textoView: {
    fontSize: 18,
    paddingLeft: 16,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
  },
  imagem: {
    width: 280,
    height: 250,
    borderRadius: 40,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Course;
