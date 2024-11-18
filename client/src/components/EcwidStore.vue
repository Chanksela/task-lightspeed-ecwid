<script setup lang="ts">
	import { onMounted } from "vue";

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

		Ecwid.OnPageLoaded.add(function (page) {
			// Ecwid.openPage("products");
			console.log("page loaded");
			console.log(document.querySelector(".ec-footer"));
			console.log(typeof localStorage.getItem("show_widget"));
			if (page.type === "CART") {
				const footerElement = document.querySelector(".ec-footer");
				const newElement = document.createElement("div");
				newElement.textContent = "Custom Widget";
				if (
					footerElement !== null &&
					localStorage.getItem("show_widget") === "true"
				) {
					footerElement.parentNode.insertBefore(newElement, footerElement);
				}
			}
		});
	};

	onMounted(() => {
		injectEcwidScript(props.storeId);
	});
</script>
<template>
	<div :id="`my-store-${storeId}`"></div>
</template>
