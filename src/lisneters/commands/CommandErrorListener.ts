import { Listener, Command } from 'discord-akairo'
import { MessageEmbed, Message } from 'discord.js'
import BotClient from '../../client/BotClient'

export default class CommandErrorListener extends Listener {
	public constructor() {
		super('commandError', {
			emitter: 'commandHandler',
			event: 'error',
			category: 'commands'
		})
	}

	public async exec(error: Error, message: Message, command: Command | null | undefined): Promise<void> {
		const client = <BotClient> this.client
		const errorEmbed: MessageEmbed = new MessageEmbed()
			.setTitle('A error occured')
			.setDescription(`**User:** ${message.author}\n**Command:** ${command}\n**Channel:** ${message.channel}`)
			.addField('Error', `${await client.consts.haste(error.stack)}`)
			.setColor('#1FD8F1')
			.setTimestamp()
		message.channel.send(errorEmbed)
	}
}
