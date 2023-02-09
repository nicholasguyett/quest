export class Quest {
	public id: any;
	public title: string;
	public description: string;
	public is_completed: boolean;

	public constructor(
		{
			id,
			title,
			description,
			is_completed
		}: {
			id: any;
			title: string;
			description: string;
			is_completed: boolean;
		} = { id: undefined, title: '', description: '', is_completed: false }
	) {
		this.id = id || undefined;
		this.title = title || '';
		this.description = description || '';
		this.is_completed = is_completed || false;
	}
}
