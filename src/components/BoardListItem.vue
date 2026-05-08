<script setup lang="ts">
import { PhX } from "@phosphor-icons/vue";
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
  store.haptic("selection");
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
      @click.stop="deleteBoard"
      :style="{ backgroundColor: style.backgroundColor }"
    >
      <PhX :size="12" weight="bold" />
    </button>
    <div @click="click" class="board-list-item-content">
      {{ board.title }}
    </div>
  </div>
</template>
