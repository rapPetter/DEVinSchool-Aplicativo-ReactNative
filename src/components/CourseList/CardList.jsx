import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

function CardList(props) {
  const { cursos, categoria } = props;
  const navigation = useNavigation();

  const CursoDetail = (id) => {
    navigation.navigate("Course", { id: id });
  };
  return (
    <ScrollView style={styles.container}>
      {cursos.length > 0 &&
        cursos.map((curso) => (
          <TouchableOpacity
            onPress={() => CursoDetail(curso.id)}
            key={curso.id}
            style={styles.card}
          >
            <View style={styles.imgContainner}>
              <Image
                style={styles.img}
                source={{ uri: curso.link }}
                alt="Imagem do curso"
              ></Image>
            </View>
            <Text style={styles.titulo}>{curso.nome}</Text>
            {categoria != undefined &&
              categoria.map(
                (titulo) =>
                  titulo.id == curso.categoriaCursoId && (
                    <Text
                      key={curso.id}
                      numberOfLines={3}
                      style={{
                        ...styles.titulo,
                        ...styles.categoria,
                      }}
                    >
                      {titulo.titulo}
                    </Text>
                  )
              )}
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 30,
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 15,
    padding: 5,
    marginRight: 15,
    textAlign: "center",
    minHeight: 200,
    maxHeight: 220,
    marginBottom: 15,
    width: "50%",
  },
  imgContainner: {
    marginBottom: 10,
  },
  img: {
    resizeMode: "center",
    width: 50,
    height: 50,
  },
  titulo: {
    color: "#c3c3c3",
    marginVertical: 10,
    maxWidth: 105,
    maxHeight: 200,
    textAlign: "center",
  },
  categoria: {
    color: "#7353BA",
    fontWeight: "bold",
    maxWidth: 100,
  },
});

export default CardList;
