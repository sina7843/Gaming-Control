<script setup lang="ts">
import NeonCard from "@/components/ui/NeonCard.vue";
import NeonBadge from "@/components/ui/NeonBadge.vue";
</script>

<template>
  <NeonCard
    title="گزارش‌ها"
    subtitle="گزارش درآمد، سشن‌ها و عملکرد (در حال تکمیل)"
    :padded="true"
  >
    <NeonBadge tone="green">Report</NeonBadge>
    <div class="sp" />
    <p class="muted">
      مرحله بعد: انتخاب بازه زمانی + گرفتن داده از /report و نمایش نمودار/جدول.
    </p>
  </NeonCard>
</template>

<style scoped>
.sp {
  height: 12px;
}
.muted {
  margin: 0;
  opacity: 0.75;
  line-height: 1.9;
}
</style>
