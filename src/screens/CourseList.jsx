import { useEffect, useState } from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import api from "../services/api";
import CardList from "../components/CourseList/CardList";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDataLocal } from "../services/LocalStorage";

export default function CourseList({ route }) {
  const { id } = route.params;
  const navigation = useNavigation();
  const [cursos, setCursos] = useState([]);
  const [categoria, setCategoria] = useState([]);

  useEffect(() => {
    getDataLocal("token").then((token) => {
      fetch(api + "/api/Curso/categoria?id=" + id, {
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

      fetch(api + "/api/CategoriaCurso", {
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
            setCategoria(data);
          } catch (e) {
            console.error(e);
          }
        })
        .catch((error) => console.error("Error:", error));
    });
  }, []);

  const voltar = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.conteiner}>
      {cursos.length > 0 && categoria.length > 0 && (
        <View style={{ width: "100%", height: "100%" }}>
          <Text style={styles.categoria}>
            {
              categoria.filter((cat) => cat.id == cursos[0].categoriaCursoId)[0]
                .titulo
            }
          </Text>
          <View style={styles.cardView}>
            <CardList
              cursos={cursos}
              categoria={categoria}
              horizontalScroll={false}
            />
          </View>
        </View>
      )}
      <StatusBar backgroundColor={"#7353BA"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
  },
  categoria: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#7353BA",
    textAlign: "center",
  },
  cardView: {
    width: "100%",
    height: "100%",
    marginLeft: "25%",
  },
});
