import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function BarraPesquisa({ onSearch }) {
  const handleSearch = (text) => {
    onSearch(text);
  };
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#7353BA" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Buscar cursos"
        placeholderTextColor={"#c7c7c7"}
        onChangeText={handleSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "80%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 24,
    color: "#7353BA",
  },
});

export default BarraPesquisa;
