<template>
  <div class="layout">
    <!-- Topbar -->
    <Topbar />

    <div class="main">
      <!-- Sidebar (Right side in RTL) -->
      <Sidebar />

      <!-- Page Content -->
      <div class="content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Topbar from "../components/shared/Topbar.vue";
import Sidebar from "../components/shared/Sidebar.vue";
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg-dark);
}

.main {
  display: flex;
  flex: 1;
  overflow: hidden;
  direction: rtl;
}

/* Sidebar */
.main :deep(.sidebar) {
  width: 250px;
  min-width: 250px;
  background: #0f1322;
  border-left: 1px solid rgba(0, 255, 255, 0.08);
}

/* Content */
.content {
  flex: 1;
  padding: 25px;
  overflow-y: auto;
  background: radial-gradient(
    circle at top left,
    rgba(0, 245, 255, 0.03),
    transparent 60%
  );
}
</style>
