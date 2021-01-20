import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { BotListener } from '../../extensions/BotListener';

export default class ContentCreatorListener extends BotListener {
	public constructor() {
		super('ContentCreatorListener', {
			emitter: 'client',
			event: 'message',
			category: 'message',
		});
	}

	public async exec(message: Message): Promise<void> {
		if (!message.guild) return;
		const generalLogChannel = <TextChannel>this.client.channels.cache.get(this.client.config.generalLogChannel);
		if (message.mentions.members.first()?.roles.cache.has('729414120842985564')) {
			if(
				message.member?.roles.cache.has('782803470205190164') || //Sr. Mod
				message.member?.roles.cache.has('737308259823910992') || //Mod
				message.member?.roles.cache.has('746541309853958186') || //Admin Perms
				message.member?.roles.cache.has('742165914148929536')    //Moulberry
			) return; 
			if(
				message.mentions.members.first()?.roles.cache.has('782803470205190164') || //Sr. Mod
				message.mentions.members.first()?.roles.cache.has('737308259823910992') || //Mod
				message.mentions.members.first()?.roles.cache.has('746541309853958186') || //Admin Perms
				message.mentions.members.first()?.roles.cache.has('742165914148929536')    //Moulberry
			) return;
			if(
				message.member?.permissions.has('ADMINISTRATOR')
			) return;
			if (message.author.bot) return;
			await message.reply('Please dont mention content creators');
			const mentionlogembed = new MessageEmbed()
				.setTitle('A content creator was mentioned')
				.setColor(this.client.consts.DefaultColor)
				.addField('Mentioned User', `${message.mentions.members.first()}`)
				.addField('User', `${message.author} **|** ${message.author.id}`, false)
				.addField('Msg', `${message.channel}(**[link](${message.url})**)\n\n**Contents:** ${message}`)
				.setTimestamp()
				.setFooter('OwO');
			await generalLogChannel.send(mentionlogembed);
		} else {
			return;
		}
	}
}
