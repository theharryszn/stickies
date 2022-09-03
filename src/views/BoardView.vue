<script setup lang="ts">
import FooterView from "../components/FooterView.vue";
import CursorView from "../components/CursorView.vue";
import useNotesStore from "../stores/useNotesStore";
import NoteView from "../components/NoteView.vue";

const store = useNotesStore();

const addNewNote = (e: MouseEvent) => {
  const boardCoords = (e.target as Element).getBoundingClientRect();
  const y = e.clientY - boardCoords.top;
  const x = e.clientX - boardCoords.left;
  store.newNote({
    x,
    y,
  });
};
</script>
<template>
  <div class="viewport-container">
    <div class="board-header">
      <span>Stickies</span>
      <input value="Untitled" placeholder="Board Name" />
      <span class="add-new-board">
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
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
      </span>
    </div>
    <div class="board" @click="addNewNote">
      <NoteView v-for="note in store.notes" :key="note.id" :note="note" />
      <CursorView />
    </div>
    <FooterView />
  </div>
</template>
