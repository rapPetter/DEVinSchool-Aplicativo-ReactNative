// Lembre de alterar para o seu IP
const api = "https://72f9-2804-d57-554d-0-1de1-479f-beaf-f28b.ngrok-free.app";

const ipv4 = '192.168.1.101'

const portApiDb = ':3000'

const portApiUpload = ':8080'

//const api = ipv4 +  portApiDb

export const apiUpload = ipv4 + portApiUpload


export default api;

// Como rodar o json-server:
// 1- acesse o cmd e digite ipconfig
// 2- copie o endereço IPv4
// 3- altere o endereço IPv4 na const api nesse arquivo
// 4- abra um terminal e rode o comando: json-server --host 192.168.0.155 --watch db.json

