"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedClient = void 0;
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const fileCondition = (fileName) => fileName.endsWith(".ts") || fileName.endsWith(".js");
class ExtendedClient extends discord_js_1.Client {
    commands = new discord_js_1.Collection();
    buttons = new discord_js_1.Collection();
    selects = new discord_js_1.Collection();
    modals = new discord_js_1.Collection();
    constructor() {
        super({
            intents: Object.keys(discord_js_1.IntentsBitField.Flags),
            partials: [
                discord_js_1.Partials.Channel,
                discord_js_1.Partials.GuildMember,
                discord_js_1.Partials.GuildScheduledEvent,
                discord_js_1.Partials.Message,
                discord_js_1.Partials.Reaction,
                discord_js_1.Partials.ThreadMember,
                discord_js_1.Partials.User
            ]
        });
    }
    start() {
        this.registerModules();
        this.registerEvents();
        this.login(process.env.BOT_TOKEN);
    }
    registerCommands(commands) {
        this.application?.commands.set(commands)
            .then(() => {
            console.log(" ✔ Slash commands (/) defined".green);
        }).catch((error) => {
            console.log(`${error}`.red);
        });
    }
    registerModules() {
        const slashCommands = new Array();
        const commandsPath = path_1.default.join(__dirname, "..", "commands");
        fs_1.default.readdirSync(commandsPath).forEach(local => {
            fs_1.default.readdirSync(commandsPath + `/${local}/`).filter(fileCondition).forEach(async (fileName) => {
                const command = (await Promise.resolve(`${`../commands/${local}/${fileName}`}`).then(s => __importStar(require(s))))?.default;
                const { name, buttons, selects, modals } = command;
                if (name) {
                    this.commands.set(name, command);
                    slashCommands.push(command);
                    if (buttons)
                        buttons.forEach((run, key) => this.buttons.set(key, run));
                    if (selects)
                        selects.forEach((run, key) => this.selects.set(key, run));
                    if (modals)
                        modals.forEach((run, key) => this.modals.set(key, run));
                }
            });
        });
        this.on("ready", () => this.registerCommands(slashCommands));
    }
    registerEvents() {
        const eventsPath = path_1.default.join(__dirname, "..", "events");
        fs_1.default.readdirSync(eventsPath).forEach(local => {
            fs_1.default.readdirSync(`${eventsPath}/${local}`).filter(fileCondition).forEach(async (fileName) => {
                const { name, once, run } = (await Promise.resolve(`${`../events/${local}/${fileName}`}`).then(s => __importStar(require(s))))?.default;
                try {
                    if (name)
                        (once) ? this.once(name, run) : this.on(name, run);
                }
                catch (error) {
                    console.log(`${error}`.red + "event error");
                }
            });
        });
    }
}
exports.ExtendedClient = ExtendedClient;
//# sourceMappingURL=extendedClient.js.map