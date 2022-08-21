import { BushTask, Time, updateEveryCache } from '#lib';

export default class UpdateCacheTask extends BushTask {
	public constructor() {
		super('updateCache', {
			delay: 5 * Time.Minute,
			runOnStart: false // done in preinit task
		});
	}

	public async exec() {
		await updateEveryCache(this.client);
		void this.client.logger.verbose(`UpdateCache`, `Updated cache.`);
	}
}
