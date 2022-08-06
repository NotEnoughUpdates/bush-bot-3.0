import { BushListener, colors, humanizeDuration, Moderation, ModLogType, sleep, Time, type BushClientEvents } from '#lib';
import { AuditLogEvent, EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export default class ModlogSyncTimeoutListener extends BushListener {
	public constructor() {
		super('modlogSyncTimeout', {
			emitter: 'client',
			event: 'guildMemberUpdate',
			category: 'guild'
		});
	}

	public async exec(...[_oldMember, newMember]: BushClientEvents['guildMemberUpdate']) {
		if (!(await newMember.guild.hasFeature('logManualPunishments'))) return;
		if (!newMember.guild.members.me!.permissions.has(PermissionFlagsBits.ViewAuditLog)) {
			return newMember.guild.error(
				'modlogSyncTimeout',
				`Could not sync the potential manual timeout of ${newMember.user.tag} to the modlog because I do not have the "View Audit Log" permission.`
			);
		}

		const now = new Date();
		await sleep(500 * Time.Millisecond); // wait for audit log entry

		const logs = (await newMember.guild.fetchAuditLogs({ type: AuditLogEvent.MemberUpdate })).entries.filter(
			(entry) => entry.target?.id === newMember.user.id
		);

		const first = logs.first();
		if (!first) return;

		if (!first.executor || first.executor?.bot) return;

		const timeOut = first.changes?.find((changes) => changes.key === 'communication_disabled_until');
		if (!timeOut) return;

		if (Math.abs(first.createdAt.getTime() - now.getTime()) > Time.Minute) {
			throw new Error(`Time is off by over a minute: ${humanizeDuration(Math.abs(first.createdAt.getTime() - now.getTime()))}`);
		}

		const newTime = <string | null>timeOut.new ? new Date(<string>timeOut.new) : null;

		const { log } = await Moderation.createModLogEntry({
			client: this.client,
			type: newTime ? ModLogType.TIMEOUT : ModLogType.REMOVE_TIMEOUT,
			user: newMember.user,
			moderator: first.executor,
			reason: `[Manual] ${first.reason ? first.reason : 'No reason given'}`,
			guild: newMember.guild,
			duration: newTime ? newTime.getTime() - now.getTime() : undefined
		});
		if (!log) throw new Error('Failed to create modlog entry');

		const logChannel = await newMember.guild.getLogChannel('moderation');
		if (!logChannel) return;

		const logEmbed = new EmbedBuilder()
			.setColor(colors[newTime ? 'Orange' : 'Green'])
			.setTimestamp()
			.setFooter({ text: `CaseID: ${log.id}` })
			.setAuthor({
				name: newMember.user.tag,
				iconURL: newMember.user.avatarURL({ extension: 'png', size: 4096 }) ?? undefined
			})
			.addFields(
				{ name: '**Action**', value: `${newTime ? 'Manual Timeout' : 'Manual Remove Timeout'}` },
				{ name: '**User**', value: `${newMember.user} (${newMember.user.tag})` },
				{ name: '**Moderator**', value: `${first.executor} (${first.executor.tag})` },
				{ name: '**Reason**', value: `${first.reason ? first.reason : '[No Reason Provided]'}` }
			);
		return await logChannel.send({ embeds: [logEmbed] });
	}
}
