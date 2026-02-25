<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import NeonCard from "@/components/ui/NeonCard.vue";
import NeonBadge from "@/components/ui/NeonBadge.vue";
import NeonButton from "@/components/ui/NeonButton.vue";
import NeonInput from "@/components/ui/NeonInput.vue";

import { usePricingStore } from "@/store/pricing.store";
import { useAuth } from "@/composables/useAuth";

const pricing = usePricingStore();
const { isAdmin } = useAuth();

const name = ref("");
const model = ref<"per_hour" | "per_minute" | "flat">("per_hour");
const rate = ref("");

const canCreate = computed(() => name.value.trim() && Number(rate.value) > 0);

onMounted(() => pricing.fetchAll());

async function createRule() {
  if (!canCreate.value) return;
  await pricing.create({
    name: name.value.trim(),
    model: model.value,
    rate: Number(rate.value),
    active: true,
  });
  name.value = "";
  rate.value = "";
}
</script>

<template>
  <NeonCard
    title="قیمت‌گذاری"
    subtitle="لیست تعرفه‌ها و ساخت تعرفه جدید"
    :padded="true"
  >
    <div class="top">
      <NeonBadge tone="purple">Pricing</NeonBadge>
      <div class="right">
        <span v-if="pricing.loading" class="muted">در حال دریافت...</span>
      </div>
    </div>

    <div class="sp" />

    <div v-if="isAdmin" class="create neon-glass">
      <div class="grid">
        <NeonInput
          v-model="name"
          label="نام تعرفه"
          placeholder="مثلاً پلی‌استیشن - ساعتی"
          icon="🏷️"
        />

        <label class="field">
          <span class="label">مدل</span>
          <div class="selectWrap">
            <select v-model="model" class="select">
              <option value="per_hour">ساعتی</option>
              <option value="per_minute">دقیقه‌ای</option>
              <option value="flat">ثابت</option>
            </select>
          </div>
        </label>

        <NeonInput
          v-model="rate"
          label="نرخ"
          placeholder="مثلاً 45000"
          icon="💰"
          type="number"
        />
      </div>

      <div class="actions">
        <NeonButton
          :loading="pricing.creating"
          :disabled="!canCreate"
          @click="createRule"
        >
          ساخت تعرفه
        </NeonButton>
      </div>
    </div>

    <div v-else class="note">فقط مدیر سیستم می‌تواند تعرفه جدید بسازد.</div>

    <div class="sp" />

    <div class="list">
      <div v-if="!pricing.loading && pricing.items.length === 0" class="empty">
        هیچ تعرفه‌ای ثبت نشده است.
      </div>

      <div
        v-for="p in pricing.items"
        :key="p._id || p.name"
        class="row neon-glass"
      >
        <div class="meta">
          <div class="nm">{{ p.name }}</div>
          <div class="sub">{{ p.model }}</div>
        </div>

        <div class="price">
          <span class="val">{{ (p.rate ?? 0).toLocaleString("fa-IR") }}</span>
          <span class="t">تومان</span>
        </div>
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
.right {
  display: flex;
  gap: 10px;
  align-items: center;
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
.price {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.val {
  font-weight: 900;
  color: #00f5ff;
  text-shadow: 0 0 14px rgba(0, 245, 255, 0.18);
}
.t {
  opacity: 0.75;
  font-size: 12px;
}
.empty {
  opacity: 0.75;
  padding: 10px 2px;
}
</style>
