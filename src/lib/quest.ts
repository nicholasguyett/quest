import { Temporal } from '@js-temporal/polyfill';

export class Quest {
	public id?: any;
	public title: string;
	public description: string;
	public is_completed: boolean;
	public target_completion_datetime?: Temporal.PlainDateTime;

	public constructor(
		{
			id,
			title,
			description,
			is_completed,
			target_completion_datetime
		}: {
			id: any;
			title: string;
			description: string;
			is_completed: boolean;
			target_completion_datetime?: Temporal.PlainDateTime | string;
		} = {
			id: undefined,
			title: '',
			description: '',
			is_completed: false,
			target_completion_datetime: undefined
		}
	) {
		// Dexie's deep clone implementation breaks Temporal.PlainDateTime
		// Deleting the id if it is undefined prevents dexie from attempting to deepClone
		if (id !== undefined) this.id = id;
		else delete this.id;

		this.title = title || '';
		this.description = description || '';
		this.is_completed = is_completed || false;
		if (target_completion_datetime) {
			this.target_completion_datetime = Temporal.PlainDateTime.from(target_completion_datetime);
		}
	}

	public toJSON() {
		// Ensure that target_completion_datetime is serialized as an iso string
		return {
			...this,
			target_completion_datetime: this.target_completion_datetime?.toString?.()
		};
	}
}
