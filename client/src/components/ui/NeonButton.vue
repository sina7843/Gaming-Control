<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    variant?: "primary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  }>(),
  {
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
    type: "button",
  },
);

const isDisabled = computed(() => props.disabled || props.loading);
</script>

<template>
  <button
    class="btn"
    :class="[`v-${props.variant}`, `s-${props.size}`, { disabled: isDisabled }]"
    :disabled="isDisabled"
    :type="props.type"
  >
    <span v-if="props.loading" class="spinner" />
    <slot />
  </button>
</template>

<style scoped>
.btn {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 16px;
  font-weight: 900;
  cursor: pointer;
  border: 1px solid rgba(0, 245, 255, 0.22);
  transition:
    transform 120ms ease,
    box-shadow 120ms ease,
    border-color 120ms ease,
    opacity 120ms ease;
  color: #ecf9ff;
}

.s-sm {
  padding: 8px 12px;
  font-size: 12px;
  border-radius: 14px;
}
.s-md {
  padding: 11px 14px;
  font-size: 13px;
}
.s-lg {
  padding: 13px 16px;
  font-size: 14px;
}

.v-primary {
  background: linear-gradient(
    90deg,
    rgba(0, 245, 255, 0.18),
    rgba(151, 71, 255, 0.14)
  );
  box-shadow: 0 0 26px rgba(0, 245, 255, 0.1);
}
.v-primary:hover:not(.disabled) {
  transform: translateY(-1px);
  border-color: rgba(0, 245, 255, 0.3);
  box-shadow: 0 0 34px rgba(0, 245, 255, 0.14);
}

.v-ghost {
  background: rgba(0, 245, 255, 0.08);
  border-color: rgba(0, 245, 255, 0.18);
  color: #bffcff;
}
.v-ghost:hover:not(.disabled) {
  transform: translateY(-1px);
  border-color: rgba(0, 245, 255, 0.28);
  box-shadow: 0 0 16px rgba(0, 245, 255, 0.1);
}

.v-danger {
  background: rgba(255, 0, 92, 0.1);
  border-color: rgba(255, 0, 92, 0.22);
  color: #ffd7e5;
}
.v-danger:hover:not(.disabled) {
  transform: translateY(-1px);
  box-shadow: 0 0 18px rgba(255, 0, 92, 0.1);
}

.disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.spinner {
  width: 16px;
  height: 16px;
  border-radius: 999px;
  border: 2px solid rgba(255, 255, 255, 0.22);
  border-top-color: rgba(0, 245, 255, 0.9);
  animation: spin 0.9s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
