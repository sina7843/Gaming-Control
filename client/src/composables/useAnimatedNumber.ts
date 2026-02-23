import { ref, watch } from "vue";

export function useAnimatedNumber(targetRef: any, duration = 400) {
  const displayValue = ref(0);
  const changeType = ref<"up" | "down" | null>(null);

  watch(
    targetRef,
    (newValue, oldValue) => {
      const start = displayValue.value;
      const end = Number(newValue || 0);
      const startTime = performance.now();

      if (oldValue !== undefined) {
        if (end > oldValue) changeType.value = "up";
        else if (end < oldValue) changeType.value = "down";
      }

      function animate(time: number) {
        const progress = Math.min((time - startTime) / duration, 1);

        displayValue.value = Math.floor(start + (end - start) * progress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setTimeout(() => {
            changeType.value = null;
          }, 300);
        }
      }

      requestAnimationFrame(animate);
    },
    { immediate: true },
  );

  return { displayValue, changeType };
}
