import { BushCommand } from '../../lib/extensions/BushCommand';
import { Message, GuildMember } from 'discord.js';
import { Argument } from 'discord-akairo';

export default class BanCommand extends BushCommand {
	public constructor() {
		super('ban', {
			aliases: ['ban'],
			category: 'moderation',
			description: {
				content: 'A command ban members.',
				usage: 'ban <user> [reason] [days to delete]',
				examples: ['ban @user 2 bad smh']
			},
			clientPermissions: ['BAN_MEMBERS', 'SEND_MESSAGES'],
			userPermissions: ['BAN_MEMBERS'],
			args: [
				{
					id: 'member',
					type: 'member',
					prompt: {
						start: 'What user would you like to ban?',
						retry: '<:error:837123021016924261> Choose a valid user to ban.'
					}
				},
				{
					id: 'reason',
					type: 'string',
					prompt: {
						start: 'Why is the user getting banned?',
						retry: '<:error:837123021016924261> Choose a valid ban reason.',
						optional: true
					},
					default: 'No reason specified.'
				},
				{
					id: 'delDuration',
					type: Argument.range('integer', 0, 7, true),
					prompt: {
						start: 'How many days of messages would you like to delete?',
						retry: '<:error:837123021016924261> Choose a number between 0 and 7.',
						optional: true
					},
					default: 0
				}
			],
			channel: 'guild'
		});
	}
	public async exec(message: Message, { member, reason, delDuration }: { member: GuildMember; reason: string; delDuration: number }): Promise<Message> {
		let reason1: string;
		if (reason == 'No reason specified.') reason1 = `No reason specified. Responsible moderator: ${message.author.username}`;
		else reason1 = `${reason}. Responsible moderator: ${message.author.username}`;
		if (message.member.roles.highest.position <= member.roles.highest.position && !this.client.config.owners.includes(message.author.id)) {
			return message.util.reply(`<:error:837123021016924261> \`${member.user.tag}\` has higher role hierarchy than you.`);
		}
		if (!member?.bannable) return message.util.reply(`<:error:837123021016924261> \`${member.user.tag}\` has higher role hierarchy than me.`);
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		const banned = await member.ban({ days: delDuration, reason: reason1 }).catch(() => {});
		if (!banned) return message.util.reply(`<:error:837123021016924261> There was an error banning \`${member.user.tag}\`.`);
		else return message.util.reply(`<:checkmark:837109864101707807> \`${member.user.tag}\` has been banned.`);
	}
}
