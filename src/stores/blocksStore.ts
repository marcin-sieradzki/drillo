import { defineStore } from "pinia";

export const useBlocksStore = defineStore("blocksStore", {
	state: () => {
		return {
			blocks: [],
		};
	},
});
