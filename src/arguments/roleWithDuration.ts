import { Arg, BushArgumentTypeCaster, parseDuration } from '#lib';
import type { Role } from 'discord.js';

export const roleWithDuration: BushArgumentTypeCaster<Promise<RoleWithDuration | null>> = async (message, phrase) => {
	// eslint-disable-next-line prefer-const
	let { duration, content } = parseDuration(phrase);
	if (content === null || content === undefined) return null;
	content = content.trim();
	const role = await Arg.cast('role', message, content);
	if (!role) return null;
	return { duration, role };
};

export interface RoleWithDuration {
	duration: number | null;
	role: Role | null;
}
