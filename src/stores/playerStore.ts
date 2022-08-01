import { useBlocksStore, BlockTypes, Block } from "./blocksStore";
import { defineStore } from "pinia";
import { Ref, ref, watch } from "vue";

export interface Player {
	position: string;
}

export enum Direction {
	Up = "UP",
	Right = "RIGHT",
	Left = "LEFT",
	Down = "DOWN",
}

export const usePlayerStore = defineStore("playerStore", () => {
	const blocksStoreInstance = useBlocksStore();
	const currentPosition = ref("");
	const lastDugBlock: Ref<Block | null> = ref(null);
	const durability = ref(100);
	const dugBlocks: any = ref({
		[BlockTypes.Dirt]: 0,
		[BlockTypes.Diamond]: 0,
		[BlockTypes.Gold]: 0,
		[BlockTypes.Iron]: 0,
		[BlockTypes.RedStone]: 0,
	});

	const setInitialPosition = (coordinates: string) => {
		if (currentPosition.value === "") {
			currentPosition.value = coordinates;
			replaceBlock(coordinates, BlockTypes.Player);
		}
	};

	const move = (direction: Direction) => {
		const newPosition = generateNewPosition(direction, currentPosition);
		if (!blocksStoreInstance.blocks.has(newPosition)) {
			return;
		}

		const dugBlock = blocksStoreInstance.blocks.get(newPosition) as Block;
		if (durability.value <= 0 && dugBlock.type !== BlockTypes.Void) {
			return;
		}

		lastDugBlock.value = dugBlock;

		replaceBlock(currentPosition.value, BlockTypes.Void);
		replaceBlock(newPosition, BlockTypes.Player);
		currentPosition.value = newPosition;

		durability.value -= dugBlock.durability || 0;
	};

	const generateNewPosition = (
		direction: Direction,
		currentPosition: Ref<string>,
	): string => {
		let newPosition = currentPosition.value.split("|").map((p) => +p);

		if (direction === Direction.Up) {
			newPosition[1] -= 1;
		} else if (direction === Direction.Right) {
			newPosition[0] += 1;
		} else if (direction === Direction.Left) {
			newPosition[0] -= 1;
		} else {
			newPosition[1] += 1;
		}

		return newPosition.join("|").toString();
	};

	const replaceBlock = (
		position: string,
		type: BlockTypes.Player | BlockTypes.Void,
	) => {
		blocksStoreInstance.setBlock(position, {
			color: type === BlockTypes.Player ? "black" : "gray",
			type,
			durability: 0,
		});
	};

	const repairDrill = (): void => {
		if (
			dugBlocks.value[BlockTypes.Dirt] >= 5 &&
			dugBlocks.value[BlockTypes.Gold] >= 1
		) {
			dugBlocks.value[BlockTypes.Dirt] -= 5;
			dugBlocks.value[BlockTypes.Gold] -= 1;
			durability.value = 100;
		}
	};

	watch(lastDugBlock, (block) => {
		if (block && block.type !== BlockTypes.Void) {
			dugBlocks.value[block.type] += 1;
		}
	});

	return {
		currentPosition,
		move,
		dugBlocks,
		setInitialPosition,
		durability,
		repairDrill,
	};
});
