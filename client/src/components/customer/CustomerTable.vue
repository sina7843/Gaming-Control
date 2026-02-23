<template>
  <div class="table-card">
    <div class="table-header">
      <input v-model="search" placeholder="جستجو بر اساس نام یا شماره..." />
    </div>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>نام</th>
          <th>شماره تماس</th>
          <th>برچسب‌ها</th>
          <th>عملیات</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(c, index) in filteredCustomers" :key="c._id">
          <td>{{ index + 1 }}</td>
          <td>{{ c.name }}</td>
          <td>{{ c.phone }}</td>

          <td>
            <span v-for="tag in c.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </td>

          <td>
            <button class="btn-edit" @click="$emit('edit', c)">ویرایش</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  customers: any[];
}>();

const emit = defineEmits(["edit"]);

const search = ref("");

const filteredCustomers = computed(() =>
  props.customers.filter(
    (c) => c.name.includes(search.value) || c.phone?.includes(search.value),
  ),
);
</script>

<style scoped>
.table-card {
  background: #11162a;
  padding: 20px;
  border-radius: 14px;
  border: 1px solid rgba(0, 255, 255, 0.1);
}

input {
  background: #0f1322;
  border: 1px solid rgba(0, 255, 255, 0.2);
  color: white;
  padding: 6px;
  border-radius: 6px;
}

table {
  width: 100%;
  margin-top: 15px;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: right;
}

th {
  opacity: 0.7;
  font-size: 13px;
}

.tag {
  background: rgba(157, 0, 255, 0.2);
  color: var(--neon-purple);
  padding: 3px 8px;
  border-radius: 10px;
  margin-left: 5px;
}

.btn-edit {
  border: 1px solid var(--neon-cyan);
  background: transparent;
  color: var(--neon-cyan);
  padding: 4px 10px;
  border-radius: 6px;
}
</style>
