import Dexie from 'dexie';

import { Quest } from '$lib/quest';
import { useSerialization } from './db/serialization';

class QuestDb extends Dexie {
	quests!: Dexie.Table<Quest, number>;

	public constructor() {
		super('QuestPlannerDb');
		this.version(2).stores({
			quests: '++id,is_completed,target_completion_datetime'
		});
		this.use(useSerialization({ quests: (val: Quest) => new Quest(val) }));
	}
}

export const db = new QuestDb();
