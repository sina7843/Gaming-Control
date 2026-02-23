import { onMounted, onUnmounted } from "vue";

export function usePolling(callback: () => void, interval = 5000) {
  let timer: any = null;

  onMounted(() => {
    timer = setInterval(() => {
      callback();
    }, interval);
  });

  onUnmounted(() => {
    if (timer) clearInterval(timer);
  });
}
