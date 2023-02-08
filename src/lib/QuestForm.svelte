<script>
  // import { db } from "$lib/db"
  import { Quest } from "$lib/quest"

  export let value;

  let updatedValue = new Quest(value);

  function save() {
    // db.quests.add(updatedValue, updatedValue.id || undefined);
  }
</script>
<form on:submit|preventDefault={save}>
  <label>
    Title: <input value={updatedValue.title} />
  </label>
  <label>
    Description: <input value={updatedValue.description} />
  </label>
  <button class="primary" type="submit">Save</button>
</form>
