// Global ts config for window.
// Avoiding ts errors on window.ec and window.Ecwid
declare global {
	interface Window {
		ec?: {
			config?: {
				baseUrl?: string;
				storefrontUrls?: {
					cleanUrls?: boolean;
				};
			};
		};
		Ecwid: {
			OnPageLoaded: {
				add: (callback: (page: { type: string }) => void) => void;
			};
		};
	}
}
export {};
