import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { Command } from "../../structs/types/Command";

export default new Command({
    name: "ping",
    description: "reply with pong",
    options: [
        {
            name: "text",
            description: "reply with pong",
            type: ApplicationCommandOptionType.String,
        }
    ],
    type: ApplicationCommandType.ChatInput,
    run({ interaction, options }) {
        console.log(options.getString("text", true))
        interaction.reply({
            ephemeral: true, content: "pong"
        })

    }
})