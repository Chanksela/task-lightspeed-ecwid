<script setup lang="ts">
	import { createApp, onMounted } from "vue";
	//@ts-ignore
	import ProductsWidget from "./ProductsWidget.vue";
	const props = defineProps({
		storeId: {
			type: Number,
			default: 101560752,
		},
	});

	const injectEcwidScript = (storeId: number) => {
		window.ec = window.ec || {};
		window.ec.config = window.ec.config || {};
		window.ec.config.baseUrl = "/store";
		window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};
		window.ec.config.storefrontUrls.cleanUrls = true;

		const ecwidScript = document.createElement("script");
		ecwidScript.setAttribute("type", "text/javascript");
		ecwidScript.setAttribute("charset", "utf-8");
		ecwidScript.setAttribute("data-cfasync", "false");
		ecwidScript.setAttribute(
			"src",
			`https://app.ecwid.com/script.js?${storeId}&data_platform=code&data`
		);
		ecwidScript.onload = () => injectEcwidProductBrowser(storeId);
		document.head.appendChild(ecwidScript);
	};
	const injectEcwidProductBrowser = (storeId: number) => {
		const ecwidBrowserScript = document.createElement("script");

		ecwidBrowserScript.setAttribute("type", "text/javascript");
		ecwidBrowserScript.setAttribute("charset", "utf-8");
		ecwidBrowserScript.text = `xProductBrowser("categoriesPerRow=3","views=grid(20,3) list(60) table(60)","categoryView=grid","searchView=list","id=my-store-${storeId}");`;
		document.head.appendChild(ecwidBrowserScript);
		Ecwid.OnAPILoaded.add(function () {
			console.log("ecwid api loaded");
			Ecwid.OnPageLoaded.add(function (page) {
				console.log("page loaded");
				// Checking if page is CART
				if (page.type === "CART") {
					// Creating interval to find footer
					const intervalFooter = setInterval(() => {
						const checkFooter = document.querySelector(".ec-footer");
						console.log("check footer: ", checkFooter);
						if (checkFooter) {
							// if footer exists
							if (localStorage.getItem("show_widget") === "true") {
								// and show widget is true, mounting WidgetElement above footer
								const container = document.createElement("div");
								checkFooter.parentNode?.insertBefore(container, checkFooter);

								const app = createApp(ProductsWidget);
								app.mount(container);
							}
							// stopping interval when footer is found and custom widget is loaded
							clearInterval(intervalFooter);
						}
					}, 500);
				}
			});
		});
	};

	onMounted(() => {
		injectEcwidScript(props.storeId);
	});
</script>
<template>
	<div :id="`my-store-${storeId}`"></div>
</template>
