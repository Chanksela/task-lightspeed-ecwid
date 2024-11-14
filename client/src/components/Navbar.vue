<script setup lang="ts">
	import { RouterLink } from "vue-router";
</script>

<template>
	<header>
		<div><img src="../assets/lightspeed.svg" alt="" /></div>
		<nav>
			<RouterLink to="/">Home</RouterLink>
			<RouterLink to="/store">Store</RouterLink>
			<RouterLink to="/settings">Settings</RouterLink>
		</nav>
	</header>
</template>

<style scoped>
	header {
		padding: 1rem 1rem;
		display: flex;
		justify-content: space-between;
	}
	nav {
		display: flex;
		justify-self: end;
		justify-content: space-between;
		gap: 1rem;
	}
</style>
