import { Image, StyleSheet, View } from "react-native";
import imagem from "../../../assets/images/menino.png";

export default function Header() {
  return (
    <View style={styles.iconeContainer}>
      <Image source={imagem} style={styles.icone} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconeContainer: {
    backgroundColor: "white",
    height: 180,
    width: "90%",
    alignSelf: "center",
    borderRadius: 15,
    marginTop: 40,
  },
  icone: {
    height: "90%",
    margin: 10,
    justifyContent: "center",
    alignSelf: "center",
    resizeMode: "contain",
  },
});
