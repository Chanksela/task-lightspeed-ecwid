<template>
	<main>
		<div class="hero">
			<h1>Welcome to Ecwid Store</h1>
			<p>Here you can buy anything with Ease</p>
			<RouterLink to="/store" class="btn btn-primary">Browse Store</RouterLink>
		</div>
	</main>
</template>

<style scoped>
	.hero {
		max-width: 600px;
		margin: 4rem auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2rem;
	}
</style>
