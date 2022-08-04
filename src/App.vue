<script setup lang="ts">
import GameBoard from "./components/GameBoard.vue";
import GameHeader from "./components/GameHeader.vue";
</script>

<template>
	<div class="h-full max-h-screen overflow-hidden flex flex-col">
		<GameHeader></GameHeader>
		<GameBoard></GameBoard>
	</div>
</template>

<style>
html,
body,
#app {
	height: 100vh;
	width: 100vw;
}
</style>
