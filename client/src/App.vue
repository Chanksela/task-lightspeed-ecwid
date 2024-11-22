<script setup lang="ts">
	import { RouterView } from "vue-router";
	import Navbar from "./components/Navbar.vue";
	import { onMounted } from "vue";
	onMounted(() => {
		!localStorage.getItem("show_widget") &&
			localStorage.setItem("show_widget", "true");
	});
</script>

<template>
	<Navbar />
	<RouterView />
</template>
