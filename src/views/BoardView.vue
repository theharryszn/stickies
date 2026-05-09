<script setup lang="ts">
// import FooterView from "../components/FooterView.vue";
import CursorView from "../components/CursorView.vue";
import useStore from "../stores/useStore";
import NoteView from "../components/NoteView.vue";
import BoardListItem from "../components/BoardListItem.vue";
import BoardHeader from "../components/BoardHeader.vue";
import SettingsModal from "../components/SettingsModal.vue";
import ConfirmClearBoardModal from "../components/ConfirmClearBoardModal.vue";
import { PhMagnifyingGlass, PhPlus } from "@phosphor-icons/vue";
import { computed, ref } from "vue";

const store = useStore();
const canvasRef = ref<HTMLDivElement | null>(null);
const boardSearch = ref("");
const panning = ref(false);

const canvasStyle = computed(() => ({
  transform: `translate(${store.config.offset.x}px, ${store.config.offset.y}px) scale(${store.config.zoom})`,
  transformOrigin: "0 0",
}));

const boardNotes = computed(() => store.activeBoard.notes);
const filteredBoards = computed(() => {
  const query = boardSearch.value.trim().toLowerCase();

  if (!query) {
    return store.boards;
  }

  return store.boards.filter((board) =>
    board.title.toLowerCase().includes(query),
  );
});

const addNewNote = (e: MouseEvent) => {
  if (store.config.focusFavorites) {
    store.setFocusFavorites(false);
    return;
  }

  const y = (e.clientY - store.config.offset.y) / store.config.zoom;
  const x = (e.clientX - store.config.offset.x) / store.config.zoom;
  store.newNote({
    x,
    y,
  });
};

const newBoard = () => {
  store.newBoard();
  store.boardsListOpen = false;
};

const panBoard = (e: WheelEvent) => {
  store.panCanvas({
    x: e.deltaX,
    y: e.deltaY,
  });
};

const startBoardPan = (e: MouseEvent) => {
  if (e.button !== 1 && !e.shiftKey) {
    return;
  }

  e.preventDefault();
  panning.value = true;
  store.isPanningBoard = true;
};

const moveBoardPan = (e: MouseEvent) => {
  if (!panning.value) {
    return;
  }

  store.panCanvas({
    x: -e.movementX,
    y: -e.movementY,
  });
};

const stopBoardPan = () => {
  panning.value = false;
  store.isPanningBoard = false;
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
        <div class="boards-list-header">
          <div>Boards</div>
          <label class="boards-search" title="Search boards">
            <PhMagnifyingGlass :size="16" />
            <input v-model="boardSearch" placeholder="Search boards" />
          </label>
          <div class="board-list-item" @click="newBoard">
            <PhPlus :size="24" />
          </div>
        </div>
        <div class="boards-list-scroll">
          <BoardListItem
            v-for="board in filteredBoards"
            :key="board.id"
            :board="board"
          />
          <div v-if="filteredBoards.length === 0" class="boards-empty">
            No boards found.
          </div>
        </div>
      </div>
    </Transition>
    <div
      class="board"
      :class="{
        'board--no-grid': !store.config.showGrid,
        'board--focus-favorites': store.config.focusFavorites,
      }"
      @click="addNewNote"
      @mousedown="startBoardPan"
      @mousemove="moveBoardPan"
      @mouseup="stopBoardPan"
      @mouseleave="stopBoardPan"
      @wheel.prevent="panBoard"
    >
      <div ref="canvasRef" class="board-canvas" :style="canvasStyle">
        <NoteView v-for="note in boardNotes" :key="note.id" :note="note" />
      </div>
      <CursorView />
      <Transition name="fade">
        <div v-if="store.config.focusFavorites" class="favorites-banner">
          Showing favorites. Click the board to show everything.
        </div>
      </Transition>
    </div>
    <div class="board-footer">
      <!-- <FooterView /> -->
    </div>
    <SettingsModal />
    <ConfirmClearBoardModal />
  </div>
</template>
