"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structs/types/Command");
const client_1 = require("@prisma/client");
let commandOptions;
const prisma = new client_1.PrismaClient();
exports.default = new Command_1.Command({
    name: "excludegame",
    description: "excluede a game from database",
    options: [
        {
            name: "game_name",
            description: "the name of game",
            required: true,
            type: discord_js_1.ApplicationCommandOptionType.String,
        },
        {
            name: "game_download_url",
            description: "url for the game download website",
            required: true,
            type: discord_js_1.ApplicationCommandOptionType.String,
        }
    ],
    type: discord_js_1.ApplicationCommandType.ChatInput,
    async run({ interaction, options }) {
        await interaction.deferReply();
        commandOptions = options;
        const Buttons = new discord_js_1.ActionRowBuilder({
            components: [
                new discord_js_1.ButtonBuilder({ customId: "suces-button", label: "sim", style: discord_js_1.ButtonStyle.Success }),
                new discord_js_1.ButtonBuilder({ customId: "fail-button", label: "não", style: discord_js_1.ButtonStyle.Danger })
            ]
        });
        interaction.editReply({
            content: `tem certeza que deseja excluir | ${options.getString("game_name", true)} | com o download em:\n${options.getString("game_download_url", true)}\n[esta mensagem sera excluida em 15s]`,
            components: [Buttons]
        });
        setTimeout(() => {
            interaction.deleteReply();
        }, 15000);
    },
    buttons: new discord_js_1.Collection([
        ["suces-button", async (buttonInteraction) => {
                const name = commandOptions.getString("game_name", true);
                const urlToDownload = commandOptions.getString("game_download_url", true);
                await prisma.games.delete({
                    where: {
                        name,
                        urlToDownload
                    }
                });
                buttonInteraction.reply({
                    content: `o jogo: ${name}, com download na url: ${urlToDownload}, foi excluido do banco de dados.`
                });
            }],
        ["fail-button", async (buttonInteraction) => {
                buttonInteraction.reply(`tudo bem, o jogo ${commandOptions.getString("game_download_url", true)}, continuará em nosso sistema`);
            }]
    ])
});
//# sourceMappingURL=excludeGame.js.map