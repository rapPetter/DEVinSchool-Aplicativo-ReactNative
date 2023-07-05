import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function CardHome(props) {
  const { cursos, categoria, horizontalScroll } = props;
  const navigation = useNavigation();

  const CursoDetail = (id) => {
    navigation.navigate("Course", { id: id });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal={horizontalScroll}
        style={{ ...styles.scrollContainer, ...styles.scrollWidth }}
      >
        {cursos.length > 0 &&
          cursos.slice(0, 2).map((curso) => (
            <TouchableOpacity
              onPress={() => CursoDetail(curso.id)}
              key={curso.nome}
              style={styles.card}
            >
              <View style={styles.imgContainner}>
                <Image
                  style={styles.img}
                  source={{ uri: curso.link }}
                  alt="Imagem do curso"
                ></Image>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.titulo}>{curso.nome}</Text>
                {categoria != undefined &&
                  categoria.map(
                    (titulo) =>
                      titulo.id == curso.categoriaCursoId && (
                        <Text
                          key={curso.nome}
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
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 15,
    textAlign: "center",
    maxHeight: 220,
    width: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
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
    maxWidth: "90%",
    textAlign: "center",
  },
  categoria: {
    color: "#7353BA",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CardHome;
