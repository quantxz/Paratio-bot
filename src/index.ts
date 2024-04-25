import { ExtendedClient } from './structs/extendedClient';
export * from "colors";
import config from "./config.json"
import http from 'http';

const client = new ExtendedClient();

client.start();


client.on("ready", () => {
    console.log("Bot online".green)
})

export { client, config }






//porta pra não ficar dando bug no render
const server = http.createServer((req, res) => {
    // Defina o cabeçalho Content-Type para JSON
    res.setHeader('Content-Type', 'application/json');

    // Envie uma resposta simples como JSON
    res.end(JSON.stringify({ status: 'online' }));
});

const PORT = process.env.PORT || 3000;

// Inicie o servidor na porta especificada
server.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}`);
});