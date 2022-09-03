<script setup lang="ts">
import { onMounted, ref } from "vue";

const style = ref({
  top: "0px",
  left: "0px",
  opacity: 0,
});

const move = (top: number, left: number) => {
  style.value.opacity = 1;
  style.value.top = `${top}px`;
  style.value.left = `${left}px`;
};

onMounted(() => {
  window.addEventListener("mousemove", (e) => {
    const x = e.pageX - window.scrollX;
    const y = e.pageY - window.scrollY;
    move(y, x);
  });
});
</script>
<template>
  <div class="cursor" :style="style"></div>
</template>
