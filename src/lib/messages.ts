export enum MESSAGE_TYPE {
	IDEMPOTENT_NOTIFICATION = 'idempotent-notification'
}

export interface Message {
	/**
	 * The kind of message being posted
	 */
	type: MESSAGE_TYPE;
}

export interface IdempotentNotification extends Message {
	type: MESSAGE_TYPE.IDEMPOTENT_NOTIFICATION;

	/**
	 * Unique id used to determine duplicate notification messages
	 */
	id: string;

	/**
	 * Display title for notification
	 */
	title: string;

	/**
	 * Options that will be passed to Notification.showNotification
	 */
	options: NotificationOptions;
}
