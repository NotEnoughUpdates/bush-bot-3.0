import { Model } from 'sequelize';

export abstract class BaseModel<A, B> extends Model<A, B> {
	/**
	 * The date when the row was created.
	 */
	public declare readonly createdAt: Date;

	/**
	 * The date when the row was last updated.
	 */
	public declare readonly updatedAt: Date;
}
