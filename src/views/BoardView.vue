<script setup lang="ts">
// import FooterView from "../components/FooterView.vue";
import CursorView from "../components/CursorView.vue";
import useStore from "../stores/useStore";
import NoteView from "../components/NoteView.vue";
import BoardListItem from "../components/BoardListItem.vue";
import BoardHeader from "../components/BoardHeader.vue";

const store = useStore();

const addNewNote = (e: MouseEvent) => {
  const y = e.clientY + window.scrollY;
  const x = e.clientX + window.scrollX;
  store.newNote({
    x,
    y,
  });
};

const newBoard = () => {
  store.newBoard();
  store.boardsListOpen = false;
};
</script>
<template>
  <div class="board-container">
    <BoardHeader />
    <Transition name="fade">
      <div
        @click="() => (store.boardsListOpen = false)"
        v-if="store.boardsListOpen"
        class="boards-list-backdrop"
      ></div>
    </Transition>
    <Transition name="slideRight">
      <div v-if="store.boardsListOpen" class="boards-list">
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
              stroke-width="1"
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
    </Transition>
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
