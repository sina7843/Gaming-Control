<script setup lang="ts">
import NeonRevenueChart from "./NeonRevenueChart.vue";
import { computed } from "vue";

const props = defineProps<{
  items: any[];
}>();

const chartData = computed(() =>
  props.items.map((item) => ({
    label: item.resourceName,
    value: item.revenue,
  })),
);
</script>

<template>
  <NeonRevenueChart :data="chartData" />
</template>
