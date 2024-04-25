import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, Collection, CommandInteractionOptionResolver, StringSelectMenuBuilder } from "discord.js";
import { Command } from "../../structs/types/Command";
import { PrismaClient } from "@prisma/client";
let commandOptions: CommandInteractionOptionResolver;
const prisma = new PrismaClient();

export default new Command({
    name: "findgame",
    description: "save the game url",
    options: [
        {
            name: "game_name",
            description: "the name of game",
            required: true,
            type: ApplicationCommandOptionType.String,
        }
    ],
    type: ApplicationCommandType.ChatInput,
    async run({ interaction, options }) { 
        commandOptions = options
        const gameName = options.getString("game_name", true)
        const { user } = interaction

        const games = await prisma.games.findMany({
            where: {
                name: gameName
            }
        })
        

        if(games.length <= 0) {
            interaction.reply({
                content: `deculpe ${user}, não consguimos encontrar | ${gameName} | em nosso banco de dados ＞﹏＜`
            })
            
            return;
        }
        
        //criando uma coleção para guardar as urls
        const uniqueUrls = new Set<string>();
        const gameOptions = games.filter((game: { urlToDownload: string; }) => {
            //verificando se a url ja esta na coleção
            if (uniqueUrls.has(game.urlToDownload)) {
                return false;
            } else {
                uniqueUrls.add(game.urlToDownload);
                return true;
            }
        }).map((game: { name: any; urlToDownload: any; description: any; }) => ({
            label: game.name,
            value: game.urlToDownload,
            description: game.description ? game.description : "" 
        }));
        

        const row = new ActionRowBuilder<StringSelectMenuBuilder>({
            components: [
                new StringSelectMenuBuilder({
                    customId: "game-selection",
                    placeholder: "selecione o jogo",
                    options: gameOptions
                })
            ]
        })

        interaction.reply({
            components: [row]
        })
    },
    selects: new Collection([
        ["game-selection", async (selectIneteraction) => {

            const value = selectIneteraction.values[0]
            const { user } = selectIneteraction

            selectIneteraction.reply({
                content: `${user}, aqui esta o download:\n${value}`
            })

        }]
    ])
})