<template>
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
</template>
<script setup lang="ts">
	import { ref } from "vue";
	const getShowValue = localStorage.getItem("show_widget");
	const showWidget = ref(
		!getShowValue || getShowValue === "true" ? true : false
	);
	const handleWidgetToggle = () => {
		localStorage.setItem("show_widget", showWidget.value.toString());
		console.log("toggled");
	};
</script>
