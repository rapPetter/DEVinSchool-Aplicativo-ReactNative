import alterarDadosUsuario from "./AlterarDadosUsuario";

function validarAlteracoes(usuario, mensagem) {
    const nomeRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{3,}$/
    const senhaRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/


    if (!nomeRegex.test(usuario.nome)) {
        mensagem.setEstado({
            id: 1,
            mensagem: "Insira um nome com no mínimo 3 caracteres alfabéticos!",
        });

    } else if (usuario.idade < 18) {
        mensagem.setEstado({
            id: 3,
            mensagem: "Para se cadastrar, você deve ter mais do que 18 anos!",
        });

    } else if (!senhaRegex.test(usuario.senha)) {
        mensagem.setEstado({
            id: 5,
            mensagem: "Sua senha deve conter ao menos 8 dígitos e incluir números e letras!",
        });
    } else {

        alterarDadosUsuario(usuario)
        mensagem.setEstado({
            id: "",
            mensagem: "",
        });
    }
}

export default validarAlteracoes;