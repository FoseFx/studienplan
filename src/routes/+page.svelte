<script lang="ts">
	import Tile from "../lib/Tile.svelte";
	import Board from "../lib/Board.svelte";
	import Semester from "../lib/Semester.svelte";
	import type { Module } from "$lib/types";
	import { modules } from "$lib/modules";

  let state: Module[][] = [
    [modules[1], modules[2], modules[3], modules[4], modules[0]],
    [modules[5], modules[6], modules[7], modules[8], modules[9]],
    [modules[10], modules[11], modules[12], modules[13], modules[23]],
    [modules[14], modules[16], modules[15], modules[17], modules[24]],
    [modules[18], modules[19], modules[20], modules[21], modules[25], modules[26]],
    [modules[22], modules[27], modules[28]]
  ];

  let selected: Module | null = null;

  function sortFn(a: Module, b: Module): number {
    return a.area - b.area;
  }

  function dragStart(event: DragEvent, fromSemester: number, fromIndex: number) {
		const data = {fromSemester, fromIndex};
   	event.dataTransfer?.setData('text/plain', JSON.stringify(data));
    selected = state[fromSemester][fromIndex];
  }

  function drop(event: DragEvent, toSemester: number) {
		event.preventDefault();
    const json = event.dataTransfer!.getData("text/plain");
		const data: {fromSemester: number, fromIndex: number} = JSON.parse(json);

    const item = state[data.fromSemester][data.fromIndex];

    if (possibleSemester(toSemester, item)) {
      state[data.fromSemester].splice(data.fromIndex, 1);
      state[toSemester].push(item);
      state[toSemester].sort(sortFn);
      state = state;
    }

    selected = null;
	}

  function possibleSemester(i: number, selected: Module | null): boolean {
    if (!selected) {
      return true;
    }
    let isWS = i % 2 == 0;
    return (isWS && selected.ws) || (!isWS && selected.ss);
  }

  function add(semester: number) {
    state.splice(semester, 0, []);
    state = state;
  }

  function remove(semester: number) {
    if (state[semester].length != 0) {
      return;
    }
    state.splice(semester, 0);
    state = state;
  }
</script>

<div class="h-screen">
  <Board>
    {#each state as semester, i}
      <Semester
        title={`${i + 1}. Semester`}
        cp={semester.reduce((p, c) => p + c.credits, 0)}
        disabled={!possibleSemester(i, selected)}
        on:dragover={e => e.preventDefault()}
  		  on:drop={event => drop(event, i)}
        on:click={_ => add(i + 1)}>
        {#each semester as module, j}
          <Tile
            on:dragstart={event => dragStart(event, i, j)}
            on:dragend={_ => selected = null}
            module={module}
          />
        {/each}
      </Semester>
    {/each}
  </Board>
</div>
