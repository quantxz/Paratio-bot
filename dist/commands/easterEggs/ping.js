"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structs/types/Command");
exports.default = new Command_1.Command({
    name: "ping",
    description: "reply with pong",
    options: [
        {
            name: "text",
            description: "reply with pong",
            type: discord_js_1.ApplicationCommandOptionType.String,
        }
    ],
    type: discord_js_1.ApplicationCommandType.ChatInput,
    run({ interaction, options }) {
        console.log(options.getString("text", true));
        interaction.reply({
            ephemeral: true, content: "pong"
        });
    }
});
//# sourceMappingURL=ping.js.map