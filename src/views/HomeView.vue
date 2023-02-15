<script setup lang="ts">
import { RouterLink } from "vue-router";
import FooterView from "../components/FooterView.vue";
</script>
<template>
  <div class="viewport-container">
    <header class="intro">
      <h1 class="intro-title">
        <div class="text-up">Stickies.</div>
      </h1>
      <div class="overflow-hidden">
        <div class="intro-desc text-up">
          <p>
            Stickies is a simple note-taking web-app built with
            <a href="" class="link">Vue</a> and
            <a href="" class="link">TailwindCSS</a>. It allows you to pin sticky
            notes at random on a board.
            <br />
            It harness the browsers Local Storage for storing notes.
          </p>
          <br />
          <p>
            <b>Fun Fact 😎:</b> This web-app was created when i had my first
            deep look at <a href="" class="link">Vue</a>.
          </p>
        </div>
      </div>
      <div class="cta-container text-up">
        <RouterLink to="/board" class="cta"
          >Create Board &nbsp;&nbsp; 🚀</RouterLink
        >
      </div>
    </header>
    <FooterView />
  </div>
</template>
