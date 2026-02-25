<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useToastStore } from "@/store/toast.store";

const toast = useToastStore();
const { toasts } = storeToRefs(toast);

function close(id: string) {
  toast.remove(id);
}
</script>

<template>
  <div class="wrap" aria-live="polite" aria-relevant="additions removals">
    <div v-for="t in toasts" :key="t.id" class="toast" :class="`t-${t.type}`">
      <span class="dot" />
      <div class="msg">
        <div class="title">{{ t.title }}</div>
        <div v-if="t.message" class="sub">{{ t.message }}</div>
      </div>
      <button class="x" type="button" @click="close(t.id)">×</button>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  position: fixed;
  top: 14px;
  left: 14px;
  z-index: 9999;
  display: grid;
  gap: 10px;
  width: min(360px, 92vw);
}
.toast {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 12px 12px;
  border-radius: 16px;
  background: rgba(10, 14, 28, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(14px);
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  margin-top: 4px;
}
.msg {
  flex: 1;
}
.title {
  font-weight: 900;
}
.sub {
  font-size: 12px;
  opacity: 0.75;
  margin-top: 4px;
  line-height: 1.7;
}
.x {
  border: none;
  background: transparent;
  color: rgba(234, 242, 255, 0.7);
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  padding: 0 4px;
}
.t-success {
  border-color: rgba(0, 255, 163, 0.18);
}
.t-success .dot {
  background: #00ffa3;
  box-shadow: 0 0 14px rgba(0, 255, 163, 0.35);
}
.t-error {
  border-color: rgba(255, 0, 92, 0.18);
}
.t-error .dot {
  background: #ff005c;
  box-shadow: 0 0 14px rgba(255, 0, 92, 0.35);
}
.t-info {
  border-color: rgba(0, 245, 255, 0.18);
}
.t-info .dot {
  background: #00f5ff;
  box-shadow: 0 0 14px rgba(0, 245, 255, 0.35);
}
</style>
