<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBlocksStore, BlockTypes } from "../stores/blocksStore";
import { onMounted, onUnmounted } from "vue";
import { usePlayerStore, Direction } from "../stores/playerStore";

const blocksStoreInstance = useBlocksStore();
const playerStoreInstance = usePlayerStore();
const { blocks } = storeToRefs(blocksStoreInstance);
const { generateBlocksGrid } = blocksStoreInstance;
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
	<section
		class="flex items-center justify-center w-full h-full flex-col gap-3"
	>
		<div class="main-grid grid w-fit">
			<div v-for="x in boardDimentions[0]">
				<template v-for="y in boardDimentions[1]">
					<div
						class="h-14 w-14 text-white font-bold flex items-center justify-center"
						:style="{ background: blocks?.get(`${x}|${y}`)?.color }"
					>
						{{
							blocks?.get(`${x}|${y}`)?.type === BlockTypes.Player
								? "You"
								: null
						}}
					</div>
				</template>
			</div>
		</div>
	</section>
</template>

<style scoped>
section {
	background: url("../assets/images/mines.jpg");
}
</style>
