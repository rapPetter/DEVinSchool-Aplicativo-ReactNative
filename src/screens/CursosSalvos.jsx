import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Alert
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getDataLocal } from "../services/LocalStorage";
import api from "../services/api";
import { useIsFocused } from '@react-navigation/native'

export default function CursosSalvos() {
  const telaFocada = useIsFocused()
  const [cursosFavoritos, setCursosFavoritos] = useState([]);
  const [flag, setFlag] = useState(true);

  const voltar = () => {
    navigation.goBack();
  };


  const desfavoritar = (id) => {
    Alert.alert(
      'Tem certeza?',
      'Deseja realmente remover este curso salvo?',
      [
        { text: 'Cancelar', onPress: () => { }, style: 'cancel' },
        {
          text: 'Sim', onPress: () => {
            getDataLocal("token").then((token) => {
              fetch(api + "/api/CursoSalvo/" + id, {
                method: "DELETE",
                headers: {
                  accept: "*/*",
                  Authorization: `Bearer ${token}`,
                },
              })
            }).finally(() => setFlag(false));
            refazLista();
          }
        }
      ]
    );


  };

  const refazLista = () => {
    getDataLocal("userId").then((id) => {
      getDataLocal("token").then((token) => {
        fetch(api + "/api/CursoSalvo/" + id, {
          method: "GET",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setCursosFavoritos(data);
          })
          .catch((error) => console.error("Error:", error))
      }).finally(() => setFlag(true));
    });
  }

  const toggleExpand = (id) => {
    setCursosFavoritos(
      cursosFavoritos.map((curso) => {
        if (curso.id === id) {
          return { ...curso, expanded: !curso.expanded };
        } else {
          return curso;
        }
      })
    );
  };

  const renderizaLista = () => {
    return (<>
       {cursosFavoritos.length > 0 ?  (cursosFavoritos.map((curso) => (
            <TouchableOpacity
              key={curso.id}
              style={styles.recipienteCurso}
              onPress={() => toggleExpand(curso.id)}
            >
              <Image
                source={{ uri: curso.link }}
                style={styles.imagemCurso}
                resizeMode="contain"
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.nomeCurso}>{curso.nome}</Text>
                {curso.expanded && (
                  <View>
                    <Text>{curso.descricao}</Text>
                    <Text style={{textAlign:'justify',marginTop:10}}>Informação: {curso.informacao}</Text>
                    <Text style={{marginTop:10}}>Carga horária: {curso.cargaHoraria}</Text>
                    <Text style={{textAlign:'justify',marginTop:10}}>Resumo: {curso.resumo}</Text>
                  </View>
                )}
              </View>
              <TouchableOpacity onPress={() => desfavoritar(curso.id)}>
                <Octicons name="heart-fill" size={24} color="#7353BA" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))):
          (
            <View  style={{ flexDirection: "column",margin:10, padding:10, justifyContent:'center', alignItems:'center',}}>
            <Octicons  name="log" size={48} color="#7353BA" />
           <Text style={{ textAlign:'justify', fontSize: 20 , marginTop: 20}}>Desculpe, não foi encontrado nenhum curso salvo na lista. Por favor, adicione um curso para poder visualizá-lo aqui.</Text>
            </View>
          ) 
        }
    </>)
  }

  useEffect(() => {
    getDataLocal("userId").then((id) => {
      getDataLocal("token").then((token) => {
        fetch(api + "/api/CursoSalvo/" + id, {
          method: "GET",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setCursosFavoritos(data)
          })
          .catch((error) => console.error("Error:", error))
      });
    });
  }, [telaFocada])

  useEffect(() => { if (flag) { renderizaLista(); setFlag(false) } }, [flag])

  return (
    <View style={styles.caixa}>
      <StatusBar />
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Cursos Favoritados</Text>
      </View>
      <SafeAreaView>
        <ScrollView style={{ padding: 10, maxHeight: "90%" }}>
          {renderizaLista()}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  caixa: {
    backgroundColor: "#f1f1f1",
    flex: 1,
    justifyContent: "flex-start",
  },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: "5%",
  },
  titulo: {
    color: "#0f1020",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  nomeCurso: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10
  },
  imagemCurso: {
    width: 42,
    height: 42,
    borderRadius: 30,
  },
  recipienteCurso: {
    backgroundColor: "#FFF",
    marginRight: "5%",
    marginLeft: "5%",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    padding: 5,
    marginBottom: "5%",
    flexDirection: "row",
  },
});
