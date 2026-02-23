import { ref, onMounted, onUnmounted } from "vue";

export function useSessionTimer(startedAt: string) {
  const time = ref("");

  let interval: any;

  function update() {
    const start = new Date(startedAt);
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / 1000);

    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;

    time.value = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  onMounted(() => {
    update();
    interval = setInterval(update, 1000);
  });

  onUnmounted(() => {
    clearInterval(interval);
  });

  return time;
}
