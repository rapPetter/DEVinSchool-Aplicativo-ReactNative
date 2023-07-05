import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

function Categoria(props) {
  const { listaCategorias, onCategoriaSelecionada } = props;

  const [categoriaSelecionada, setCategoriaSelecionada] = useState(1);

  const navigation = useNavigation();

  const handleCategoriaPressionada = (id) => {
    onCategoriaSelecionada(id);
    setCategoriaSelecionada(id);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ maxHeight: 30 }}>
        <ScrollView
          horizontal={true}
          style={styles.scroll}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.componenteCategoria}>
            {listaCategorias.length > 0 &&
              listaCategorias.map((categoria) => (
                <TouchableOpacity
                  key={categoria.id}
                  style={styles.touchableStyle}
                  onPress={() => handleCategoriaPressionada(categoria.id)}
                >
                  <Text style={{ fontSize: 20, color: "#a7a7a7" }}>
                    {categoria.titulo}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.botaoVejaMais}
        onPress={() =>
          navigation.navigate("CourseList", { id: categoriaSelecionada })
        }
      >
        <Text style={styles.textoVejaMais}>Veja Mais</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    height: 50,
  },
  scroll: {
    height: 40,
  },
  componenteCategoria: {
    flexDirection: "row",
    paddingLeft: 30,
  },
  touchableStyle: {
    marginRight: 10,
  },
  botaoVejaMais: {
    alignSelf: "flex-end",
    marginRight: 30,
    marginTop: 20,
  },
  textoVejaMais: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7353BA",
  },
});

export default Categoria;
