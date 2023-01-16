<script lang="ts">
  export let title: string;
</script>

<style>
.semester {
  @apply flex flex-col w-72 h-full;
}
span {
  position: relative;
}
button {
  content: '+';
  display: block;
  position: absolute;
  top: 0;
  height: 100%;
  right: 0.1rem;
  @apply flex items-center justify-center;
  opacity: 0;
  transition: opacity 0.2s linear;
}
span:hover button {
  opacity: 1;
}
</style>

<div class="semester" on:drop on:dragover>
  <span class="text-center font-bold text-2xl my-4">
    { title }
    <button on:click>
      +
    </button>
  </span>
  <slot></slot>
</div>
