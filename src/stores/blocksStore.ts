import { defineStore } from "pinia";
import { ref, watch } from "vue";

export interface Block {
	type: string;
	color: string;
	durability: number;
}

export enum BlockTypes {
	Dirt = "DIRT",
	Iron = "IRON",
	Gold = "GOLD",
	Diamond = "DIAMOND",
	RedStone = "RED_STONE",
	Player = "PLAYER",
	Void = "VOID",
}

interface BlockType {
	type: string;
	propability: number;
	color: string;
	durability: number;
}

export const useBlocksStore = defineStore("blocksStore", () => {
	const blockTypes: BlockType[] = [
		{ type: BlockTypes.Dirt, propability: 0.6, color: "brown", durability: 1 },
		{
			type: BlockTypes.Iron,
			propability: 0.15,
			color: "silver",
			durability: 5,
		},
		{ type: BlockTypes.Gold, propability: 0.08, color: "gold", durability: 10 },
		{
			type: BlockTypes.Diamond,
			propability: 0.03,
			color: "lightblue",
			durability: 15,
		},
		{
			type: BlockTypes.RedStone,
			propability: 0.1,
			color: "red",
			durability: 7,
		},
	];
	const blocks = ref<Map<string, Block>>(new Map());
	const setBlock = (coordinates: string, block: Block) => {
		blocks.value.set(coordinates, block);
	};
	const createBlock = (): Block => {
		const generatedType = generateType(blockTypes);
		return {
			type: generatedType.type,
			color: generatedType.color,
			durability: generatedType.durability,
		};
	};

	const generateType = (options: BlockType[]): BlockType => {
		let i: number = 0;

		let propabilities: number[] = [];

		for (i = 0; i < options.length; i++)
			propabilities[i] = options[i].propability + (propabilities[i - 1] || 0);

		let random = Math.random() * propabilities[propabilities.length - 1];

		for (i = 0; i < propabilities.length; i++)
			if (propabilities[i] > random) break;

		return options[i];
	};

	const generateBlocksGrid = (dimentions: number[]) => {
		blocks.value = new Map();

		const [x, y] = dimentions;

		for (let i = 1; i <= x; i++) {
			for (let j = 1; j <= y; j++) {
				setBlock(`${i}|${j}`, createBlock());
			}
		}
	};

	return {
		blocks,
		generateBlocksGrid,
		setBlock,
	};
});
