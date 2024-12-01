<template>
	<div>
		<div class="a-card a-card--vertical-compact">
			<div class="a-card__paddings">
				<div class="iconable-block iconable-block--hide-in-mobile">
					<div class="iconable-block__infographics">
						<span class="iconable-block__icon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="#275ce0"
								stroke="#275ce0"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<circle cx="9" cy="21" r="1" />
								<circle cx="20" cy="21" r="1" />
								<path
									d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
								/>
							</svg>
						</span>
					</div>
					<div class="iconable-block__content">
						<div class="status-block">
							<div class="status-block__central">
								<div class="status-block__header">
									<span class="status-block__title">Storefront Widget</span>
									<span class="status-block__edit">Edit</span>
								</div>
								<div class="status-block__content">
									<p>Show "Buy more Products" block on cart page</p>
								</div>
							</div>
							<div class="status-block__primary-action">
								<label class="checkbox big">
									<input
										name=""
										type="checkbox"
										v-model="showWidget"
										@change="handleWidgetToggle"
									/>
									<div>
										<div></div>
									</div>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<input type="number" v-model="numberOfProducts" min="1" />
		</div>
		<div class="grid-product__wrap">
			<div
				v-for="product in products"
				:key="product.id"
				class="a-card product-card"
			>
				<div class="product-info__wrap">
					<div>
						<input
							:checked="productIsChecked(product)"
							type="checkbox"
							:name="product.name"
							:id="product.id.toString()"
							@change="handleCheckbox(product)"
						/>
					</div>
					<div>
						<img
							:src="product.thumbnailUrl"
							:alt="product.name"
							height="200px"
						/>
						<h4>{{ product.name }}</h4>
					</div>
				</div>
			</div>
		</div>
		<div>
			<button @click="handelExport" class="btn btn-medium btn-default">
				Download as CSV
			</button>
		</div>
	</div>
</template>
<script setup lang="ts">
	import { onMounted, ref, watch } from "vue";
	import type { ExportableProductList, Product } from "@/shared/types";
	import { fetchProducts } from "@/utils/fetchProducts";

	const getShowValue = localStorage.getItem("show_widget");
	const showWidget = ref(
		!getShowValue || getShowValue === "true" ? true : false
	);

	const products = ref<Product[]>([]);
	const numberOfProducts = ref(
		localStorage.getItem("number_of_products") || "5"
	);
	const selectedProducts = ref<ExportableProductList[]>([]);

	const handelExport = async () => {
		if (selectedProducts.value.length > 0) {
			try {
				const response = await fetch("http://localhost:3000/api/export", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ exportableProducts: selectedProducts.value }),
				});

				if (response.ok) {
					// Process the response as a Blob
					const blob = await response.blob();
					const url = window.URL.createObjectURL(blob);

					// Create a temporary link to download the file
					const link = document.createElement("a");
					link.href = url;
					link.download = "products.csv"; // Set the filename
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					window.URL.revokeObjectURL(url); // Clean up the object URL
				} else {
					console.error("Error: ", response.statusText);
					alert("Failed to export. Please try again.");
				}
			} catch (error) {
				console.error("Error while exporting: ", error);
			}
		} else {
			alert("Please select products before trying to download...");
		}
	};

	const productIsChecked = (product: Product) => {
		return selectedProducts.value.some((p) => p.id === product.id);
	};

	const handleWidgetToggle = () => {
		localStorage.setItem("show_widget", showWidget.value.toString());
		console.log("toggled");
	};

	function handleCheckbox(product: Product) {
		const existingProductIndex = selectedProducts.value.findIndex(
			(p) => p.id === product.id
		);
		if (existingProductIndex === -1) {
			selectedProducts.value.push(product);
		} else {
			selectedProducts.value.splice(existingProductIndex, 1);
		}
		console.log(selectedProducts.value);
	}

	async function loadProducts() {
		try {
			const fetchedProducts = await fetchProducts(
				numberOfProducts.value,
				"UPDATED_TIME_DESC"
			);
			products.value = fetchedProducts;
		} catch (error) {
			console.error("Failed to fetch products:", error);
		}
	}

	watch(numberOfProducts, () => {
		localStorage.setItem(
			"number_of_products",
			numberOfProducts.value.toString()
		);
		loadProducts();
	});
	onMounted(() => {
		if (
			!localStorage.getItem("number_of_products") ||
			localStorage.getItem("number_of_products") === undefined
		) {
			localStorage.setItem("number_of_products", "5");
		}
		loadProducts();
	});
</script>
<style scoped>
	.grid-product__wrap {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 20px;
		margin-top: 20px;
	}
	.product-info__wrap {
		display: flex;
		text-align: center;
	}
</style>
