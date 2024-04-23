import { ExtendedClient } from './structs/extendedClient';
export * from "colors";
import config from "./config.json"

const client = new ExtendedClient();

client.start();


client.on("ready", () => {
    console.log("Bot online".green)
}) 

export { client, config }