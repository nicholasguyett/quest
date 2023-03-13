import Dexie from 'dexie';

import { Quest } from '$lib/quest';

class QuestDb extends Dexie {
	quests!: Dexie.Table<Quest, number>;

	public constructor() {
		super('QuestPlannerDb');
		this.version(1).stores({
			quests: '++id, is_completed'
		});
		this.quests.hook('reading', quest => new Quest(quest));
	}
}

export const db = new QuestDb();
