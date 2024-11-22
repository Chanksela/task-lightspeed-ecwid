// Global ts config for window.
// Avoiding ts errors on window.ec and window.Ecwid
export interface Product {
	id: number;
	name: string;
	price: number;
	thumbnailUrl: string;
}
export interface ExportableProductList {
	id: number;
	name: string;
	price: number;
}
declare global {
	let Ecwid: {
		Cart: any;
		OnPageLoaded: {
			add: (callback: (page: { type: string }) => void) => void;
		};
		OnAPILoaded: {
			add: (callback: () => void) => void;
		};
	};
	interface Window {
		ec?: {
			config?: {
				baseUrl?: string;
				storefrontUrls?: {
					cleanUrls?: boolean;
				};
			};
		};
	}
}
export {};
