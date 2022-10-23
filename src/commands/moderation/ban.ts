import {
	AllowedMentions,
	Arg,
	banResponse,
	BotCommand,
	castDurationContent,
	emojis,
	format,
	Moderation,
	type ArgType,
	type BanResponse,
	type CommandMessage,
	type OptArgType,
	type SlashMessage
} from '#lib';
import assert from 'assert/strict';
import { ApplicationCommandOptionType, type User } from 'discord.js';

export default class BanCommand extends BotCommand {
	public constructor() {
		super('ban', {
			aliases: ['ban', 'force-ban', 'dban'],
			category: 'moderation',
			description: 'Ban a member from the server.',
			usage: ['ban <member> [reasonAndDuration] [--days <days>]'],
			examples: ['ban ironm00n 1 day commands in #general --delete 7'],
			args: [
				{
					id: 'user',
					description: 'The user that will be banned.',
					type: Arg.union('user', 'snowflake'),
					readableType: 'user|snowflake',
					prompt: 'What user would you like to ban?',
					retry: '{error} Choose a valid user to ban.',
					slashType: ApplicationCommandOptionType.User
				},
				{
					id: 'reason_and_duration',
					description: 'The reason and duration of the ban.',
					type: 'contentWithDuration',
					match: 'rest',
					prompt: 'Why should this user be banned and for how long?',
					retry: '{error} Choose a valid ban reason and duration.',
					slashType: ApplicationCommandOptionType.String,
					optional: true
				},
				{
					id: 'days',
					description: 'The number of days of messages to delete when the user is banned, defaults to 0.',
					flag: ['--days', '--delete'],
					match: 'option',
					prompt: "How many days of the user's messages would you like to delete?",
					retry: '{error} Choose between 0 and 7 days to delete messages from the user for.',
					type: Arg.range('integer', 0, 7, true),
					readableType: 'integer [0, 7]',
					optional: true,
					slashType: ApplicationCommandOptionType.Integer,
					choices: [...Array(8).keys()].map((v) => ({ name: v.toString(), value: v }))
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
			clientPermissions: ['BanMembers'],
			userPermissions: ['BanMembers']
		});
	}

	public override async exec(
		message: CommandMessage | SlashMessage,
		args: {
			user: ArgType<'user' | 'snowflake'>;
			reason_and_duration: OptArgType<'contentWithDuration'> | string;
			days: OptArgType<'integer'>;
			force: ArgType<'flag'>;
		}
	) {
		assert(message.inGuild());
		assert(message.member);

		const { duration, content } = await castDurationContent(args.reason_and_duration, message);

		args.days ??= message.util.parsed?.alias === 'dban' ? 1 : 0;
		const member = message.guild.members.cache.get(typeof args.user === 'string' ? args.user : args.user.id);
		const user =
			member?.user ?? (await this.client.utils.resolveNonCachedUser(typeof args.user === 'string' ? args.user : args.user.id));
		if (!user) return message.util.reply(`${emojis.error} Invalid user.`);
		const useForce = args.force && message.author.isOwner();

		const canModerateResponse = member
			? await Moderation.permissionCheck(message.member, member, Moderation.Action.Ban, true, useForce)
			: true;

		if (canModerateResponse !== true) {
			return await message.util.reply(canModerateResponse);
		}

		if (!Number.isInteger(args.days) || args.days! < 0 || args.days! > 7) {
			return message.util.reply(`${emojis.error} The delete days must be an integer between 0 and 7.`);
		}

		const opts = { reason: content, moderator: message.member, duration: duration, deleteDays: args.days };

		const responseCode = member ? await member.customBan(opts) : await message.guild.customBan({ user, ...opts });

		return await message.util.reply({
			content: BanCommand.formatCode(user, responseCode),
			allowedMentions: AllowedMentions.none()
		});
	}

	public static formatCode(user: User, code: BanResponse): string {
		const victim = format.input(user.tag);
		switch (code) {
			case banResponse.ALREADY_BANNED:
				return `${emojis.error} ${victim} is already banned.`;
			case banResponse.MISSING_PERMISSIONS:
				return `${emojis.error} Could not ban ${victim} because I am missing the **Ban Members** permission.`;
			case banResponse.ACTION_ERROR:
				return `${emojis.error} An error occurred while trying to ban ${victim}.`;
			case banResponse.PUNISHMENT_ENTRY_ADD_ERROR:
				return `${emojis.error} While banning ${victim}, there was an error creating a ban entry, please report this to my developers.`;
			case banResponse.MODLOG_ERROR:
				return `${emojis.error} While banning ${victim}, there was an error creating a modlog entry, please report this to my developers.`;
			case banResponse.DM_ERROR:
				return `${emojis.warn} Banned ${victim} however I could not send them a dm.`;
			case banResponse.SUCCESS:
				return `${emojis.success} Successfully banned ${victim}.`;
			default:
				return `${emojis.error} An error occurred: ${format.input(code)}}`;
		}
	}
}
