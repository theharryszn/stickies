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
      <span class="flex space-x-1">
        <span>{{ store.activeBoard.notes.length }}</span>
        <span class="label"
          >Note<span v-if="store.activeBoard.notes.length > 1">s</span></span
        ></span
      >
      <span class="boards-btn" @click="store.clear"
        ><span class="label">Clear All</span>
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          ></path>
        </svg>
      </span>
    </div>
  </div>
</template>
