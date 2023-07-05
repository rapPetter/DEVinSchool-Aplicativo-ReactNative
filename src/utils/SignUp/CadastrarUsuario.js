import api from "../../services/api";

function cadastrarUsuario(usuario) {
  const cpfFormatado = usuario.CPF.replace(/[.-]/g, "");
  fetch(api + "/api/Usuario/registro", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json-patch+json",
    },
    body: JSON.stringify({
      nome: usuario.nome,
      idade: usuario.idade,
      cpf: cpfFormatado,
      email: usuario.email,
      senha: usuario.senha,
      foto: usuario.foto,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => console.error("Error:", error));
}

export default cadastrarUsuario;
