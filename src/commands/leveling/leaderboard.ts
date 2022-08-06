import {
	BushCommand,
	ButtonPaginator,
	chunk,
	clientSendAndPermCheck,
	emojis,
	Level,
	type CommandMessage,
	type OptArgType,
	type SlashMessage
} from '#lib';
import assert from 'assert/strict';
import { ApplicationCommandOptionType, EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export default class LeaderboardCommand extends BushCommand {
	public constructor() {
		super('leaderboard', {
			aliases: ['leaderboard', 'lb'],
			category: 'leveling',
			description: 'View the users with the highest levels in the server.',
			usage: ['leaderboard [page]'],
			examples: ['leaderboard 5'],
			args: [
				{
					id: 'page',
					description: 'The page of the leaderboard to view.',
					type: 'integer',
					prompt: 'What page of the leaderboard would you like to view?',
					retry: '{error} Pick a valid argument.',
					optional: true,
					slashType: ApplicationCommandOptionType.Integer
				}
			],
			slash: true,
			channel: 'guild',
			clientPermissions: (m) => clientSendAndPermCheck(m),
			userPermissions: []
		});
	}

	public override async exec(message: CommandMessage | SlashMessage, args: { page: OptArgType<'integer'> }) {
		assert(message.inGuild());

		if (!(await message.guild.hasFeature('leveling')))
			return await message.util.reply(
				`${emojis.error} This command can only be run in servers with the leveling feature enabled.${
					message.member?.permissions.has(PermissionFlagsBits.ManageGuild)
						? ` You can toggle features using the \`${this.client.utils.prefix(message)}features\` command.`
						: ''
				}`
			);

		const ranks = (await Level.findAll({ where: { guild: message.guild.id } })).sort((a, b) => b.xp - a.xp);
		const mappedRanks = ranks.map(
			(val, index) => `\`${index + 1}\` <@${val.user}> - Level ${val.level} (${val.xp.toLocaleString()} xp)`
		);
		const chunked = chunk(mappedRanks, 25);
		const embeds = chunked.map((c) =>
			new EmbedBuilder().setTitle(`${message.guild.name}'s Leaderboard`).setDescription(c.join('\n'))
		);
		return await ButtonPaginator.send(message, embeds, undefined, true, args.page ?? undefined);
	}
}
