<script>
	import '../app.css';

	let user = {
		logged_in: true
	};
</script>

<header id="app-header">
	<h1 class="brand">Quest Planner</h1>

	<nav>
		<ul>
			<li>
				{#if user.logged_in}
					<a href="/quests">My Quests</a>
				{/if}
			</li>
		</ul>
	</nav>
</header>

<main id="app-main">
	<slot />
</main>

<footer id="app-footer">
	<nav>
		<ul>
			<li>
				<a href="mailto:hello@questplanner.app">Contact Us</a>
			</li>
		</ul>
	</nav>
</footer>
