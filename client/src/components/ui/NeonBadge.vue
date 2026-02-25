<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    tone?: "cyan" | "green" | "purple" | "red" | "gray";
  }>(),
  {
    tone: "cyan",
  },
);
</script>

<template>
  <span class="badge" :class="`t-${props.tone}`">
    <span class="dot" />
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
}
.dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.7);
}
.t-cyan {
  border-color: rgba(0, 245, 255, 0.18);
  background: rgba(0, 245, 255, 0.08);
  color: #bffcff;
}
.t-cyan .dot {
  background: #00f5ff;
  box-shadow: 0 0 14px rgba(0, 245, 255, 0.45);
}

.t-green {
  border-color: rgba(0, 255, 163, 0.18);
  background: rgba(0, 255, 163, 0.07);
  color: #bfffe8;
}
.t-green .dot {
  background: #00ffa3;
  box-shadow: 0 0 14px rgba(0, 255, 163, 0.35);
}

.t-purple {
  border-color: rgba(151, 71, 255, 0.2);
  background: rgba(151, 71, 255, 0.08);
  color: #ead7ff;
}
.t-purple .dot {
  background: #9747ff;
  box-shadow: 0 0 14px rgba(151, 71, 255, 0.35);
}

.t-red {
  border-color: rgba(255, 0, 92, 0.18);
  background: rgba(255, 0, 92, 0.08);
  color: #ffd7e5;
}
.t-red .dot {
  background: #ff005c;
  box-shadow: 0 0 14px rgba(255, 0, 92, 0.35);
}

.t-gray {
  opacity: 0.9;
}
</style>
