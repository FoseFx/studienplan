<script lang="ts">
  import type { DragEventHandler } from "svelte/elements/index"
	import { ModuleArea, type Module } from "./types";

	export let module: Module;
	export let dragstart: DragEventHandler<HTMLDivElement>;

  let className = "tile";
  $: className = "tile " + ModuleArea[module.area]
</script>

<style>
.Praktische { background: rgb(0, 84, 159); }
.Technische { background: rgb(0, 152, 161); }
.Theoretische { background: rgb(0, 97, 101); }
.Mathe { background: rgb(161, 16, 53); }
.Sonstiges { background: rgb(97, 33, 88); }
.Wahl { background: rgb(122, 111, 172); }

.tile {
  @apply text-white min-h-16 m-1 p-2 gap-2 flex justify-between items-center text-lg font-bold rounded-sm cursor-move;
}
</style>

<div class="{className}" draggable={true} on:dragstart={dragstart}>
  <div>{module.title}</div>
  <div class="flex-shrink-0">{module.credits} CP</div>
</div>
