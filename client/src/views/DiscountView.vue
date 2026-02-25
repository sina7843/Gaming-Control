<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import NeonCard from "@/components/ui/NeonCard.vue";
import NeonBadge from "@/components/ui/NeonBadge.vue";
import NeonButton from "@/components/ui/NeonButton.vue";
import NeonInput from "@/components/ui/NeonInput.vue";

import { useDiscountStore } from "@/store/discount.store";
import { useAuth } from "@/composables/useAuth";

const discount = useDiscountStore();
const { isAdmin } = useAuth();

const name = ref("");
const type = ref<"percent" | "fixed">("percent");
const value = ref("");

const canCreate = computed(() => name.value.trim() && Number(value.value) > 0);

onMounted(() => discount.fetchAll());

async function createItem() {
  if (!canCreate.value) return;
  await discount.create({
    name: name.value.trim(),
    type: type.value,
    value: Number(value.value),
    active: true,
  });
  name.value = "";
  value.value = "";
}
</script>

<template>
  <NeonCard
    title="تخفیف‌ها"
    subtitle="لیست تخفیف‌ها و ساخت تخفیف جدید"
    :padded="true"
  >
    <div class="top">
      <NeonBadge tone="cyan">Discount</NeonBadge>
      <span v-if="discount.loading" class="muted">در حال دریافت...</span>
    </div>

    <div class="sp" />

    <div v-if="isAdmin" class="create neon-glass">
      <div class="grid">
        <NeonInput
          v-model="name"
          label="نام تخفیف"
          placeholder="مثلاً تخفیف VIP"
          icon="🏷️"
        />

        <label class="field">
          <span class="label">نوع</span>
          <div class="selectWrap">
            <select v-model="type" class="select">
              <option value="percent">درصدی</option>
              <option value="fixed">مبلغی</option>
            </select>
          </div>
        </label>

        <NeonInput
          v-model="value"
          label="مقدار"
          :placeholder="type === 'percent' ? 'مثلاً 10' : 'مثلاً 20000'"
          icon="💸"
          type="number"
        />
      </div>

      <div class="actions">
        <NeonButton
          :loading="discount.creating"
          :disabled="!canCreate"
          @click="createItem"
        >
          ساخت تخفیف
        </NeonButton>
      </div>
    </div>

    <div v-else class="note">فقط مدیر سیستم می‌تواند تخفیف جدید بسازد.</div>

    <div class="sp" />

    <div class="list">
      <div
        v-if="!discount.loading && discount.items.length === 0"
        class="empty"
      >
        هیچ تخفیفی ثبت نشده است.
      </div>

      <div
        v-for="d in discount.items"
        :key="d._id || d.name"
        class="row neon-glass"
      >
        <div class="meta">
          <div class="nm">{{ d.name }}</div>
          <div class="sub">
            {{ d.type === "percent" ? "درصدی" : "مبلغی" }} • {{ d.value }}
          </div>
        </div>

        <NeonBadge :tone="d.type === 'percent' ? 'green' : 'purple'">
          {{ d.type === "percent" ? "٪" : "تومان" }}
        </NeonBadge>
      </div>
    </div>
  </NeonCard>
</template>

<style scoped>
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.sp {
  height: 14px;
}
.muted {
  opacity: 0.75;
  font-size: 12px;
}

.create {
  border-radius: 18px;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.grid {
  display: grid;
  grid-template-columns: 1.3fr 0.9fr 1fr;
  gap: 12px;
}
@media (max-width: 860px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
.field {
  display: grid;
  gap: 8px;
}
.label {
  font-size: 12px;
  opacity: 0.78;
}
.selectWrap {
  border-radius: 16px;
  background: rgba(5, 8, 20, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 10px 12px;
}
.select {
  width: 100%;
  border: none;
  background: transparent;
  color: #eaf2ff;
  outline: none;
  font-size: 14px;
}
.actions {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}
.note {
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid rgba(0, 245, 255, 0.1);
  background: rgba(0, 245, 255, 0.05);
  opacity: 0.9;
}

.list {
  display: grid;
  gap: 10px;
}
.row {
  border-radius: 16px;
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.meta .nm {
  font-weight: 900;
}
.meta .sub {
  font-size: 12px;
  opacity: 0.7;
  margin-top: 4px;
}
.empty {
  opacity: 0.75;
  padding: 10px 2px;
}
</style>
