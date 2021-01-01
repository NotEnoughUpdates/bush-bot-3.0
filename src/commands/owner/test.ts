import { BotCommand } from '../../classes/BotCommand'
import { Message } from 'discord.js'

export default class TestCommand extends BotCommand {
	public constructor() {
		super('test', {
			aliases: ['test'],
			category: 'owner',
			description: {
				content: 'A command to test shit',
				usage: 'test',
				examples: [
					'test'
				],
			},
			ownerOnly: true
		})
	}
	public async exec(message: Message): Promise<void> {
		message.util.send('test')
	}
}