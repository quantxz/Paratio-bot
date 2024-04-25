import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, Collection, CommandInteractionOptionResolver, SnowflakeUtil } from "discord.js";
import { Command } from "../../structs/types/Command";
import { PrismaClient } from "@prisma/client";
let commandOptions: CommandInteractionOptionResolver;
const prisma = new PrismaClient();

//jogo ✔
// serie ✔
// filme ✔
// emulador ✔
// software ✔

export default new Command({
    name: "save",
    description: "save the game url",
    options: [
        {
            name: "type",
            description: "what you want save?",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "name",
            description: "the name of thing",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "url_download",
            description: "url for the download",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "description",
            description: "description",
            type: ApplicationCommandOptionType.String,
        }
    ],
    type: ApplicationCommandType.ChatInput,

    async run({ interaction, options }) {
        await interaction.deferReply();
        commandOptions = options

        const Buttons = new ActionRowBuilder<ButtonBuilder>({
            components: [
                new ButtonBuilder({ customId: "sucess-button", label: "sim", style: ButtonStyle.Success }),
                new ButtonBuilder({ customId: "failed-button", label: "não", style: ButtonStyle.Danger })
            ]
        })

        const type = options.getString("type", true)

        switch (type) {
            case "game" || "jogo":
                const game = await prisma.games.findMany({
                    where: {
                        name: options.getString("name", true),
                        urlToDownload: options.getString("url_download", true)
                    }
                })

                if (game.length > 0) {
                    interaction.editReply({
                        content: `este jogo ja esta salvo em nosso banco dados`,
                    })

                    return;
                } else {
                    interaction.editReply({
                        content: `a url:\n${options.getString("url_download", true)}.\nEsta correta ?\n(esta mensagem ira sumir em 15s)`,
                        components: [Buttons]
                    })
                }
                break;

            case "serie":
                const serie = await prisma.series.findMany({
                    where: {
                        name: options.getString("name", true),
                        urlToDownload: options.getString("url_download", true)
                    }
                })

                if (serie.length > 0) {
                    interaction.editReply({
                        content: `esta serie ja esta salvo em nosso banco dados`,
                    })

                    return;
                } else {
                    interaction.editReply({
                        content: `a url:\n${options.getString("url_download", true)}.\nEsta correta ?\n(esta mensagem ira sumir em 15s)`,
                        components: [Buttons]
                    })
                }
                break;

            case "filme" || "movie":

                const movies = await prisma.movies.findMany({
                    where: {
                        name: options.getString("name", true),
                        urlToDownload: options.getString("url_download", true)
                    }
                })

                if (movies.length > 0) {
                    interaction.editReply({
                        content: `este filme ja esta salvo em nosso banco dados`,
                    })

                    return;
                } else {
                    interaction.editReply({
                        content: `a url:\n${options.getString("url_download", true)}.\nEsta correta ?\n(esta mensagem ira sumir em 15s)`,
                        components: [Buttons]
                    })
                }
                break;

            case "emulador" || "emulator":
                const emulators = await prisma.emulators.findMany({
                    where: {
                        name: options.getString("name", true),
                        urlToDownload: options.getString("url_download", true)
                    }
                })

                if (emulators.length > 0) {
                    interaction.editReply({
                        content: `este emulador ja esta salvo em nosso banco dados`,
                    })

                    return;
                } else {
                    interaction.editReply({
                        content: `a url:\n${options.getString("url_download", true)}.\nEsta correta ?\n(esta mensagem ira sumir em 15s)`,
                        components: [Buttons]
                    })
                }
                break;

            case "software":
                const softwares = await prisma.softwares.findMany({
                    where: {
                        name: options.getString("name", true),
                        urlToDownload: options.getString("url_download", true)
                    }
                })

                if (softwares.length > 0) {
                    interaction.editReply({
                        content: `este software ja esta salvo em nosso banco dados`,
                    })

                    return;
                } else {
                    interaction.editReply({
                        content: `a url:\n${options.getString("url_download", true)}.\nEsta correta ?\n(esta mensagem ira sumir em 15s)`,
                        components: [Buttons]
                    })
                }
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
        ["sucess-button", async (buttonInteraction) => {
            const name = commandOptions.getString("name", true);
            const type = commandOptions.getString("type", true);

            const { user } = buttonInteraction;
            const urlToDownload = commandOptions.getString("url_download", true);
            const description = commandOptions.getString("description", false);

            switch (type) {
                case "game" || "jogo":
                    if (description) {
                        await prisma.games.create({
                            data: {
                                name,
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
                    break;

                case "serie":
                    if (description) {
                        await prisma.series.create({
                            data: {
                                name,
                                urlToDownload,
                                description
                            }
                        });
                    } else {
                        await prisma.series.create({
                            data: {
                                name: name,
                                urlToDownload
                            }
                        });
                    }

                    await buttonInteraction.deferReply({ ephemeral: true });

                    buttonInteraction.editReply({
                        content: `Muito obrigado por contribuir conosco ${user}, a serie ${name} foi salvo em nosso banco de dados.`
                    });
                    break;

                case "filme" || "movie":
                    if (description) {
                        await prisma.movies.create({
                            data: {
                                name,
                                urlToDownload,
                                description
                            }
                        });
                    } else {
                        await prisma.movies.create({
                            data: {
                                name: name,
                                urlToDownload
                            }
                        });
                    }

                    await buttonInteraction.deferReply({ ephemeral: true });

                    buttonInteraction.editReply({
                        content: `Muito obrigado por contribuir conosco ${user}, o filme ${name} foi salvo em nosso banco de dados.`
                    });
                    break;

                case "emulador" || "emulator":
                    if (description) {
                        await prisma.emulators.create({
                            data: {
                                name,
                                urlToDownload,
                                description
                            }
                        });
                    } else {
                        await prisma.emulators.create({
                            data: {
                                name: name,
                                urlToDownload
                            }
                        });
                    }

                    await buttonInteraction.deferReply({ ephemeral: true });

                    buttonInteraction.editReply({
                        content: `Muito obrigado por contribuir conosco ${user}, o emulador ${name} foi salvo em nosso banco de dados.`
                    });

                    break;

                case "software":
                    if (description) {
                        await prisma.softwares.create({
                            data: {
                                name,
                                urlToDownload,
                                description
                            }
                        });
                    } else {
                        await prisma.softwares.create({
                            data: {
                                name: name,
                                urlToDownload
                            }
                        });
                    }

                    await buttonInteraction.deferReply({ ephemeral: true });

                    buttonInteraction.editReply({
                        content: `Muito obrigado por contribuir conosco ${user}, o software ${name} foi salvo em nosso banco de dados.`
                    });

                    break;
            }

        }],
        ["failed-button", async (buttonInteraction) => {
            buttonInteraction.reply("url excluida :-(\ntente usar o comando novamente com a url correta")
        }]
    ])
})