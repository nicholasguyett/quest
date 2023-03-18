export class Quest {
	public id: any;
	public title: string;
	public description: string;
	public is_completed: boolean;
	public target_completion_datetime?: Date;

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
			target_completion_datetime?: Date;
		} = {
			id: undefined,
			title: '',
			description: '',
			is_completed: false,
			target_completion_datetime: undefined
		}
	) {
		this.id = id || undefined;
		this.title = title || '';
		this.description = description || '';
		this.is_completed = is_completed || false;
		if (target_completion_datetime) {
			this.target_completion_datetime = new Date(target_completion_datetime);
		}
	}
}
