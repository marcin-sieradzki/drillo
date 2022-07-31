<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBlocksStore } from "../stores/blocksStore";
import { onMounted, onUnmounted } from "vue";
import { usePlayerStore, Direction } from "../stores/playerStore";

const blocksStoreInstance = useBlocksStore();
const playerStoreInstance = usePlayerStore();
const { blocks } = storeToRefs(blocksStoreInstance);
const { generateBlocksGrid } = blocksStoreInstance;
const { dugBlocks } = storeToRefs(playerStoreInstance);
const boardDimentions = [14, 13];

generateBlocksGrid(boardDimentions);

const handleKeyDown = (e: KeyboardEvent) => {
	switch (e.key) {
		case "ArrowUp":
			playerStoreInstance.move(Direction.Up);
			break;
		case "ArrowRight":
			playerStoreInstance.move(Direction.Right);
			break;
		case "ArrowLeft":
			playerStoreInstance.move(Direction.Left);
			break;
		case "ArrowDown":
			playerStoreInstance.move(Direction.Down);
			break;
		default:
			break;
	}
};

onMounted(() => {
	const mainGridElement = document.querySelector(".main-grid") as HTMLElement;
	mainGridElement.style.gridTemplateColumns = `repeat(${boardDimentions[0]}, 1fr)`;

	playerStoreInstance.setInitialPosition("1|1");

	document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => document.removeEventListener("keydown", handleKeyDown));
</script>

<template>
	<div
		class="flex items-center justify-center w-full h-full flex-col gap-3 bg-gradient-to-br from-yellow-200 to-yellow-400"
	>
		<div class="flex gap-3">
			<article
				class="flex flex-col font-bold"
				v-for="(name, value) in dugBlocks"
			>
				<span>{{ value }}</span>
				<span class="text-center">{{ name }}</span>
			</article>
		</div>
		<div class="main-grid grid w-fit">
			<div v-for="x in boardDimentions[0]">
				<template v-for="y in boardDimentions[1]">
					<div
						class="h-14 w-14"
						:style="{ background: blocks?.get(`${x}|${y}`)?.color }"
					></div>
				</template>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
