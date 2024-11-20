<template>
	<div>
		<h1>Custom Widget</h1>
	</div>
</template>
<script setup>
	import { onMounted } from "vue";

	function fetchProducts() {
		fetch(
			"https://app.ecwid.com/api/v3/101560752/products?limit=5&sortBy=UPDATED_TIME_DESC",
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer public_eaBDuVmrse1hKZun4qaPF3LewugrnEgq",
				},
			}
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
			});
	}
	onMounted(() => {
		fetchProducts();
	});
</script>
