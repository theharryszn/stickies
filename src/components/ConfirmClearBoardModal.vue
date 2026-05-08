<script setup lang="ts">
import { PhCaretUp } from "@phosphor-icons/vue";
import useStore from "../stores/useStore";

const store = useStore();
</script>

<template>
  <Transition name="fade">
    <div
      v-if="store.clearBoardConfirmOpen"
      class="confirm-backdrop"
      @click.self="store.closeClearBoardConfirm"
    >
      <div class="confirm-modal" role="dialog" aria-modal="true">
        <button
          class="confirm-close"
          title="Close"
          @click="store.closeClearBoardConfirm"
        >
          <PhCaretUp :size="16" weight="bold" />
        </button>
        <div class="confirm-copy">
          <h2>Clear this board?</h2>
          <p>
            This removes all notes from "{{ store.activeBoard.title }}". This
            cannot be undone.
          </p>
        </div>
        <div class="confirm-actions">
          <button class="confirm-cancel" @click="store.closeClearBoardConfirm">
            Cancel
          </button>
          <button class="confirm-danger" @click="store.clear">
            Clear board
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
