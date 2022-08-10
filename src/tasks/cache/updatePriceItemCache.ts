import { BushTask, Time } from '#lib';
import got from 'got';
import PriceCommand, { AuctionAverages, Bazaar, LowestBIN } from '../../commands/utilities/price.js';

export default class UpdatePriceItemCache extends BushTask {
	public constructor() {
		super('updatePriceItemCache', {
			delay: 10 * Time.Minute,
			runOnStart: true
		});
	}

	public async exec() {
		const [bazaar, currentLowestBIN, averageLowestBIN, auctionAverages] = (await Promise.all(
			PriceCommand.urls.map(({ url }) => got.get(url).json().catch(undefined))
		)) as [Bazaar?, LowestBIN?, LowestBIN?, AuctionAverages?];

		const itemNames = new Set([
			...Object.keys(averageLowestBIN ?? {}),
			...Object.keys(currentLowestBIN ?? {}),
			...Object.keys(auctionAverages ?? {}),
			...Object.keys(bazaar?.products ?? {})
		]);

		PriceCommand.cachedItemList = [...itemNames];
	}
}
