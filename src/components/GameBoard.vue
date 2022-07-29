<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBlocksStore, Block } from "@/stores/blocksStore";

const blocksStoreInstance = useBlocksStore();

const { blocks } = storeToRefs(blocksStoreInstance);
const { generateBlocksGrid } = blocksStoreInstance;
const boardDimentions = [3, 6];
generateBlocksGrid(boardDimentions);
console.log(blocks);
</script>

<template>
	<div class="flex items-center justify-center w-full h-full">
		<div class="grid grid-cols-3 w-fit">
			<div v-for="x in boardDimentions[0]">
				<template v-for="y in boardDimentions[1]">
					<div class="h-32 w-32 border-2">
						{{ blocks.get(`${x}${y}`).type }}
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
