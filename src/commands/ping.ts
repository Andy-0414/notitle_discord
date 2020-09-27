import Discord, { Message } from "discord.js";
import { commands } from "../app";
import Command from "../interface/Command";

module.exports = {
	name: "ping",
	description: "핑 테스트",
	async execute(message: Message, args: string[]) {
		message.reply("pong");
	},
} as Command;
