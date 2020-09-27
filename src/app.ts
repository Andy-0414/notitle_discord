import Discord from "discord.js";
import { NOTITLE } from "./data/NOTITLE";
import fs from "fs";
import Command from "./interface/Command";

import "dotenv/config";

// 봇 연결
const client = new Discord.Client();
client.login(process.env.TOKEN);

// 명령어 사전 등록
export const commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./src/commands").filter((file) => file.endsWith(".ts"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.set(command.name, command);
}

// 준비 여부
client.on("ready", () => {
	console.log("bot is ready");
});

// 서버 가입 시
client.on("guildMemberAdd", (member) => {
	if (member.guild.id == NOTITLE.ID) {
		let role = member.guild.roles.cache.find((role) => role.id == NOTITLE.RANK_USER);
		member.roles.add(role);
	}
});

// 채팅
client.on("message", (message) => {
	if (message.guild.id != NOTITLE.ID) return;
	if (!message.content.startsWith(NOTITLE.PREFIX) || message.author.bot) return;

	const args = message.content.slice(NOTITLE.PREFIX.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!commands.has(command)) return;
	try {
		let commandConfig: Command = commands.get(command) as Command;
		commandConfig.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply("there was an error trying to execute that command!");
	}
});
