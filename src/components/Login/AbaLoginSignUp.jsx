import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

export default function AbaLoginSignUp({
  alternarLoginSignUp,
  setAlternarLoginSignUp,
}) {
  return (
    <View>
      {alternarLoginSignUp ? (
        <View style={styles.abasView}>
          <View style={styles.signUpAba}>
            <Text style={styles.textoSignUp}>Entrar</Text>
          </View>

          <TouchableOpacity
            style={styles.loginAba}
            onPress={() => {
              setAlternarLoginSignUp(false);
            }}
          >
            <Text style={styles.textoLogin}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.abasView}>
          <TouchableOpacity
            style={styles.loginAba}
            onPress={() => {
              setAlternarLoginSignUp(true);
            }}
          >
            <Text style={styles.textoLogin}>Entrar</Text>
          </TouchableOpacity>
          <View style={styles.signUpAba}>
            <Text style={styles.textoSignUp}>Cadastrar</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  abasView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-around",
    width: "80%",
    alignSelf: "center",
    height: 45,
    marginTop: 10,
    marginBottom: 20,
  },

  loginAba: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },

  signUpAba: {
    borderBottomWidth: 2,
    borderBottomColor: "#7353BA",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },

  textoLogin: {
    fontSize: 22,
    color: "#7353BA",
    margin: 1,
  },

  textoSignUp: {
    fontSize: 22,
    color: "#7353BA",
    margin: 5,
  },
});
