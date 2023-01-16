<script lang="ts">
	import Tile from "../lib/Tile.svelte";
	import Board from "../lib/Board.svelte";
	import Semester from "../lib/Semester.svelte";
	import type { Module } from "$lib/types";
	import { modules } from "$lib/modules";

  let state: Module[][] = [
    [modules[0], modules[1], modules[2], modules[3], modules[4]],
    [modules[5], modules[6], modules[7], modules[8], modules[9]],
    [modules[10], modules[11], modules[12], modules[13], modules[23]],
    [modules[14], modules[15], modules[16], modules[17], modules[24]],
    [modules[18], modules[19], modules[20], modules[21], modules[25], modules[26]],
    [modules[22], modules[27], modules[28]]
  ];


  function dragStart(event: DragEvent, fromSemester: number, fromIndex: number) {
		const data = {fromSemester, fromIndex};
   	event.dataTransfer?.setData('text/plain', JSON.stringify(data));
  }

  function drop(event: DragEvent, toSemester: number) {
		event.preventDefault();
    const json = event.dataTransfer!.getData("text/plain");
		const data: {fromSemester: number, fromIndex: number} = JSON.parse(json);

		const [item] = state[data.fromSemester].splice(data.fromIndex, 1);

		state[toSemester].push(item);
		state = state;
	}
</script>

<div class="h-screen">

  <Board>
    {#each state as semester, i}
      <Semester
        title={`${i + 1}. Semester`}
        on:dragover={e => e.preventDefault()}
  		  on:drop={event => drop(event, i)}>
        {#each semester as module, j}
          <Tile
            on:dragstart={event => dragStart(event, i, j)}
            module={module}
          />
        {/each}
      </Semester>
    {/each}
  </Board>

</div>

