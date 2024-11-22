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
		console.log("ID", props.product.id);
		console.log("quantity", props.product.id);
		console.log("options", props.product.id);
		console.log("selectedPrice", props.product.id);
		console.log("recurringChargeSettings", props.product.id);

		Ecwid.Cart.addProduct(
			props.product.id,
			(
				success: boolean,
				product: typeof props.product,
				cart: any,
				error: string
			) => {
				if (success) {
					console.log("Product added", product);
					console.log("Renewed Cart", cart);
				} else {
					console.log(error);
				}
			}
		);
		// Ecwid.OnAPILoaded.add(function () {
		// 	Ecwid.OnPageLoaded.add(function () {
		// 	});
		// });
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
