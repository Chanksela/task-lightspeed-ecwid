// Global ts config for window.
// Avoiding ts errors on window.ec and window.Ecwid
declare global {
	let Ecwid: {
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
