import cadastrarUsuario from "./CadastrarUsuario";

function validarRegistro(usuario, mensagem, setAlternarLoginSignUp) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nomeRegex = /^[a-zA-Z ]{3,}$/;
    const senhaRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

    if (!nomeRegex.test(usuario.nome)) {
        mensagem.setEstado({
            id: 1,
            mensagem: "Insira um nome com no mínimo 3 caracteres alfabéticos!",
        });

    } else if (!emailRegex.test(usuario.email)) {
        mensagem.setEstado({
            id: 2,
            mensagem: "E-mail inválido!",
        });
    } else if (usuario.idade < 18) {
        mensagem.setEstado({
            id: 3,
            mensagem: "Para se cadastrar, você deve ter mais do que 18 anos!",
        });
    } else if (!cpfRegex.test(usuario.CPF)) {
        mensagem.setEstado({
            id: 4,
            mensagem: "Insira um CPF válido!",
        });
    } else if (!senhaRegex.test(usuario.senha)) {
        mensagem.setEstado({
            id: 5,
            mensagem: "Sua senha deve conter ao menos 8 dígitos e incluir números e letras!",
        });
    } else {
        cadastrarUsuario(usuario);
        setAlternarLoginSignUp(true)
        mensagem.setEstado({
            id: "",
            mensagem: "",
        });

    }
}

export default validarRegistro;