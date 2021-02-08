import { Message , User, MessageEmbed, TextChannel } from 'discord.js';
import { BotCommand} from '../../extensions/BotCommand';

export default class NickCommand extends BotCommand {
	public constructor() {
		super('nick', {
			aliases: ['nick','newNick'],
			category: 'moderation',
			description: {
				content: 'A command to change a user\'s nickname.',
				usage: 'nick <user> [nick]',
				examples: ['nick @user Please Get A New Name'],
			},
			clientPermissions: ['MANAGE_NICKNAMES', 'EMBED_LINKS'],
			userPermissions: ['MANAGE_NICKNAMES'],
			args: [
				{
					id: 'user',
					type: 'user',
					prompt: {
						start: 'What user would you like to nickname?',
					},
				},
				{
					id: 'nick',
					type: 'string',
					prompt: {
						start: 'What should the user be nicknamed?',
						optional: true
					},
					default: 'Moderated Nickname',
				},
			],
			channel: 'guild',
		});
	}
	public async exec(message: Message, { user, nick }: { user: User; nick: string }): Promise<void> {
		const member = message.guild.members.resolve(user);
		await member.setNickname(nick, `Changed by ${message.author.tag}.`);
		const BanEmbed = new MessageEmbed()
			.setDescription(`${user.tag}'s nickname has been changed to \`${nick}\`.`)
			.setColor(this.client.consts.SuccessColor);
		await message.util.send(BanEmbed);
	}
}
