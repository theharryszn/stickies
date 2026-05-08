<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted, onUnmounted } from "vue";
import useStore from "./stores/useStore";

const store = useStore();

const syncSystemTheme = () => {
  if (store.config.theme === "system") {
    store.applyTheme();
  }
};

onMounted(() => {
  store.applyTheme();
  window
    .matchMedia?.("(prefers-color-scheme: dark)")
    .addEventListener("change", syncSystemTheme);
});

onUnmounted(() => {
  window
    .matchMedia?.("(prefers-color-scheme: dark)")
    .removeEventListener("change", syncSystemTheme);
});
</script>

<template>
  <RouterView />
</template>
