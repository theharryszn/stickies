<script setup lang="ts">
import { PhHeart, PhX } from "@phosphor-icons/vue";
import { computed, onMounted, onUnmounted, ref } from "vue";
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
    zIndex: props.note.zIndex || 1,
  };
});

const isFiltered = computed(
  () => store.config.focusFavorites && !props.note.loved
);

const bringToTop = (e: MouseEvent) => {
  e.stopPropagation();
  store.bringToTop(noteRef);
};

const inputValue = ref<string>(props.note.content);
const dragging = ref(false);
const deleting = ref(false);

const onInput = (event: Event) => {
  const value = (event.target as HTMLTextAreaElement).value;
  const textareaLines = value.split("\n").length;

  if (textareaLines > 11) {
    inputValue.value = props.note.content;
    return;
  }

  store.updateNoteContent(props.note.id, inputValue.value);
};

const remove = () => {
  deleting.value = true;
  window.setTimeout(() => {
    store.deleteNote(props.note.id);
  }, 120);
};

const love = () => {
  store.love(props.note.id);
};

const toggleColor = () => {
  store.cycleNoteColor(props.note.id);
};

const startDrag = (e: MouseEvent) => {
  e.stopPropagation();
  dragging.value = true;
  store.isDraggingNote = true;
  store.bringToTop(noteRef);
};

const drag = (e: MouseEvent) => {
  if (!dragging.value) {
    return;
  }

  store.moveNote(props.note.id, {
    x: e.movementX / store.config.zoom,
    y: e.movementY / store.config.zoom,
  });
};

const stopDrag = () => {
  dragging.value = false;
  store.isDraggingNote = false;
};

onMounted(() => {
  window.addEventListener("mousemove", drag);
  window.addEventListener("mouseup", stopDrag);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", drag);
  window.removeEventListener("mouseup", stopDrag);
});
</script>
<template>
  <div
    class="note"
    :class="{ 'is-filtered': isFiltered, 'is-deleting': deleting }"
    :id="note.id"
    ref="noteRef"
    :style="style"
    @click="bringToTop"
    @mousedown="bringToTop"
  >
    <div class="note-handle" @mousedown="startDrag"></div>
    <div class="note-options">
      <button
        @click.stop="love"
        class="note-option like"
        :title="note.loved ? 'Remove from favorites' : 'Add to favorites'"
      >
        <PhHeart
          :size="14"
          :weight="note.loved ? 'fill' : 'regular'"
          :class="{ 'heart-icon': note.loved }"
        />
      </button>
      <button
        @click.stop="toggleColor"
        class="note-option color"
        title="Change color"
      >
        <span :style="{ backgroundColor: note.color }"></span>
      </button>
      <button @click.stop="remove" class="note-option delete" title="Delete">
        <PhX :size="14" weight="bold" />
      </button>
    </div>
    <textarea
      class="content"
      placeholder="Write Something"
      maxlength="436"
      v-model="inputValue"
      @input="onInput"
      @click.stop
    ></textarea>
  </div>
</template>
