<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePlayerStore } from "../stores/playerStore";
const playerStoreInstance = usePlayerStore();
const { dugBlocks, durability } = storeToRefs(playerStoreInstance);
</script>

<template>
	<header
		class="text-white flex items-center justify-between p-4 py-2 bg-zinc-700 bg-opacity-80 absolute w-full"
	>
		<div class="flex items-center gap-2">
			<h2 class="font-bold">Drill durability: {{ durability }}</h2>
			<button
				@click="playerStoreInstance.repairDrill()"
				v-if="durability <= 0"
				class="bg-emerald-800 p-2 rounded-md font-bold w-48 shadow-md"
			>
				Repair: 5 dirt | 1 gold
			</button>
		</div>
		<div class="flex gap-3">
			<article
				class="flex flex-col font-bold"
				v-for="(name, value) in dugBlocks"
			>
				<span>{{ value }}</span>
				<span class="text-center">{{ name }}</span>
			</article>
		</div>
	</header>
</template>

<style></style>
