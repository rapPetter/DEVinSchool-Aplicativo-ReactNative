import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import api from "../services/api";
import Context from "../contexts/AuthContext";
import { useEffect, useState, useContext } from "react";
import { getDataLocal } from "../services/LocalStorage";
import { useIsFocused } from '@react-navigation/native'

export default function CursosRecentes() {
  const telaFocada = useIsFocused()
  const [cursoRecente, setCursosRecentes] = useState([]);
  const [flag, setFlag] = useState(true);


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
        try {
          const ultimas24 = 24 * 60 * 60 * 1000; 
          const dataFiltrada = data.filter((item) => {
            const dataItem = new Date(item.dataCursoSalvo).getTime();
            const dataAtual = new Date().getTime();
            return dataAtual - dataItem <= ultimas24;
          });
          setCursosRecentes(dataFiltrada.reverse());
        } catch (e) {
          console.error(e);
        }
      })
      .catch((error) => console.error("Error:", error));
  })});
}, [telaFocada]);

useEffect(() => {if(flag){renderizaLista(); setFlag(false)}}, [flag])

const voltar = () => {
  navigation.goBack();
};

const desfavoritar = (id) => {
  getDataLocal("token").then((token) => {
    fetch(api + "/api/CursoSalvo/" + id, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    })
  }).finally(() => setFlag(false));
  refazLista(id);
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
          console.log("RBEHJBRJWERJHGWEJHGRJWHGERJ"+data[0].statusCurso);
          setCursosRecentes(data)
        })
        .catch((error) => console.error("Error:", error))
    }).finally(() => setFlag(true));;
  });
}

  const toggleExpand = (id) => {
    setCursosRecentes(
      cursoRecente.map((curso) => {
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
       { cursoRecente.length > 0 ? (cursoRecente.map((curso) => (
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
                    <Text style={{textAlign:'justify', marginTop:10}}>Informação: {curso.informacao}</Text>
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
              <Text style={{ textAlign:'justify', fontSize: 20, marginTop:20}}>Desculpe, não foi encontrado nenhum curso salvo dentro de um prazo de 24 horas na lista. Por favor, adicione um curso para poder visualizá-lo aqui.</Text>
            </View>
          )
          }
    </>)
  }

  return (
    <View style={styles.caixa}>
      <StatusBar />
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Cursos Recentes</Text>
      </View>
      <View>
        <ScrollView style={{ padding: 10 }}>
          {renderizaLista()}
        </ScrollView>
      </View>
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
    marginLeft: 10,
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
