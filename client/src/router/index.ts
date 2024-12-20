import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EcwidStore from "@/components/EcwidStore.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/store/:pathMatch(.*)*",
			name: "store",
			component: EcwidStore,
			beforeEnter(to, from, next) {
				if (from.name !== "store" && window.location.pathname !== to.path) {
					window.location.href = to.fullPath;
				} else {
					next();
				}
			},
		},
		{
			path: "/settings",
			name: "settings",
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import("../views/SettingsView.vue"),
		},
	],
});

export default router;
