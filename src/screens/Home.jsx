import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Text,
  StatusBar,
} from "react-native";
import BarraPesquisa from "../components/Home/BarraPesquisa";
import Categoria from "../components/Home/Categoria";
import CardHome from "../components/Home/CardHome";
import CardList from "../components/CourseList/CardList";
import api from "../services/api";
import { getDataLocal } from "../services/LocalStorage";

function Home() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState(1);
  const [cursos, setCursos] = useState([]);
  const [procuraCursos, setProcuraCursos] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleCategoriaSelecionada = (id) => {
    setCategoriaId(id);
  };

  useEffect(() => {
    getDataLocal("token").then((token) => {
      fetch(api + "/api/CategoriaCurso", {
        method: "GET",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          try {
            setCategorias(data);
          } catch (e) {
            console.error(e);
          }
        })
        .catch((error) => console.error("Error:", error));
    });
  }, []);

  useEffect(() => {
    getDataLocal("token").then((token) => {
      if (categoriaId > 0 && searchText != "" && searchText.length > 3) {
        fetch(api + "/api/Curso/pesquisa?valor=" + searchText, {
          method: "GET",
          headers: {
            accept: "/",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            try {
              setProcuraCursos(data);
            } catch (e) {
              console.error(e);
            }
          })
          .catch((error) => console.error("Error:", error));
      }
    });
  }, [searchText]);

  useEffect(() => {
    getDataLocal("token").then((token) => {
      if (categoriaId > 0) {
        fetch(api + "/api/Curso/categoria?id=" + categoriaId, {
          method: "GET",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            try {
              setCursos(data);
            } catch (e) {
              console.error(e);
            }
          })
          .catch((error) => console.error("Error:", error));
      }
    });
  }, [categoriaId]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredCursos = procuraCursos.filter((curso) =>
    curso.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#7353BA"} />
      <Text style={styles.textoCabecalho}>Procure Seu Novo Curso</Text>
      <BarraPesquisa onSearch={handleSearch} />
      {searchText === "" ? (
        cursos.length > 0 && (
          <View style={{ marginBottom: "10%" }}>
            <View style={{ height: "20%" }}>
              <Categoria
                listaCategorias={categorias}
                onCategoriaSelecionada={handleCategoriaSelecionada}
              />
            </View>
            <CardHome
              cursos={cursos}
              categoria={categorias}
              horizontalScroll={true}
            />
          </View>
        )
      ) : (
        <View style={{ width: "100%", height: "100%" }}>
          <Text style={{ textAlign: "center" }}>
            {"\n"}Resultado da pesquisa:
          </Text>
          {filteredCursos.length > 0 ? (
            <View style={styles.cardView}>
              <CardList cursos={filteredCursos} categoria={categorias} />
            </View>
          ) : (
            <View style={{ marginTop: 50, alignSelf: "center" }}>
              <Text>
                Sentimos muito mas nao conseguimos encontrar{"\n"}nenhum curso
                com o nome "{searchText}"
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F1F1F1",
    alignItems: "center",
  },
  textoCabecalho: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  cardView: {
    width: "100%",
    height: "70%",
    marginLeft: "25%",
  },
});

export default Home;
