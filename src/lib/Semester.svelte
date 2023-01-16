<script lang="ts">
  export let title: string;
</script>

<style>
.semester {
  @apply flex flex-col w-72 h-full;
}
</style>

<div class="semester" on:drop on:dragover>
  <span class="text-center font-bold text-2xl my-4">{ title }</span>
  <slot></slot>
</div>
