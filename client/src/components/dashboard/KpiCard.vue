<template>
  <div class="kpi-card">
    <div class="label">{{ label }}</div>
    <div class="value">{{ value }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value: string | number;
}>();
</script>

<style scoped>
.kpi-card {
  background: #11162a;
  padding: 20px;
  border-radius: 14px;
  border: 1px solid rgba(0, 255, 255, 0.1);
  transition: 0.3s;
}

.kpi-card:hover {
  border-color: var(--neon-cyan);
}

.label {
  font-size: 13px;
  opacity: 0.7;
}

.value {
  font-size: 24px;
  font-weight: bold;
  color: var(--neon-cyan);
}
</style>
