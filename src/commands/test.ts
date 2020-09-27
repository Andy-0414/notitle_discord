import Axios from "axios";
import Discord, { Message } from "discord.js";
import Command from "../interface/Command";

module.exports = {
	name: "test",
	description: "테스트 명령",
	async execute(message: Message, args: string[]) {
		let result = (await Axios.get("http://hangang.dkserver.wo.tc/")).data;

		const embed = new Discord.MessageEmbed({ title: "한강물 온도", description: `${result.temp}°C`, color: "#36AFFF" });

		message.channel.send(embed);
	},
} as Command;
