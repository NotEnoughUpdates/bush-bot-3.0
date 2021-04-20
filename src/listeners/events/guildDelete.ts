import { BushListener } from '../../lib/extensions/BushListener';
import * as botoptions from '../../config/botoptions';
import log from '../../lib/utils/log';
import { Guild } from 'discord.js';

export default class guildDeleteListener extends BushListener {
	public constructor() {
		super('guildDeleteListener', {
			emitter: 'client',
			event: 'guildDelete', //when the bot joins a guild
			category: 'client'
		});
	}

	public exec(guild: Guild): void {
		if (botoptions.info) {
			log.info('GuildLeave', `Left <<${guild.name}>> with <<${guild.memberCount}>> members.`);
		}
	}
}
