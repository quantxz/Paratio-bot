import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, Collection, Collector, CommandInteractionOptionResolver, StringSelectMenuBuilder } from "discord.js";
import { Command } from "../../structs/types/Command";
import { PrismaClient } from "@prisma/client";
let commandOptions: CommandInteractionOptionResolver;
const prisma = new PrismaClient();

export default new Command({
    name: "exclude_game",
    description: "excluede a game from database",
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
        }
    ],
    type: ApplicationCommandType.ChatInput,
    async run({ interaction, options }) {
        await interaction.deferReply();
        commandOptions = options

        const Buttons = new ActionRowBuilder<ButtonBuilder>({
            components: [
                new ButtonBuilder({ customId: "suces-button", label: "sim", style: ButtonStyle.Success }),
                new ButtonBuilder({ customId: "fail-button", label: "não", style: ButtonStyle.Danger })
            ]
        })

        interaction.editReply({
            content: `tem certeza que deseja excluir | ${options.getString("game_name", true)} | com o download em:\n${options.getString("game_download_url", true)}\n[esta mensagem sera excluida em 15s]`,
            components: [Buttons]
        })

        setTimeout(() => {
            interaction.deleteReply()
        }, 15000)

    },
    buttons: new Collection([
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
            })

        }],
        ["fail-button", async (buttonInteraction) => {
            buttonInteraction.reply(`tudo bem, o jogo ${commandOptions.getString("game_download_url", true)}, continuará em nosso sistema`)
        }]
    ])
})