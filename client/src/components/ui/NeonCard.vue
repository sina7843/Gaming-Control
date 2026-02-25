<script setup lang="ts">
const props = defineProps<{
  title?: string;
  subtitle?: string;
  padded?: boolean;
}>();
</script>

<template>
  <section class="card neon-glass">
    <div v-if="title || subtitle" class="head">
      <div class="t">
        <h3 v-if="title" class="title neon-title">{{ title }}</h3>
        <p v-if="subtitle" class="sub neon-muted">{{ subtitle }}</p>
      </div>
      <slot name="right" />
    </div>

    <div class="body" :class="{ padded: props.padded !== false }">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.card {
  border-radius: 22px;
  overflow: hidden;
  position: relative;
}
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.title {
  margin: 0;
  font-size: 16px;
}
.sub {
  margin: 6px 0 0 0;
  font-size: 12px;
  line-height: 1.7;
}
.body {
  width: 100%;
}
.body.padded {
  padding: 14px 16px;
}
</style>
