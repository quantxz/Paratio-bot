import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, Collection, Collector, CommandInteractionOptionResolver, StringSelectMenuBuilder } from "discord.js";
import { Command } from "../../structs/types/Command";
import { PrismaClient } from "@prisma/client";
let commandOptions: CommandInteractionOptionResolver;
const prisma = new PrismaClient();

export default new Command({
    name: "exclude",
    description: "exclude from database",
    options: [
        {
            name: "type",
            description: "type of thing you want to delete",
            required: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: "name",
            description: "the name of game",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "download_url",
            description: "url for the game download website",
            required: true,
            type: ApplicationCommandOptionType.String,
        }
    ],
    type: ApplicationCommandType.ChatInput,
    async run({ interaction, options }) {
        await interaction.deferReply();
        commandOptions = options
        const type = options.getString("type", true);

        const Buttons = new ActionRowBuilder<ButtonBuilder>({
            components: [
                new ButtonBuilder({ customId: "suces-button", label: "sim", style: ButtonStyle.Success }),
                new ButtonBuilder({ customId: "fail-button", label: "não", style: ButtonStyle.Danger })
            ]
        })

        switch (type) {
            case "game" || "jogo":
                interaction.editReply({
                    content: `tem certeza que deseja excluir | ${options.getString("name", true)} | com o download em:\n${options.getString("download_url", true)}\n[esta mensagem sera excluida em 15s]`,
                    components: [Buttons]
                })
                break;
            case "serie":
                interaction.editReply({
                    content: `tem certeza que deseja excluir | ${options.getString("name", true)} | com o download em:\n${options.getString("download_url", true)}\n[esta mensagem sera excluida em 15s]`,
                    components: [Buttons]
                })
                break;
            case "filme" || "movie":
                interaction.editReply({
                    content: `tem certeza que deseja excluir | ${options.getString("name", true)} | com o download em:\n${options.getString("download_url", true)}\n[esta mensagem sera excluida em 15s]`,
                    components: [Buttons]
                })
                break;
            case "emulador" || "emulator":
                interaction.editReply({
                    content: `tem certeza que deseja excluir | ${options.getString("name", true)} | com o download em:\n${options.getString("download_url", true)}\n[esta mensagem sera excluida em 15s]`,
                    components: [Buttons]
                })
                break;
            case "software":
                interaction.editReply({
                    content: `tem certeza que deseja excluir | ${options.getString("name", true)} | com o download em:\n${options.getString("download_url", true)}\n[esta mensagem sera excluida em 15s]`,
                    components: [Buttons]
                })
                break;
            default:
                interaction.editReply({
                    content: "esta não é uma das opções validas. As opções validas são:\njogo  (ou game)\nserie\nfilme (ou movie)\nemulador (ou emulator)\nsoftware"
                })
                break;
        }




        setTimeout(() => {
            interaction.deleteReply()
        }, 15000)

    },
    buttons: new Collection([
        ["suces-button", async (buttonInteraction) => {
            const type = commandOptions.getString("type", true);
            const name = commandOptions.getString("name", true);
            const urlToDownload = commandOptions.getString("download_url", true);


            switch (type) {
                case "game" || "jogo":
                    await prisma.games.delete({
                        where: {
                            name,
                            urlToDownload
                        }
                    });

                    buttonInteraction.reply({
                        content: `o jogo: ${name}, com download na url: ${urlToDownload}, foi excluido do banco de dados.`
                    })
                    break;
                case "serie":
                    await prisma.series.delete({
                        where: {
                            name,
                            urlToDownload
                        }
                    });

                    buttonInteraction.reply({
                        content: `a serie: ${name}, com download na url: ${urlToDownload}, foi excluido do banco de dados.`
                    })
                    break;
                case "filme" || "movie":
                    await prisma.movies.delete({
                        where: {
                            name,
                            urlToDownload
                        }
                    });

                    buttonInteraction.reply({
                        content: `o filme: ${name}, com download na url: ${urlToDownload}, foi excluido do banco de dados.`
                    })
                    break;
                case "emulador" || "emulator":
                    await prisma.emulators.delete({
                        where: {
                            name,
                            urlToDownload
                        }
                    });
                    buttonInteraction.reply({
                        content: `o emulador: ${name}, com download na url: ${urlToDownload}, foi excluido do banco de dados.`
                    })
                    break;
                case "software":
                    await prisma.softwares.delete({
                        where: {
                            name,
                            urlToDownload
                        }
                    });
                    buttonInteraction.reply({
                        content: `o software: ${name}, com download na url: ${urlToDownload}, foi excluido do banco de dados.`
                    })
                    break;
            }



        }],
        ["fail-button", async (buttonInteraction) => {
            buttonInteraction.reply(`tudo bem, o jogo ${commandOptions.getString("download_url", true)}, continuará em nosso sistema`)
        }]
    ])
})