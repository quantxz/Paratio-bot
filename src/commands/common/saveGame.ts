import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, Collection, CommandInteractionOptionResolver } from "discord.js";
import { Command } from "../../structs/types/Command";
import { PrismaClient } from "@prisma/client";
let commandOptions: CommandInteractionOptionResolver;
const prisma = new PrismaClient();

export default new Command({
    name: "savegame",
    description: "save the game url",
    options: [
        {
            name: "game_name",
            description: "the name of game",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "game_download_url",
            description: "url for the game download website",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "game_description",
            description: "description",
            type: ApplicationCommandOptionType.String,
        }
    ],
    type: ApplicationCommandType.ChatInput,
    async run({ interaction, options }) {
        await interaction.deferReply();
        commandOptions = options

        const game = await prisma.games.findMany({
            where: {
                name: options.getString("game_name", true),
                urlToDownload: options.getString("game_download_url", true)
            }
        })

        if (game.length > 0) {
            interaction.editReply({
                content: `este jogo ja esta salvo em nosso banco dados`,
            })

            return;
        }

        const Buttons = new ActionRowBuilder<ButtonBuilder>({
            components: [
                new ButtonBuilder({ customId: "sucess-button", label: "sim", style: ButtonStyle.Success }),
                new ButtonBuilder({ customId: "failed-button", label: "não", style: ButtonStyle.Danger })
            ]
        })

        interaction.editReply({
            content: `a url:\n${options.getString("game_download_url", true)}.\nEsta correta ?\n(esta mensagem ira sumir em 15s)`,
            components: [Buttons]
        })

        setTimeout(() => {
            interaction.deleteReply()
        }, 15000)

    },
    buttons: new Collection([
        ["sucess-button", async (buttonInteraction) => {
            const name = commandOptions.getString("game_name", true);
            const urlToDownload = commandOptions.getString("game_download_url", true);
            const { user } = buttonInteraction;
            const description = commandOptions.getString("game_description", true)

            if (description) {
                await prisma.games.create({
                    data: {
                        name: name,
                        urlToDownload,
                        description
                    }
                });
            } else {
                await prisma.games.create({
                    data: {
                        name: name,
                        urlToDownload,
                    }
                });
            }


            await buttonInteraction.deferReply({ ephemeral: true });

            buttonInteraction.editReply({
                content: `Muito obrigado por contribuir conosco ${user}, o jogo ${name} foi salvo em nosso banco de dados.`
            });

        }],
        ["failed-button", async (buttonInteraction) => {
            buttonInteraction.reply("url excluida :-(\ntente usar o comando novamente com a url correta")
        }]
    ])
})