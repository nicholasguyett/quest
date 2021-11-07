<script>
  export let value;
</script>
<article class="quest-summary">
  <header>{value.title}</header>
  <p>{value.description}</p>
  <button type="button" class="primary">Complete</button>
  <button type="button" class="danger">Abandon</button>
</article>
