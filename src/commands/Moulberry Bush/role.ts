import { BushCommand } from '../../lib/extensions/BushCommand';
import AllowedMentions from '../../lib/utils/AllowedMentions';
import { Message, Role, GuildMember } from 'discord.js';
import { Argument } from 'discord-akairo';

export default class RoleCommand extends BushCommand {
	constructor() {
		super('role', {
			aliases: ['role', 'addrole', 'removerole'],
			category: "Moulberry's Bush",
			description: {
				content: "Manages users' roles.",
				usage: 'role <add|remove> <user> <role>',
				examples: ['role add tyman adminperms']
			},
			clientPermissions: ['MANAGE_ROLES', 'EMBED_LINKS', 'SEND_MESSAGES'],
			channel: 'guild',
			typing: true
		});
	}
	*args(): unknown {
		const action: 'add' | 'remove' = yield {
			id: 'action',
			type: Argument.union('add', 'remove'),
			prompt: {
				start: 'Would you like to `add` or `remove` a role?',
				retry: '<:no:787549684196704257> Choose whether you would you like to `add` or `remove` a role.'
			}
			//unordered: false
		};
		let action2;
		if (action === 'add') action2 = 'to';
		else if (action === 'remove') action2 = 'from';
		else action2 = 'aaaaaaaa';
		const user = yield {
			id: 'user',
			type: 'member',
			prompt: {
				start: `What user do you want to ${action} the role ${action2}?`,
				retry: `<:no:787549684196704257> Choose a valid user to ${action} the role ${action2}.`
			}
			//unordered: true
		};
		const role = yield {
			id: 'role',
			type: 'role',
			match: 'restContent',
			prompt: {
				start: `What role do you want to ${action}?`,
				retry: `<:no:787549684196704257> Choose a valid role to ${action}.`
			}
			//unordered: true
		};
		return { action, user, role };
	}

	// eslint-disable-next-line require-await
	public async exec(message: Message, { action, user, role }: { action: 'add' | 'remove'; user: GuildMember; role: Role }): Promise<unknown> {
		if (!message.member.permissions.has('MANAGE_ROLES')) {
			let mappedRole: { name: string; id: string };
			for (let i = 0; i < this.client.consts.roleMap.length; i++) {
				const a = this.client.consts.roleMap[i];
				if (a.id == role.id) mappedRole = a;
			}
			if (!mappedRole || !this.client.consts.roleWhitelist[mappedRole.name]) {
				return message.util.reply(`<:no:787549684196704257> <@&${role.id}> is not whitelisted, and you do not have manage roles permission.`, {
					allowedMentions: AllowedMentions.none()
				});
			}
			const allowedRoles = this.client.consts.roleWhitelist[mappedRole.name].map(r => {
				for (let i = 0; i < this.client.consts.roleMap.length; i++) {
					if (this.client.consts.roleMap[i].name == r) return this.client.consts.roleMap[i].id;
				}
				return;
			});
			if (!message.member.roles.cache.some(role => allowedRoles.includes(role.id))) {
				return message.util.reply(`<:no:787549684196704257> <@&${role.id}> is whitelisted, but you do not have any of the roles required to manage it.`, {
					allowedMentions: AllowedMentions.none()
				});
			}
		}
		// no checks if the user has MANAGE_ROLES
		if (action == 'remove') return removeRole();
		else if (action == 'add') return addRole();
		async function addRole(): Promise<Message> {
			const success = await user.roles.add(role.id).catch(() => {});
			if (success) return message.util.reply(`<:yes:787549618770149456> Successfully added <@&${role.id}> to <@!${user.id}>!`, { allowedMentions: AllowedMentions.none() });
			else return message.util.reply(`<:no:787549684196704257> Could not add <@&${role.id}> to <@!${user.id}>.`, { allowedMentions: AllowedMentions.none() });
		}
		async function removeRole(): Promise<Message> {
			const success = await user.roles.remove(role.id).catch(() => {});
			if (success)
				return message.util.reply(`<:yes:787549618770149456> Successfully removed <@&${role.id}> from <@!${user.id}>!`, { allowedMentions: AllowedMentions.none() });
			else return message.util.reply(`<:no:787549684196704257> Could not remove <@&${role.id}> from <@!${user.id}>.`, { allowedMentions: AllowedMentions.none() });
		}
	}
}
