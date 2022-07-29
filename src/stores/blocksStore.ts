import { defineStore } from "pinia";
import { ref } from "vue";

export interface Block {
	type: string;
	isCorner: boolean;
}

enum BlockTypes {
	Dirt = "DIRT",
	Iron = "IRON",
	Gold = "GOLD",
	Diamond = "DIAMOND",
	RedStone = "RED_STONE",
}

export const useBlocksStore = defineStore("blocksStore", () => {
	const blockTypes = [
		BlockTypes.Dirt,
		BlockTypes.Iron,
		BlockTypes.Gold,
		BlockTypes.Diamond,
		BlockTypes.RedStone,
	];
	const blocks = ref<Map<string, Block>>(new Map());
	const setBlock = (coordinates: string, block: Block) => {
		blocks.value.set(coordinates, block);
	};
	const createBlock = (coordinates: string): Block => {
		const type = generateType();

		return { type, isCorner: false };
	};

	const generateType = (): string => {
		//generate random type with possibilities
	};

	const generateBlocksGrid = (dimentions: number[]) => {
		const [x, y] = dimentions;

		for (let i = 1; i <= x; i++) {
			for (let j = 1; j <= y; j++) {
				setBlock(`${i}${j}`, createBlock(`${i}${j}`));
			}
		}
	};

	return {
		blocks,
		generateBlocksGrid,
	};
});
