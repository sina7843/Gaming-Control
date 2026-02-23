<template>
  <aside class="sidebar">
    <div class="logo">DRAGON <span>CONTROL</span></div>

    <nav>
      <RouterLink to="/live">کافه زنده</RouterLink>

      <RouterLink to="/dashboard"> داشبورد </RouterLink>

      <RouterLink to="/customer"> مشتریان </RouterLink>

      <RouterLink v-if="canManagePricing" to="/pricing">
        قیمت‌گذاری
      </RouterLink>

      <RouterLink v-if="canManageDiscount" to="/discount">
        تخفیف‌ها
      </RouterLink>

      <RouterLink v-if="canViewReports" to="/report"> گزارش‌ها </RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { usePermissions } from "../../composables/usePermissions";

const { canManagePricing, canManageDiscount, canViewReports } =
  usePermissions();
</script>
