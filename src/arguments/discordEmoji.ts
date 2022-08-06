import { regex, type BushArgumentTypeCaster } from '#lib';
import type { Snowflake } from 'discord.js';

export const discordEmoji: BushArgumentTypeCaster<DiscordEmojiInfo | null> = (_, phrase) => {
	if (!phrase) return null;
	const validEmoji: RegExpExecArray | null = regex.discordEmoji.exec(phrase);
	if (!validEmoji || !validEmoji.groups) return null;
	return { name: validEmoji.groups.name, id: validEmoji.groups.id };
};

export interface DiscordEmojiInfo {
	name: string;
	id: Snowflake;
}
