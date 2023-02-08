import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { Quest } from '$lib/quest';

export class QuestStore {
	protected static lastId = 0;
	protected $all: BehaviorSubject<Map<Quest['id'], Quest>>;

	public constructor() {
		this.$all = new BehaviorSubject(new Map());
	}

	protected static createId() {
		return QuestStore.lastId++;
	}

	public getAll({ is_completed }: { is_completed: boolean }): Observable<Quest[]> {
		return this.$all.pipe(
			map((allQuests) =>
				Array.from(allQuests.values()).filter((quest) => quest.is_completed === is_completed)
			)
		);
	}

	public get(id: Quest['id']): Observable<Quest> {
		return this.$all.pipe(map((allQuests) => allQuests.get[id]));
	}

	public create(quest: Quest): Observable<Quest> {
		return this.$all.pipe(
			take(1),
			map((allQuests) => {
				const newQuest = new Quest({ ...quest, id: QuestStore.createId() });
				allQuests.set(newQuest.id, newQuest);
				this.$all.next(allQuests);
				alert('Updating new quest');
				window.$all = this.$all;
				window.allQuests = allQuests;

				return newQuest;
			})
		);
	}

	public update(quest: Quest): Observable<Quest> {
		return this.$all.pipe(
			take(1),
			map((allQuests) => {
				const newQuest = new Quest(quest);
				allQuests.set(newQuest.id, newQuest);
				this.$all.next(allQuests);

				return newQuest;
			})
		);
	}

	public remove(id): Observable<Quest> {
		return this.$all.pipe(
			take(1),
			map((allQuests) => {
				allQuests.delete(id);
				this.$all.next(allQuests);

				return null;
			})
		);
	}
}

export const quest_store = new QuestStore();
