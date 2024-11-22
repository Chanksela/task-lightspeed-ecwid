<template>
	<div class="grid-product__wrap">
		<Product v-for="product in products" :product="product" :key="product.id" />
	</div>
</template>
<script setup>
	import { onMounted, ref } from "vue";
	import Product from "./Product.vue";
	let products = ref([]);

	function fetchProducts() {
		fetch(
			"https://app.ecwid.com/api/v3/101560752/products?limit=10&sortBy=UPDATED_TIME_DESC",
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
				products.value = data.items;
				console.log("test", products);
			});
	}
	onMounted(() => {
		fetchProducts();
	});
</script>
<style scoped>
	.grid-product__wrap {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 20px;
		margin-top: 20px;
	}
</style>
