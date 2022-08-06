import { BushListener, colors, type BushClientEvents } from '#lib';
import { EmbedBuilder } from 'discord.js';

export default class BushUpdateSettingsListener extends BushListener {
	public constructor() {
		super('bushUpdateSettings', {
			emitter: 'client',
			event: 'bushUpdateSettings',
			category: 'member-custom'
		});
	}

	public async exec(...[setting, guild, oldSettings, newSettings, moderator]: BushClientEvents['bushUpdateSettings']) {
		const logChannel = await guild.getLogChannel('moderation');
		if (!logChannel) return;

		const logEmbed = new EmbedBuilder().setColor(colors.Blurple).setTimestamp();

		if (moderator)
			logEmbed.setAuthor({
				name: moderator.user.tag,
				iconURL: moderator.user.avatarURL({ extension: 'png', size: 4096 }) ?? undefined
			});
		logEmbed.addFields({ name: '**Action**', value: `${'Update Settings'}` });
		if (moderator) logEmbed.addFields({ name: '**Moderator**', value: `${moderator} (${moderator.user.tag})` });
		logEmbed.addFields(
			{ name: '**Setting Changed**', value: setting },
			{ name: '**Old Value**', value: await this.client.utils.inspectCleanRedactCodeblock(oldSettings, 'js', undefined, 1024) },
			{ name: '**New Value**', value: await this.client.utils.inspectCleanRedactCodeblock(newSettings, 'js', undefined, 1024) }
		);

		return await logChannel.send({ embeds: [logEmbed] });
	}
}
