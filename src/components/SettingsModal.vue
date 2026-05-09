<script setup lang="ts">
import {
  PhCaretUp,
  PhDesktop,
  PhGridFour,
  PhMoon,
  PhSun,
  PhVibrate,
} from "@phosphor-icons/vue";
import useStore from "../stores/useStore";

const store = useStore();
</script>

<template>
  <Transition name="fade">
    <div
      v-if="store.settingsOpen"
      class="settings-backdrop"
      @click.self="store.closeSettings"
    >
      <div class="settings-modal" role="dialog" aria-modal="true">
        <div class="settings-header">
          <div>
            <h2>Settings</h2>
          </div>
          <button
            class="settings-icon-btn"
            title="Close"
            @click="store.closeSettings"
          >
            <PhCaretUp :size="16" weight="bold" />
          </button>
        </div>

        <div class="settings-section">
          <div class="settings-section-title">Appearance</div>
          <div class="theme-options">
            <button
              class="theme-option"
              :class="{ active: store.config.theme === 'system' }"
              @click="store.setTheme('system')"
            >
              <PhDesktop :size="18" />
              <span>System</span>
            </button>
            <button
              class="theme-option"
              :class="{ active: store.config.theme === 'light' }"
              @click="store.setTheme('light')"
            >
              <PhSun :size="18" />
              <span>Light</span>
            </button>
            <button
              class="theme-option"
              :class="{ active: store.config.theme === 'dark' }"
              @click="store.setTheme('dark')"
            >
              <PhMoon :size="18" />
              <span>Dark</span>
            </button>
          </div>
        </div>

        <div class="settings-section">
          <label class="settings-row">
            <span class="settings-row-copy">
              <span class="settings-row-title">
                <PhGridFour :size="18" />
                Board grid
              </span>
              <span class="settings-row-desc"
                >Show alignment lines on the canvas.</span
              >
            </span>
            <button
              type="button"
              role="switch"
              class="settings-switch"
              :class="{ active: store.config.showGrid }"
              :aria-checked="store.config.showGrid"
              @click="store.setShowGrid(!store.config.showGrid)"
            >
              <span></span>
            </button>
          </label>
          <label class="settings-row">
            <span class="settings-row-copy">
              <span class="settings-row-title">
                <PhVibrate :size="18" />
                Haptics
              </span>
              <span class="settings-row-desc"
                >Use light feedback for board actions.</span
              >
            </span>
            <button
              type="button"
              role="switch"
              class="settings-switch"
              :class="{ active: store.config.hapticsEnabled }"
              :aria-checked="store.config.hapticsEnabled"
              @click="store.setHapticsEnabled(!store.config.hapticsEnabled)"
            >
              <span></span>
            </button>
          </label>
        </div>

        <!-- <button class="settings-reset" @click="store.resetCanvasView">
          <PhArrowsClockwise :size="16" />
          Reset board view
        </button> -->
      </div>
    </div>
  </Transition>
</template>
