<script setup lang="ts">
import {
  PhCursor,
  PhCursorText,
  PhHand,
  PhHandGrabbing,
  PhHandPointing,
  PhPlus,
} from "@phosphor-icons/vue";
import { onMounted, onUnmounted, ref } from "vue";
import useStore from "../stores/useStore";

const store = useStore();
type CursorKind =
  | "add"
  | "favorite"
  | "pointer"
  | "text"
  | "hand"
  | "grabbing";

const style = ref({
  top: "0px",
  left: "0px",
  opacity: 0,
});
const cursorKind = ref<CursorKind>("add");

const move = (top: number, left: number) => {
  style.value.opacity = 1;
  style.value.top = `${top}px`;
  style.value.left = `${left}px`;
};

const handleMouseMove = (e: MouseEvent) => {
  const x = e.pageX - window.scrollX;
  const y = e.pageY - window.scrollY;
  const target = e.target instanceof Element ? e.target : null;

  if (store.isDraggingNote || store.isPanningBoard) {
    cursorKind.value = "grabbing";
  } else if (
    target?.closest(
      'input, textarea, [contenteditable="true"], [contenteditable=""]'
    )
  ) {
    cursorKind.value = "text";
  } else if (target?.closest(".note-handle, .board")) {
    cursorKind.value = "hand";
  } else if (
    target?.closest(
      'button, a, [role="button"], [role="switch"], label, select, .board-list-item'
    )
  ) {
    cursorKind.value = "pointer";
  } else if (store.config.focusFavorites) {
    cursorKind.value = "favorite";
  } else {
    cursorKind.value = "add";
  }

  move(y, x);
};

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
});
</script>
<template>
  <div class="cursor" :class="`cursor--${cursorKind}`" :style="style">
    <PhCursorText
      v-if="cursorKind === 'text'"
      class="text-secondary"
      :size="22"
      weight="bold"
    />
    <PhCursor
      v-else-if="cursorKind === 'pointer'"
      class="text-secondary"
      :size="22"
      weight="fill"
    />
    <PhHandGrabbing
      v-else-if="cursorKind === 'grabbing'"
      class="text-secondary"
      :size="22"
      weight="fill"
    />
    <PhHand
      v-else-if="cursorKind === 'hand'"
      class="text-secondary"
      :size="22"
      weight="fill"
    />
    <PhHandPointing
      v-else-if="cursorKind === 'favorite'"
      class="text-secondary"
      :size="20"
      weight="fill"
    />
    <PhPlus
      v-else
      class="text-secondary"
      :size="20"
      weight="bold"
    />
  </div>
</template>
