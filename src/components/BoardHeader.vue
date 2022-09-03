<script setup lang="ts">
import useStore from "@/stores/useStore";

const store = useStore();

const changeTitle = () => {
  store.save();
};
</script>
<template>
  <div class="board-header">
    <span class="boards-btn" @click="() => (store.boardsListOpen = true)"
      >Your Boards ({{ store.boards.length }})</span
    >
    <input
      v-model="store.activeBoard.title"
      placeholder="Board Name"
      @input="changeTitle"
    />
    <div class="flex items-center space-x-4">
      <span
        >{{ store.activeBoard.notes.length }} Note<span
          v-if="store.activeBoard.notes.length > 1"
          >s</span
        ></span
      >
      <span class="boards-btn" @click="store.clear">Clear All</span>
    </div>
  </div>
</template>
