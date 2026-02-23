<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <transition name="fade">
      <div v-if="drawerOpen" class="backdrop" @click="close" />
    </transition>

    <!-- Drawer -->
    <transition name="slide">
      <div v-if="drawerOpen" class="drawer">
        <div class="header">
          <h2>جزئیات جلسه</h2>
          <button @click="close">✕</button>
        </div>

        <div class="content">
          <slot />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useSessionStore } from "../../store/session.store";
import { onMounted, onUnmounted } from "vue";

const store = useSessionStore();

const drawerOpen = store.$state.drawerOpen;

function close() {
  store.closeDrawer();
}

// ESC key close
function handleEsc(e: KeyboardEvent) {
  if (e.key === "Escape") {
    close();
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleEsc);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleEsc);
});
</script>

<style scoped>
/* Backdrop */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 999;
}

/* Drawer */
.drawer {
  position: fixed;
  top: 0;
  left: 0; /* چون RTL هست */
  height: 100%;
  width: 420px;
  background: #11162a;
  border-right: 2px solid var(--neon-cyan);
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 20px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content {
  padding: 20px;
  overflow-y: auto;
}

/* Fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide animation */
.slide-enter-active {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.slide-leave-active {
  transition: transform 0.25s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
