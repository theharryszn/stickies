<script setup lang="ts">
import useStore from "../stores/useStore";

import type { Board } from "../stores/useStore";
import { computed } from "vue";

const store = useStore();
const props = defineProps<{
  board: Board;
}>();

const style = computed(() => {
  return {
    backgroundColor: props.board.color + "aa",
    borderColor: props.board.color,
  };
});

const deleteBoard = () => {
  store.deleteBoard(props.board.id);
};

const click = () => {
  store.config.activeBoardID = props.board.id;
  store.boardsListOpen = false;
  store.save();
};
</script>
<template>
  <div
    class="board-list-item"
    :class="{ active: store.activeBoard.id === board.id }"
    :style="style"
  >
    <button
      v-if="store.boards.length > 1"
      class="delete-board"
      @click="deleteBoard"
      :style="{ backgroundColor: style.backgroundColor }"
    >
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
    <div @click="click" class="board-list-item-content">
      {{ board.title }}
    </div>
  </div>
</template>
