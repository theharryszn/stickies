<script setup lang="ts">
import { computed, ref } from "vue";
import type { Note } from "../stores/useStore";
import useStore from "../stores/useStore";

const store = useStore();
const props = defineProps<{
  note: Note;
}>();

const noteRef = ref<HTMLDivElement | null>(null);

const style = computed(() => {
  return {
    top: `${props.note.coords.y}px`,
    left: `${props.note.coords.x}px`,
    backgroundColor: props.note.color,
    zIndex: store.config.prevID === noteRef.value?.id ? 1000 : 1,
  };
});

const bringToTop = (e: MouseEvent) => {
  e.stopPropagation();
  store.bringToTop(noteRef);
};

const inputValue = ref<string>(props.note.content);

const onInput = () => {
  store.updateNoteContent(props.note.id, inputValue.value);
};

const remove = () => {
  store.deleteNote(props.note.id);
};

const love = () => {
  store.love(props.note.id);
};
</script>
<template>
  <div
    class="note"
    :id="note.id"
    ref="noteRef"
    :style="style"
    @click="bringToTop"
    draggable="true"
  >
    <div class="note-header">
      <button @click="love" class="delete">
        <svg
          class="w-3.5 h-3.5"
          :class="{ 'fill-white stroke-white': note.loved }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          ></path>
        </svg>
      </button>
      <button @click="remove" class="delete">
        <svg
          class="w-3.5 h-3.5"
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
      </button>
    </div>
    <textarea
      class="content"
      placeholder="Write Something"
      v-model="inputValue"
      @input="onInput"
    ></textarea>
  </div>
</template>
