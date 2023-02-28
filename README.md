# Quest Planner

Application is in-development and not ready for production use

A personal task-management system with an RPG theme and specific support for
ADHD-related difficulties.

## Developing

Starting a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production build:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## TODO

- Administration
  - [ ] Create design doc / tech spec
  - [ ] Create documentation
- Core functionality
  - [x] Allow user to create new quests
  - [x] Allow user to mark quests as complete
  - [x] Add confirmation modal for completing quests
  - [ ] Add personal setting to complet button
  - [ ] Allow user to unmark quests as completed
  - [x] Allow user to abandon(delete) quests
  - [x] Add confirmation modal to delete button
  - [ ] Allow user to view completed quests
  - [ ] Allow offline-mode / "install" functionality
  - [ ] Localization support
- Misc
  - [ ] Enable quest categories ("Main Quest" and "Side Quest")
- Sub-quests
  - Allow quests to be created inside a parent quest
  - Allow subquests to marked as optional or required
  - Prevent parent quest from completing if required subquests are in-complete
  - Allow parent quests to auto-complete when sub-quests complete
- "Persistent Notifications"
  - [ ] Add deadlines
  - [ ] Add notification support
  - [ ] Configurable reminder times
  - [ ] Repeatable reminders
  - [ ] Stubborn reminders
- Quest Rewards
  - [ ] Free-text reward descriptions
  - [ ] Tracked rewards as "resources"
  - [ ] Allow rewarded resources to be used as conditions for completing quests
- Quest Chains
  - [ ] Repeatable-quests
    - [ ] Reschedule-on-completion
    - [ ] Repeat per time-unit
  - [ ] Direct follow-up quests
- Hosted/shared quests
  - [ ] Allow user-defined sync servers
  - [ ] Enable hosted accounts with data sync
  - [ ] Allow quests to be recorded in a remote server
  - [ ] Allow read-only sharing of quests
  - [ ] Allow other users to be assigned to a quest
  - [ ] Allow group-quests (needs more design)
