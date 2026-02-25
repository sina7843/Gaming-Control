<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    label?: string;
    placeholder?: string;
    type?: string;
    icon?: string;
    error?: string | null;
    autocomplete?: string;
  }>(),
  {
    type: "text",
    icon: "",
    error: null,
    autocomplete: "off",
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", v: string): void;
}>();

const hasError = computed(() => !!props.error);
</script>

<template>
  <label class="field">
    <span v-if="label" class="label">{{ label }}</span>

    <div class="control neon-outline neon-focus" :class="{ error: hasError }">
      <span v-if="icon" class="icon">{{ icon }}</span>

      <input
        class="input"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :value="modelValue"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />

      <slot name="right" />
    </div>

    <p v-if="error" class="err">{{ error }}</p>
  </label>
</template>

<style scoped>
.field {
  display: grid;
  gap: 8px;
}
.label {
  font-size: 12px;
  opacity: 0.78;
}
.control {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 12px;
  border-radius: 16px;
  background: rgba(5, 8, 20, 0.55);
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;
}
.control.error {
  border-color: rgba(255, 0, 92, 0.22);
  box-shadow: 0 0 0 1px rgba(255, 0, 92, 0.1) inset;
}
.icon {
  width: 22px;
  display: grid;
  place-items: center;
  opacity: 0.9;
}
.input {
  flex: 1;
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #eaf2ff;
  font-size: 14px;
}
.input::placeholder {
  opacity: 0.45;
}
.err {
  margin: 0;
  font-size: 12px;
  color: #ffd7e5;
  opacity: 0.95;
}
</style>
