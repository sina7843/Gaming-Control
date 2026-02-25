<template>
  <div class="session-detail">
    <div class="timer-box">⏱ {{ formattedDuration }}</div>

    <div class="timeline">
      <div
        v-for="(seg, index) in session.segments"
        :key="index"
        class="segment"
      >
        <div>
          {{ formatTime(seg.startedAt) }}
          -
          {{ seg.endedAt ? formatTime(seg.endedAt) : "اکنون" }}
        </div>

        <div>👥 {{ seg.seatCount }} نفر • 💰 {{ seg.cost }} تومان</div>
      </div>
    </div>

    <div class="totals">
      جمع موقت: {{ session.subtotal }} تومان
      <br />
      مبلغ نهایی: {{ session.totalCost }} تومان
    </div>

    <div class="seat-control">
      <input type="number" v-model="newSeat" min="1" />
      <button @click="handleSeatUpdate">اعمال</button>
    </div>

    <button class="finish-btn" @click="$emit('finish')">پایان جلسه</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { updateSeat } from "../../api/session.api";
import { useSessionStore } from "../../store/session.store";

const props = defineProps<{ session: any }>();
const emit = defineEmits(["finish"]);

const store = useSessionStore();

const newSeat = ref(1);

function formatTime(date: string) {
  const d = new Date(date);
  return d.toLocaleTimeString("fa-IR");
}

const formattedDuration = computed(() => {
  const start = new Date(props.session.startedAt);
  const now = new Date();
  const diff = Math.floor((now.getTime() - start.getTime()) / 1000);
  const minutes = Math.floor(diff / 60);
  const seconds = diff % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

async function handleSeatUpdate() {
  await updateSeat(props.session._id, newSeat.value);
  await store.fetchSession(props.session._id);
}
</script>
