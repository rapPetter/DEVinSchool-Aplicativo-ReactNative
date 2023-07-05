import api from "../../services/api";
import { storeDataLocal } from "../../services/LocalStorage";
export default function validarLogin(
  navigation,
  inputEmail,
  inputPassword,
  mensagem,
  setContexto
) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const senhaRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!inputEmail) {
    mensagem.setEstado({
      id: 1,
      mensagem: "Digite seu e-mail",
    });
  } else if (!emailRegex.test(inputEmail)) {
    mensagem.setEstado({
      id: 2,
      mensagem: "Digite um email válido",
    });
  } else if (!inputPassword) {
    mensagem.setEstado({
      id: 3,
      mensagem: "Digite sua senha",
    });
  } else if (!senhaRegex.test(inputPassword)) {
    mensagem.setEstado({
      id: 4,
      mensagem: "Digite uma senha contendo no min 8 caracteres",
    });
  } else {
    fetch(api + "/api/Autenticacao/autenticar", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json-patch+json",
      },
      body: JSON.stringify({
        email: inputEmail,
        senha: inputPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        storeDataLocal("token", data.result.token);
        storeDataLocal("email", inputEmail);
        storeDataLocal("userId", data.result.usuario.id.toString());
        navigation.navigate("HomeTab");
      })
      .catch((error) => console.error("Error:", error));
  }
}
