<template>
  <div class="dashboard">
    <!-- Header -->
    <div class="header">
      <h1>داشبورد مدیریتی</h1>

      <div class="date-range">
        <input type="date" v-model="startDate" />
        <input type="date" v-model="endDate" />
        <button @click="loadData">اعمال</button>
      </div>
    </div>

    <!-- KPI Grid -->
    <div class="kpi-grid">
      <KpiCard
        label="درآمد کل"
        :value="formatCurrency(kpi?.totalRevenue || 0)"
      />

      <KpiCard label="تعداد جلسات" :value="kpi?.totalSessions || 0" />

      <KpiCard
        label="میانگین مدت (دقیقه)"
        :value="kpi?.avgSessionMinutes || 0"
      />

      <div class="occupancy-card">
        <h3>نرخ اشغال</h3>

        <div class="ring">
          <apexchart
            type="radialBar"
            height="200"
            :options="occupancyOptions"
            :series="[kpi?.occupancyRate || 0]"
          />
        </div>

        <div class="percent">{{ kpi?.occupancyRate || 0 }}%</div>
      </div>
    </div>

    <!-- Revenue Chart -->
    <NeonRevenueChart :data="revenueData" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useReportStore } from "../store/report.store";
import { getRevenueByResource } from "../api/report.api";
import KpiCard from "../components/dashboard/KpiCard.vue";
import NeonRevenueChart from "../components/dashboard/NeonRevenueChart.vue";
import { formatCurrency } from "../utils/formatCurrency";

const reportStore = useReportStore();

interface Kpi {
  totalRevenue: number;
  totalSessions: number;
  avgSessionMinutes: number;
  occupancyRate: number;
}
const kpi = ref<Kpi | null>(null);

const revenueData = ref<any[]>([]);

const today = new Date();
const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

const startDate = ref(startOfMonth.toISOString().substring(0, 10));
const endDate = ref(today.toISOString().substring(0, 10));

async function loadData() {
  await reportStore.fetchKpi(startDate.value, endDate.value);
  kpi.value = reportStore.kpi;

  revenueData.value = await getRevenueByResource(
    startDate.value,
    endDate.value,
  );
}

onMounted(loadData);

const occupancyOptions = {
  chart: {
    background: "transparent",
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: "65%",
      },
      track: {
        background: "#1b2035",
      },
      dataLabels: {
        show: false,
      },
    },
  },
  colors: ["#00F5FF"],
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date-range {
  display: flex;
  gap: 10px;
}

.date-range input {
  background: #11162a;
  border: 1px solid rgba(0, 255, 255, 0.2);
  color: white;
  padding: 6px;
  border-radius: 6px;
}

.date-range button {
  border: 1px solid var(--neon-cyan);
  background: transparent;
  color: var(--neon-cyan);
  padding: 6px 12px;
  border-radius: 6px;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.occupancy-card {
  background: #11162a;
  padding: 20px;
  border-radius: 14px;
  border: 1px solid rgba(0, 255, 255, 0.1);
  text-align: center;
}

.percent {
  font-size: 22px;
  font-weight: bold;
  color: var(--neon-cyan);
}
</style>
