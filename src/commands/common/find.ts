import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, Collection, CommandInteractionOptionResolver, SnowflakeUtil, StringSelectMenuBuilder } from "discord.js";
import { Command } from "../../structs/types/Command";
import { PrismaClient } from "@prisma/client";
let commandOptions: CommandInteractionOptionResolver;
const prisma = new PrismaClient();


export default new Command({
    name: "find",
    description: "find something",
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
            name: "description",
            description: "description",
            type: ApplicationCommandOptionType.String,
        }
    ],
    type: ApplicationCommandType.ChatInput,

    async run({ interaction, options }) {
        await interaction.deferReply();
        commandOptions = options
        const name = options.getString("name", true)
        const type = options.getString("type", true)
        const { user } = interaction;

        switch (type) {
            case "game" || "jogo":
                const jogos = await prisma.games.findMany({
                    where: {
                        name
                    }
                })


                if (jogos.length <= 0) {
                    interaction.editReply({
                        content: `deculpe ${user}, não consguimos encontrar | ${name} | em nosso banco de dados ＞﹏＜`
                    })

                }

                //criando uma coleção para guardar as urls
                const uniqueGamesUrls = new Set<string>();
                const gameOptions = jogos.filter((game: { urlToDownload: string; }) => {
                    //verificando se a url ja esta na coleção
                    if (uniqueGamesUrls.has(game.urlToDownload)) {
                        return false;
                    } else {
                        uniqueGamesUrls.add(game.urlToDownload);
                        return true;
                    }
                }).map((game: { name: any; urlToDownload: any; description: any; }) => ({
                    label: game.name,
                    value: game.urlToDownload,
                    description: game.description ? game.description : ""
                }));

                const gamesRow = new ActionRowBuilder<StringSelectMenuBuilder>({
                    components: [
                        new StringSelectMenuBuilder({
                            customId: "selection",
                            placeholder: "selecione o jogo",
                            options: gameOptions
                        })
                    ]
                })

                interaction.editReply({
                    components: [gamesRow]
                })

                break;

            case "serie":
                const series = await prisma.series.findMany({
                    where: {
                        name: name
                    }
                })


                if (series.length <= 0) {
                    interaction.editReply({
                        content: `deculpe ${user}, não consguimos encontrar | ${name} | em nosso banco de dados ＞﹏＜`
                    })

                }

                //criando uma coleção para guardar as urls
                const uniqueSeriesUrls = new Set<string>();
                const seriesOptions = series.filter((serie: { urlToDownload: string; }) => {
                    //verificando se a url ja esta na coleção
                    if (uniqueSeriesUrls.has(serie.urlToDownload)) {
                        return false;
                    } else {
                        uniqueSeriesUrls.add(serie.urlToDownload);
                        return true;
                    }
                }).map((serie: { name: any; urlToDownload: any; description: any; }) => ({
                    label: serie.name,
                    value: serie.urlToDownload,
                    description: serie.description ? serie.description : ""
                }));

                const seriesRow = new ActionRowBuilder<StringSelectMenuBuilder>({
                    components: [
                        new StringSelectMenuBuilder({
                            customId: "selection",
                            placeholder: "selecione a serie",
                            options: seriesOptions
                        })
                    ]
                })

                interaction.editReply({
                    components: [seriesRow]
                })

                break;

            case "filme" || "movie":
                const movies = await prisma.movies.findMany({
                    where: {
                        name: name
                    }
                })


                if (movies.length <= 0) {
                    interaction.editReply({
                        content: `deculpe ${user}, não consguimos encontrar | ${name} | em nosso banco de dados ＞﹏＜`
                    })

                }

                //criando uma coleção para guardar as urls
                const uniqueMoviesUrls = new Set<string>();
                const moviesOptions = movies.filter((movie: { urlToDownload: string; }) => {
                    //verificando se a url ja esta na coleção
                    if (uniqueMoviesUrls.has(movie.urlToDownload)) {
                        return false;
                    } else {
                        uniqueMoviesUrls.add(movie.urlToDownload);
                        return true;
                    }
                }).map((movie: { name: any; urlToDownload: any; description: any; }) => ({
                    label: movie.name,
                    value: movie.urlToDownload,
                    description: movie.description ? movie.description : ""
                }));

                const moviesRow = new ActionRowBuilder<StringSelectMenuBuilder>({
                    components: [
                        new StringSelectMenuBuilder({
                            customId: "selection",
                            placeholder: "selecione a serie",
                            options: moviesOptions
                        })
                    ]
                })

                interaction.editReply({
                    components: [moviesRow]
                })

                break;

            case "emulador" || "emulator":
                const emulators = await prisma.emulators.findMany({
                    where: {
                        name: name
                    }
                })


                if (emulators.length <= 0) {
                    interaction.editReply({
                        content: `deculpe ${user}, não consguimos encontrar | ${name} | em nosso banco de dados ＞﹏＜`
                    })

                }

                //criando uma coleção para guardar as urls
                const uniqueEmulatorUrls = new Set<string>();
                const emulatorOptions = emulators.filter((emulator: { urlToDownload: string; }) => {
                    //verificando se a url ja esta na coleção
                    if (uniqueEmulatorUrls.has(emulator.urlToDownload)) {
                        return false;
                    } else {
                        uniqueEmulatorUrls.add(emulator.urlToDownload);
                        return true;
                    }
                }).map((emulator: { name: any; urlToDownload: any; description: any; }) => ({
                    label: emulator.name,
                    value: emulator.urlToDownload,
                    description: emulator.description ? emulator.description : ""
                }));

                const emulatorsRow = new ActionRowBuilder<StringSelectMenuBuilder>({
                    components: [
                        new StringSelectMenuBuilder({
                            customId: "selection",
                            placeholder: "selecione o emulador",
                            options: emulatorOptions
                        })
                    ]
                })

                interaction.editReply({
                    components: [emulatorsRow]
                })

                break;

            case "software":
                const softwares = await prisma.softwares.findMany({
                    where: {
                        name: name
                    }
                })


                if (softwares.length <= 0) {
                    interaction.editReply({
                        content: `deculpe ${user}, não consguimos encontrar | ${name} | em nosso banco de dados ＞﹏＜`
                    })

                }

                //criando uma coleção para guardar as urls
                const uniqueUrls = new Set<string>();
                const softwaresOptions = softwares.filter((software: { urlToDownload: string; }) => {
                    //verificando se a url ja esta na coleção
                    if (uniqueUrls.has(software.urlToDownload)) {
                        return false;
                    } else {
                        uniqueUrls.add(software.urlToDownload);
                        return true;
                    }
                }).map((software: { name: any; urlToDownload: any; description: any; }) => ({
                    label: software.name,
                    value: software.urlToDownload,
                    description: software.description ? software.description : ""
                }));

                const softwareRow = new ActionRowBuilder<StringSelectMenuBuilder>({
                    components: [
                        new StringSelectMenuBuilder({
                            customId: "selection",
                            placeholder: "selecione o software",
                            options: softwaresOptions
                        })
                    ]
                })

                interaction.editReply({
                    components: [softwareRow]
                })

                break;

            case "*" || "all" || "todos" || "tudo":
                const [gameAll, seriesAll, moviesAll, emulatorsAll, softwaresAll] = await Promise.all([
                    await prisma.games.findMany(),
                    await prisma.series.findMany(),
                    await prisma.movies.findMany(),
                    await prisma.emulators.findMany(),
                    await prisma.softwares.findMany()
                ])
                
                const arrayAllLinks = [...gameAll, ...seriesAll, ...moviesAll, ...emulatorsAll, ...softwaresAll];

                if (arrayAllLinks.length <= 0) {
                    interaction.editReply({
                        content: `Desculpe ${user}, não conseguimos encontrar | ${name} | em nosso banco de dados ＞﹏＜`
                    });
                }
                
                // Creating a set to store unique URLs
                const AllUrls = new Set<string>();
                const allOptions = arrayAllLinks.filter((item: { urlToDownload: string }  | any) => {

                    // Checking if the URL is already in the set
                    if (AllUrls.has(item.urlToDownload)) {
                        return false;
                    } else {
                        AllUrls.add(item.urlToDownload);
                        return true;
                    }
                }).map((item: { name: string; urlToDownload: string; description: string } | any) => ({
                    label: item.name ? item.name as string : "ainda não a nada aqui",
                    value: item.urlToDownload ? item.urlToDownload as string : "ainda não a nada aqui",
                    description: item.description  ? item.description as string : "sem descrição"
                }));
                
                // Building the select menu
                const allRow = new ActionRowBuilder<StringSelectMenuBuilder>({
                    components: [
                        new StringSelectMenuBuilder({
                            customId: "selection",
                            placeholder: "Selecione o que voce deseja",
                            options: allOptions
                        })
                    ]
                });
                
                // Sending the select menu
                interaction.editReply({
                    components: [allRow]
                });

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
    selects: new Collection([
        ["selection", async (selectIneteraction) => {

            const value = selectIneteraction.values[0]
            const { user } = selectIneteraction

            selectIneteraction.reply({
                content: `${user}, aqui esta o download:\n${value}`
            })

        }]
    ])

})