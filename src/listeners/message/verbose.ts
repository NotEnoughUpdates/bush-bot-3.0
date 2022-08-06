import { BushListener, type BushClientEvents } from '#lib';
import { ChannelType } from 'discord.js';

export default class MessageVerboseListener extends BushListener {
	public constructor() {
		super('messageVerbose', {
			emitter: 'client',
			event: 'messageCreate',
			category: 'message'
		});
	}

	public exec(...[message]: BushClientEvents['messageCreate']): void {
		if (this.client.customReady) {
			if (message.channel?.type === ChannelType.DM) return;
			void this.client.console.verbose(
				'messageVerbose',
				`A message was sent by <<${message.author.tag}>> in <<${message.channel.name}>> in <<${message.guild!.name}>>.`
			);
		}
	}
}
