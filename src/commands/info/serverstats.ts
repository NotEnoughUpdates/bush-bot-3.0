import { BushCommand } from '../../lib/extensions/BushCommand';
import { Message, MessageEmbed } from 'discord.js';
import got from 'got';

export default class ServerStatusCommand extends BushCommand {
	public constructor() {
		super('serverstatus', {
			aliases: ['serverstatus', 'ss'],
			description: {
				usage: 'serverstatus',
				examples: ['serverstatus', 'ss'],
				content: "Gives the status of moulberry's server"
			},
			category: 'info',
			ratelimit: 4,
			cooldown: 4000,
			clientPermissions: ['EMBED_LINKS', 'SEND_MESSAGES']
		});
	}
	public async exec(message: Message): Promise<void> {
		const msgEmbed: MessageEmbed = new MessageEmbed().setTitle('Server status').setDescription('Checking server:\n...').setColor(this.client.consts.DefaultColor).setFooter('Checking https://moulberry.codes/lowestbin.json');
		const msg: Message = await message.util.reply(msgEmbed);
		let main;
		try {
			await got.get('https://moulberry.codes/lowestbin.json').json();
			main = '✅';
		} catch (e) {
			main = '❌';
		}
		await msg.edit(msgEmbed.setDescription(`Checking server:\n${main}`));
		if (main == '✅') {
			await msg.edit(msgEmbed.addField('Status', 'The server is online, all features related to prices will likely work.').setColor(this.client.consts.Green));
		} else {
			await msg.edit(msgEmbed.addField('Status', "It appears moulberry's server is offline, this means that everything related to prices will likely not work.").setColor(this.client.consts.Red));
		}
	}
}
