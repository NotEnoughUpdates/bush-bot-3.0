import {
	AllowedMentions,
	BushCommand,
	clientSendAndPermCheck,
	emojis,
	format,
	Moderation,
	removeTimeoutResponse,
	type ArgType,
	type CommandMessage,
	type OptArgType,
	type RemoveTimeoutResponse,
	type SlashMessage
} from '#lib';
import assert from 'assert/strict';
import { ApplicationCommandOptionType, PermissionFlagsBits, type GuildMember } from 'discord.js';

export default class UntimeoutCommand extends BushCommand {
	public constructor() {
		super('untimeout', {
			aliases: ['untimeout', 'remove-timeout'],
			category: 'moderation',
			description: 'Removes a timeout from a user.',
			usage: ['untimeout <user> [reason]'],
			examples: ['untimeout 1 2'],
			args: [
				{
					id: 'user',
					description: 'The user to remove a timeout from.',
					type: 'user',
					prompt: 'What user would you like to untimeout?',
					retry: '{error} Choose a valid user to untimeout.',
					slashType: ApplicationCommandOptionType.User
				},
				{
					id: 'reason',
					description: 'The reason for removing the timeout.',
					type: 'string',
					match: 'rest',
					prompt: 'Why should this user have their timeout removed?',
					retry: '{error} Choose a valid reason to remove the timeout.',
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
			clientPermissions: (m) => clientSendAndPermCheck(m, [PermissionFlagsBits.ModerateMembers]),
			userPermissions: [PermissionFlagsBits.ModerateMembers]
		});
	}

	public override async exec(
		message: CommandMessage | SlashMessage,
		args: { user: ArgType<'user'>; reason: OptArgType<'string'>; force?: ArgType<'flag'> }
	) {
		assert(message.inGuild());
		assert(message.member);

		const member = await message.guild.members.fetch(args.user.id).catch(() => null);
		if (!member)
			return await message.util.reply(`${emojis.error} The user you selected is not in the server or is not a valid user.`);

		if (!member.isCommunicationDisabled()) return message.util.reply(`${emojis.error} That user is not timed out.`);

		const useForce = args.force && message.author.isOwner();
		const canModerateResponse = await Moderation.permissionCheck(message.member, member, 'timeout', true, useForce);

		if (canModerateResponse !== true) {
			return message.util.reply(canModerateResponse);
		}

		const responseCode = await member.bushRemoveTimeout({
			reason: args.reason ?? undefined,
			moderator: message.member
		});

		return await message.util.reply({
			content: UntimeoutCommand.formatCode(member, responseCode),
			allowedMentions: AllowedMentions.none()
		});
	}

	public static formatCode(member: GuildMember, code: RemoveTimeoutResponse): string {
		const victim = format.input(member.user.tag);
		switch (code) {
			case removeTimeoutResponse.MISSING_PERMISSIONS:
				return `${emojis.error} Could not untimeout ${victim} because I am missing the **Timeout Members** permission.`;
			case removeTimeoutResponse.ACTION_ERROR:
				return `${emojis.error} An unknown error occurred while trying to timeout ${victim}.`;
			case removeTimeoutResponse.MODLOG_ERROR:
				return `${emojis.error} There was an error creating a modlog entry, please report this to my developers.`;
			case removeTimeoutResponse.DM_ERROR:
				return `${emojis.warn} Removed ${victim}'s timeout however I could not send them a dm.`;
			case removeTimeoutResponse.SUCCESS:
				return `${emojis.success} Successfully removed ${victim}'s timeout.`;
			default:
				return `${emojis.error} An error occurred: ${format.input(code)}}`;
		}
	}
}
