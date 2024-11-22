<template>
	<div class="a-card product-card">
		<div class="product-info__wrap">
			<img :src="product.thumbnailUrl" />
			<h5>{{ product.name }}</h5>
			<div class="muted">${{ product.price }}</div>
			<button class="btn btn-primary btn-small" @click="addToCart">Buy</button>
		</div>
	</div>
</template>
<script setup lang="ts">
	const props = defineProps<{
		product: {
			id: number;
			name: string;
			price: number;
			thumbnailUrl: string;
		};
	}>();
	function addToCart() {
		Ecwid.OnAPILoaded.add(function () {
			Ecwid.Cart.addProduct(props.product.id);
		});
	}
</script>
<style scoped>
	.product-info__wrap {
		display: flex;
		flex-flow: column;
		justify-content: space-between;
		gap: 1rem;
		height: 100%;
	}
	.btn {
		padding: 0 1rem !important;
		background-color: #275ce0 !important;
	}
</style>
