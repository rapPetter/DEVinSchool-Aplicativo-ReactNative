import { TouchableOpacity, StyleSheet, Text } from "react-native";

const Botao = ({ texto, funcao }) => {
  return (
    <TouchableOpacity style={styles.botao} onPress={funcao}>
      <Text style={styles.textoBotao}>{texto}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  botao: {
    width: "80%",
    height: 50,
    backgroundColor: "#7353BA",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    alignSelf: "center",
  },

  textoBotao: {
    fontSize: 18,
    color: "#F1F1F1",
  },
});

export default Botao;
