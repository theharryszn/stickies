<script setup lang="ts">
import { PhGearSix, PhHeart, PhNote, PhTrash } from "@phosphor-icons/vue";
import useStore from "@/stores/useStore";

const store = useStore();

const changeTitle = () => {
  store.save();
};
</script>
<template>
  <div class="board-header">
    <button class="boards-btn" @click="() => (store.boardsListOpen = true)">
      <span>Your Boards</span><span>{{ store.boards.length }}</span>
    </button>
    <input
      class="board-name"
      v-model="store.activeBoard.title"
      placeholder="Board Name"
      @input="changeTitle"
    />
    <div class="board-actions">
      <span class="board-stat" title="Notes">
        <span>{{ store.activeBoard.notes.length }}</span>
        <PhNote :size="16" />
      </span>
      <button
        class="tool-btn favorite-filter"
        :class="{ active: store.config.focusFavorites }"
        @click="store.setFocusFavorites()"
        title="Show favorites"
      >
        <span>{{ store.favoriteNotesCount }}</span>
        <PhHeart
          :size="16"
          :weight="store.favoriteNotesCount ? 'fill' : 'regular'"
          :class="{ 'heart-icon': store.favoriteNotesCount }"
        />
      </button>
      <button
        class="tool-btn"
        @click="store.openClearBoardConfirm"
        title="Clear all notes"
      >
        <PhTrash :size="16" />
      </button>
      <button class="tool-btn" @click="store.openSettings" title="Settings">
        <PhGearSix :size="16" />
      </button>
    </div>
  </div>
</template>
