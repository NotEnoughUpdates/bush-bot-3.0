import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { BotCommand } from '../../extensions/BotCommand';
import BotClient from '../../extensions/BotClient';
import got from 'got/dist/source';

export default class PriceCommand extends BotCommand {
	public constructor() {
		super('price', {
			aliases: ['price'],
			category: 'info',
			clientPermissions: ['EMBED_LINKS'],
			description: {
				usage: 'price <item id>',
				examples: ['price ASPECT_OF_THE_END'],
				content: 'Finds the lowest bin of an item.',
			},
			ratelimit: 4,
			cooldown: 4000,
			args: [
				{
					id: 'item',
					match: 'content',
					type: 'string',
					prompt: {
						start: 'What item would you like to find the lowest BIN of?',
					},
				},
			],
		});
	}
	public async exec(message: Message, { item }: { item: string }): Promise<Message> {
		const price = JSON.parse((await got.get('http://moulberry.codes/lowestbin.json')).body);
		const item1 = item.toString().toUpperCase();
		const itemstring = item1.replace(/ /g, '_');
		const client = <BotClient>this.client;
		if (price[itemstring]) {
			const prettyPrice = price[itemstring].toLocaleString();
			const priceEmbed = new MessageEmbed();
			priceEmbed.setColor(client.consts.Green).setDescription(`The current lowest bin of \`${itemstring}\` is **${prettyPrice}**.`);
			return message.util.send(priceEmbed);
		} else {
			const errorEmbed = new MessageEmbed();
			errorEmbed.setColor(client.consts.ErrorColor).setDescription(`\`${itemstring}\` is not a valid item id.`);
			return message.util.send(errorEmbed);
		}
	}
}
