<template>
  <div class="chart-card">
    <h3>درآمد بر اساس منبع</h3>

    <apexchart
      type="bar"
      height="300"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  data: any[];
}>();

const series = computed(() => [
  {
    name: "درآمد",
    data: props.data?.map((d) => d.revenue) || [],
  },
]);

const chartOptions = computed(() => ({
  chart: {
    background: "transparent",
    toolbar: { show: false },
  },
  theme: {
    mode: "dark",
  },
  colors: ["#00F5FF"],
  xaxis: {
    categories: props.data?.map((d) => d._id) || [],
    labels: {
      style: {
        colors: "#aaa",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#aaa",
      },
    },
  },
  grid: {
    borderColor: "rgba(0,255,255,0.08)",
  },
  plotOptions: {
    bar: {
      borderRadius: 6,
      columnWidth: "45%",
    },
  },
  dataLabels: {
    enabled: false,
  },
}));
</script>

<style scoped>
.chart-card {
  background: #11162a;
  padding: 20px;
  border-radius: 14px;
  border: 1px solid rgba(0, 255, 255, 0.1);
}
</style>
