<template>
  <div class="auth-layout">
    <div class="auth-card">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: radial-gradient(
    circle at top left,
    rgba(0, 245, 255, 0.06),
    transparent 55%
  );
  padding: 24px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: rgba(15, 19, 34, 0.9);
  border: 1px solid rgba(0, 255, 255, 0.12);
  border-radius: 16px;
  padding: 22px;
  box-shadow: 0 0 30px rgba(0, 245, 255, 0.06);
}
</style>
