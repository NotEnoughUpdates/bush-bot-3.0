import {
	AllowedMentions,
	BushCommand,
	clientSendAndPermCheck,
	emojis,
	format,
	Moderation,
	ordinal,
	userGuildPermCheck,
	warnResponse,
	type ArgType,
	type CommandMessage,
	type OptArgType,
	type SlashMessage
} from '#lib';
import assert from 'assert';
import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';

export default class WarnCommand extends BushCommand {
	public constructor() {
		super('warn', {
			aliases: ['warn'],
			category: 'moderation',
			description: 'Warn a user.',
			usage: ['warn <member> [reason]'],
			examples: ['warn @Tyman being cool'],
			args: [
				{
					id: 'user',
					description: 'The user to warn.',
					type: 'user',
					prompt: 'What user would you like to warn?',
					retry: '{error} Choose a valid user to warn.',
					slashType: ApplicationCommandOptionType.User
				},
				{
					id: 'reason',
					description: 'The reason for the warn.',
					match: 'rest',
					prompt: 'Why should this user be warned?',
					retry: '{error} Choose a valid warn reason.',
					slashType: ApplicationCommandOptionType.String,
					optional: true
				},
				{
					id: 'force',
					description: 'Override permission checks.',
					flag: '--force',
					match: 'flag',
					optional: true,
					slashType: false,
					only: 'text',
					ownerOnly: true
				}
			],
			slash: true,
			channel: 'guild',
			clientPermissions: (m) => clientSendAndPermCheck(m),
			userPermissions: (m) => userGuildPermCheck(m, [PermissionFlagsBits.ManageMessages])
		});
	}

	public override async exec(
		message: CommandMessage | SlashMessage,
		{ user, reason, force = false }: { user: ArgType<'user'>; reason: OptArgType<'string'>; force?: ArgType<'flag'> }
	) {
		assert(message.inGuild());
		assert(message.member);

		const member = message.guild.members.cache.get(user.id);
		if (!member) return message.util.reply(`${emojis.error} I cannot warn users that are not in the server.`);
		const useForce = force && message.author.isOwner();
		const canModerateResponse = await Moderation.permissionCheck(message.member, member, 'warn', true, useForce);

		if (canModerateResponse !== true) {
			return message.util.reply(canModerateResponse);
		}

		const { result: response, caseNum } = await member.bushWarn({
			reason,
			moderator: message.member
		});

		const responseMessage = (): string => {
			const victim = format.input(member.user.tag);
			switch (response) {
				case warnResponse.MODLOG_ERROR:
					return `${emojis.error} While warning ${victim}, there was an error creating a modlog entry, please report this to my developers.`;
				case warnResponse.ACTION_ERROR:
				case warnResponse.DM_ERROR:
					return `${emojis.warn} ${victim} has been warned for the ${ordinal(
						caseNum ?? 0
					)} time, however I could not send them a dm.`;
				case warnResponse.SUCCESS:
					return `${emojis.success} Successfully warned ${victim} for the ${ordinal(caseNum ?? 0)} time.`;
				default:
					return `${emojis.error} An error occurred: ${format.input(response)}}`;
			}
		};
		return await message.util.reply({ content: responseMessage(), allowedMentions: AllowedMentions.none() });
	}
}
