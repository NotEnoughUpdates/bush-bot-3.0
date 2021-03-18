import { Message, User, MessageEmbed } from 'discord.js';
import { BotCommand } from '../../lib/extensions/BotCommand';

export default class UserinfoCommand extends BotCommand {
	public constructor() {
		super('userinfo', {
			aliases: ['userinfo'],
			category: 'info',
			ratelimit: 4,
			cooldown: 4000,
			clientPermissions: ['EMBED_LINKS'],
			description: {
				usage: 'userinfo',
				examples: ['userinfo'],
				content: 'Gives information about a specified user.'
			},
			args: [
				{
					id: 'user',
					type: 'user',
					default: null
				}
			]
		});
	}
	//TODO: Make this an actual command
	public exec(message: Message, { user }: { user: User }): void {
		message.util.reply('you are a user :)');
		let m;
		if (user === null) {
			m = message.author;
		} else {
			m = user;
		}

		const embed: MessageEmbed = new MessageEmbed().setDescription('soon:tm:').addField('info', `mention: <@${m.id}>`);
		//.setThumbnail(m.displayAvatarURL)
		message.util.reply(embed);
	}
}
