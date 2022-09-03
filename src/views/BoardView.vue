<script setup lang="ts">
// import FooterView from "../components/FooterView.vue";
import CursorView from "../components/CursorView.vue";
import useStore from "../stores/useStore";
import NoteView from "../components/NoteView.vue";
import { ref } from "vue";
import BoardListItem from "../components/BoardListItem.vue";

const store = useStore();

const addNewNote = (e: MouseEvent) => {
  const y = e.clientY;
  const x = e.clientX;
  store.newNote({
    x,
    y,
  });
};

const changeTitle = () => {
  store.save();
};

const boardListOpen = ref(false);

const newBoard = () => {
  store.newBoard();
  boardListOpen.value = false;
};
</script>
<template>
  <div class="viewport-container">
    <div class="board-header">
      <span class="boards-btn" @click="() => (boardListOpen = true)"
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
      <div
        v-if="boardListOpen"
        class="boards-list-backdrop"
        @click="() => (boardListOpen = false)"
      ></div>
      <div v-if="boardListOpen" class="boards-list">
        <div>Boards</div>
        <div class="board-list-item" @click="newBoard">
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
        </div>
        <BoardListItem
          v-for="board in store.boards"
          :key="board.id"
          :board="board"
        />
      </div>
    </div>
    <div class="board" @click="addNewNote">
      <NoteView
        v-for="note in store.activeBoard.notes"
        :key="note.id"
        :note="note"
      />
      <CursorView />
    </div>
    <div class="board-footer">
      <!-- <FooterView /> -->
    </div>
  </div>
</template>
