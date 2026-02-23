<template>
  <div class="toast-container">
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      class="toast"
      :class="toast.type"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from "../../store/toast.store";
const toastStore = useToastStore();
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  padding: 10px 16px;
  border-radius: 8px;
  background: #11162a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  min-width: 220px;
  transition: 0.3s ease;
}

.toast.success {
  border-color: var(--neon-green);
  box-shadow: 0 0 12px rgba(0, 255, 138, 0.6);
}

.toast.error {
  border-color: var(--neon-red);
  box-shadow: 0 0 12px rgba(255, 46, 99, 0.6);
}

.toast.info {
  border-color: var(--neon-cyan);
  box-shadow: 0 0 12px rgba(0, 245, 255, 0.6);
}
</style>
