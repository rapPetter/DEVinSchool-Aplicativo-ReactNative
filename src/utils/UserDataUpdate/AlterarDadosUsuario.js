import api from "../../services/api";
import { Alert } from "react-native";
import { getDataLocal } from "../../services/LocalStorage";

function alterarDadosUsuario(usuario) {
  Alert.alert("Alterar perfil", "Tem certeza que deseja atualizar o perfil?", [
    {
      text: "Não",
      style: "cancel",
    },
    {
      text: "Sim",
      onPress: () => {
        getDataLocal("userId").then((id) => {
          getDataLocal("token").then((token) => {
            fetch(api + "/api/Usuario/update/" + id, {
              method: "PUT",
              headers: {
                accept: "/",
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json-patch+json",
              },
              body: JSON.stringify({
                nome: usuario.nome,
                idade: usuario.idade,
                senha: usuario.senha,
              }),
            })
              .finally(() => { alert("Dados alterados com sucesso!") })
          });
        });


      },
    },
  ]);
}

export default alterarDadosUsuario;
