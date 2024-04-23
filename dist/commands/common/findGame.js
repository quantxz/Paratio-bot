"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structs/types/Command");
const client_1 = require("@prisma/client");
let commandOptions;
const prisma = new client_1.PrismaClient();
exports.default = new Command_1.Command({
    name: "findgame",
    description: "save the game url",
    options: [
        {
            name: "game_name",
            description: "the name of game",
            required: true,
            type: discord_js_1.ApplicationCommandOptionType.String,
        }
    ],
    type: discord_js_1.ApplicationCommandType.ChatInput,
    async run({ interaction, options }) {
        commandOptions = options;
        const gameName = options.getString("game_name", true);
        const games = await prisma.games.findMany({
            where: {
                name: gameName
            }
        });
        //criando uma coleção para guardar as urls
        const uniqueUrls = new Set();
        const gameOptions = games.filter(game => {
            //verificando se a url ja esta na coleção
            if (uniqueUrls.has(game.urlToDownload)) {
                return false;
            }
            else {
                uniqueUrls.add(game.urlToDownload);
                return true;
            }
        }).map(game => ({
            label: game.name,
            value: game.urlToDownload
        }));
        const row = new discord_js_1.ActionRowBuilder({
            components: [
                new discord_js_1.StringSelectMenuBuilder({
                    customId: "game-selection",
                    placeholder: "selecione o jogo",
                    options: gameOptions
                })
            ]
        });
        interaction.reply({
            components: [row]
        });
    },
    selects: new discord_js_1.Collection([
        ["game-selection", async (selectIneteraction) => {
                const value = selectIneteraction.values[0];
                console.log(value);
                selectIneteraction.reply({
                    content: `aqui esta o download:\n${value}`
                });
            }]
    ])
});
//# sourceMappingURL=findGame.js.map