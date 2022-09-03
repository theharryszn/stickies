<script setup lang="ts">
const year = new Date().getFullYear();
</script>
<template>
  <footer>
    <span>Stickies - {{ year }}</span>
    <span
      >Built with ❤️ by
      <a target="_blank" href="https://abidemiharry.vercel.app" class="link"
        >Abidemi Harry</a
      ></span
    >
  </footer>
</template>
