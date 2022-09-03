<script setup lang="ts">
import { computed } from "vue";
import type { Note } from "../stores/useNotesStore";
import useNotesStore from "../stores/useNotesStore";

const store = useNotesStore();
const props = defineProps<{
  note: Note;
}>();

const style = computed(() => {
  return {
    top: `${props.note.coords.y}px`,
    left: `${props.note.coords.x}px`,
    backgroundColor: props.note.color,
  };
});

const bringToTop = (event: MouseEvent) => {
  event.stopPropagation();
  console.log({ ...event.target });
};

const onInput = (content: string) => {
  store.updateNoteContent(props.note.id, content);
};
</script>
<template>
  <div class="note" :style="style" @click="bringToTop">
    <!-- <div class="note-header">
      <svg
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div> -->
    <textarea
      class="content"
      placeholder="Write Something"
      :value="props.note.content"
      @input="(event) => onInput(event.target.value)"
    ></textarea>
  </div>
</template>
