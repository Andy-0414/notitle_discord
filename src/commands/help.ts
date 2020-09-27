import Discord, { Message } from "discord.js";
import { commands } from "../app";
import Command from "../interface/Command";

module.exports = {
	name: "help",
	description: "명령어 도움",
	async execute(message: Message, args: string[]) {
		const embed = new Discord.MessageEmbed({ title: "도움말", fields: commands.map((data: Command) => ({ name: data.name, value: data.description })), color: "#36AFFF" });
		message.channel.send(embed);
	},
} as Command;
