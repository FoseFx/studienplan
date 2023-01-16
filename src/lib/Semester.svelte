<script lang="ts">
  export let title: string;
  export let disabled: boolean;
  export let cp: number;
</script>

<style>
.semester {
  @apply flex flex-col shrink-0 w-60 h-full;
}
.title {
  @apply text-center font-bold text-2xl my-4 relative;
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
.title:hover button {
  opacity: 1;
}
.disabled {
  opacity: 0.3;
}
.cp {
  @apply text-right text-lg pr-2;
}
</style>

<div class="semester" class:disabled={disabled} on:drop on:dragover>
  <span class="title ">
    { title }
    <button on:click>
      +
    </button>
  </span>
  <slot></slot>
  <span class="cp">
    {cp} CP<br/>
  </span>
</div>
