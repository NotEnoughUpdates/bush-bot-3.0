import { Message} from 'discord.js';
import { BotCommand } from '../../extensions/BotCommand';

export default class PriceCommand extends BotCommand {
	public constructor() {
		super('invite', {
			aliases: ['invite'],
			category: 'info',
			description: {
				content: 'Sends the bot invite link.',
				usage: 'invite',
			},
			ratelimit: 4,
			cooldown: 4000,
		});
	}
	public async exec(message: Message): Promise<void> {
		message.channel.send('<https://discord.com/api/oauth2/authorize?client_id=767445045459681281&permissions=66321471&scope=bot%20applications.commands>')
	}
}
