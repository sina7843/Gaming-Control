<template>
  <div class="customers-view">
    <div class="header">
      <h1>مدیریت مشتریان</h1>
      <button @click="openCreate">مشتری جدید +</button>
    </div>

    <CustomerTable :customers="customers" @edit="openEdit" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useCustomerStore } from "../store/customer.store";
import CustomerTable from "../components/customer/CustomerTable.vue";

const store = useCustomerStore();
const { customers } = storeToRefs(store);

onMounted(() => {
  store.fetchCustomers();
});

function openCreate() {
  // بعداً modal اضافه می‌کنیم
}

function openEdit(customer: any) {
  console.log(customer);
}
</script>

<style scoped>
.customers-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
