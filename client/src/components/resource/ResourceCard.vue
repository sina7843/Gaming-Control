<template>
  <div
    class="card"
    :class="statusClass"
    @click="handleOpen"
  >
    <!-- Header -->
    <div class="card-header">
      <h3>{{ resource.name }}</h3>
      <span class="status-label">
        {{ statusLabel }}
      </span>
    </div>

    <!-- Body -->
    <div class="card-body">

      <div v-if="isActive" class="timer">
        ⏱ {{ formattedDuration }}
      </div>

      <div v-if="isActive" class="live-cost">
        💰 {{ formattedCost }} تومان
      </div>

      <div v-if="resource.capacity" class="capacity">
        ظرفیت: {{ resource.capacity }}
      </div>

    </div>

    <!-- Actions -->
    <div class="card-actions">

      <button
        v-if="isAvailable && isAdmin"
        class="btn-start"
        @click.stop="$emit('start', resource)"
      >
        شروع جلسه
      </button>

      <button
        v-if="isActive && isAdmin"
        class="btn-finish"
        @click.stop="$emit('finish', resource)"
      >
        پایان جلسه
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePermissions } from '../../composables/usePermissions'
import { formatCurrency } from '../../utils/formatCurrency'

const props = defineProps<{
  resource: any
}>()

const emit = defineEmits(['start', 'finish', 'openSession'])

const { isAdmin } = usePermissions()

const isAvailable = computed(
  () => props.resource.status === 'available'
)

const isActive = computed(
  () => props.resource.status === 'in_use'
)

const statusLabel = computed(() => {
  switch (props.resource.status) {
    case 'available': return 'آزاد'
    case 'in_use': return 'در حال استفاده'
    case 'maintenance': return 'تعمیر'
    default: return ''
  }
})

const statusClass = computed(() => props.resource.status)

const formattedCost = computed(() =>
  formatCurrency(props.resource.liveCost || 0)
)

const formattedDuration = computed(() => {
  if (!props.resource.startedAt) return ''

  const start = new Date(props.resource.startedAt)
  const now = new Date()
  const diff = Math.floor((now.getTime() - start.getTime()) / 1000)

  const minutes = Math.floor(diff / 60)
  const seconds = diff % 60

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

function handleOpen() {
  if (isActive.value) {
    emit('openSession', props.resource)
  }
}
</script>
