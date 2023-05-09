import { db } from '$lib/db';
import { Temporal } from '@js-temporal/polyfill';
import { liveQuery } from 'dexie';
import {
	interval,
	startWith,
	of as ObservableOf,
	from as ObservableFrom,
	map,
	mergeMap,
	switchMap,
	mergeAll,
	delay,
	tap,
	switchAll,
	fromEventPattern as ObservableFromEventPattern
} from 'rxjs';
import type { Quest } from './quest';
import { browser } from '$app/environment';

const QUEST_REMINDER_LOOKAHEAD_MINUTES = 12 * 60;

/**
 * Notification information for a specific quest
 */
export interface QuestReminder {
	id: `quest-reminder:${string}@${string}`;
	title: string;
	options: NotificationOptions;
}

/**
 * Triggers request to user for permission to display notifications
 * @returns Promise
 */
export function requestNotificationsPermissions() {
	return Notification.requestPermission();
}

/**
 * Observable that tracks the current permission for Notifications
 */
export const notificationsEnabled = browser
	? ObservableFrom(
			navigator.permissions.query({ name: 'notifications' }).then((result) => {
				// Permissions change event is only accesible through the result object
				return ObservableFromEventPattern(
					(handler) => result.addEventListener('change', handler),
					(handler) => result.removeEventListener('change', handler),
					() => result.state === 'granted' // result reference updates after change event
				).pipe(startWith(result.state === 'granted'));
			})
	  ).pipe(mergeAll())
	: ObservableOf(false);

/**
 * Creates a live observable the emits a list of all quests in the database with a
 * target_completion_datetime within the provided range
 *
 * @param lowerBound Temporal.PlainDateTime
 * @param upperBound Temporal.PlainDateTime
 * @returns Observable<Quest>
 */
function getQuestsWithTargetCompletionWithin(
	lowerBound: Temporal.PlainDateTime,
	upperBound: Temporal.PlainDateTime
) {
	return liveQuery(() =>
		db.quests
			.where('target_completion_datetime')
			.between(lowerBound.toString(), upperBound.toString())
			.toArray()
	);
}

/**
 * Creates a config object containing the information needed to display a notification
 * for this quest
 * @param quest Quest
 * @returns QuestReminder
 */
function getNotificationConfigFromQuest(quest: Quest): QuestReminder {
	if (!quest.target_completion_datetime)
		throw TypeError('Cannot create notification for quest with undefined target_completion_date');

	return {
		id: `quest-reminder:${quest.id}@${quest.target_completion_datetime.toString()}`,
		title: `Your quest '${quest.title}' is due!`, // TODO add translation
		options: {
			// TODO: Set notification options
		}
	};
}

/**
 *  Observable that emits quest reminder information when a quest reminder should be given
 */
export const questReminderNotifications = browser
	? // Update live query every hour
	  interval(60 * 60 * 1000).pipe(
			startWith(null), // Ensure that db is queried immediately at load time
			map((sentinel) => {
				// Find all quests with target completion dates within the next hour
				const lowerBound = Temporal.Now.plainDateTimeISO();
				const upperBound = lowerBound.add({ minutes: QUEST_REMINDER_LOOKAHEAD_MINUTES });

				return getQuestsWithTargetCompletionWithin(lowerBound, upperBound);
			}),
			switchAll(),
			map((upcomingQuests) => {
				return upcomingQuests.map((upcomingQuest: Quest) => {
					// Milliseconds from now that notification should be displayed
					const reminderDelayMs = upcomingQuest.target_completion_datetime
						?.since(Temporal.Now.plainDateTimeISO())
						.total({ unit: 'millisecond' }) as number;

					// Configure the observable to emit only when the notification should be displayed
					return ObservableOf(getNotificationConfigFromQuest(upcomingQuest)).pipe(
						delay(reminderDelayMs)
					);
				});
			}),
			mergeAll(),
			mergeAll()
	  )
	: ObservableFrom([]); // Disable during SSR
