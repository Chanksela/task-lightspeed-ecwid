<template>
	<div class="grid-product__wrap">
		<Product v-for="product in products" :product="product" :key="product.id" />
	</div>
</template>
<script setup>
	import { onMounted, ref } from "vue";
	import Product from "./Product.vue";
	let products = ref([]);
	let numberOfProducts = ref(
		localStorage.getItem("number_of_products").toString() || 5
	);
	import { fetchProducts } from "@/utils/fetchProducts";

	async function fetchAndSetProducts() {
		try {
			products.value = await fetchProducts(numberOfProducts.value);
		} catch (error) {
			console.log(error);
		}
	}

	onMounted(() => {
		fetchAndSetProducts();
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
