<template>
  <header class="topbar">
    <div class="right-section">
      <h1 class="title">پنل <span class="highlight">مدیریت</span> کافه گیم</h1>
    </div>

    <div class="left-section">
      <div class="notification">
        <span class="bell">🔔</span>
        <span class="dot"></span>
      </div>

      <div class="user-info">
        <div class="avatar">
          {{ userInitial }}
        </div>

        <div class="user-meta">
          <div class="role-badge" :class="roleClass">
            {{ roleLabel }}
          </div>
        </div>
      </div>

      <button class="logout" @click="logout">خروج</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "../../store/auth.store";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const roleLabel = computed(() => {
  return auth.user?.role === "admin" ? "مدیر" : "کارمند";
});

const roleClass = computed(() => {
  return auth.user?.role === "admin" ? "admin" : "staff";
});

const userInitial = computed(() => {
  return auth.user?.role === "admin" ? "A" : "S";
});

function logout() {
  auth.logout();
  router.push("/login");
}
</script>

<style scoped>
.topbar {
  height: 70px;
  background: #0b0f1a;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  direction: rtl;
}

.title {
  font-size: 20px;
  font-weight: 600;
}

.highlight {
  color: var(--neon-cyan);
}

.left-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.notification {
  position: relative;
  cursor: pointer;
}

.bell {
  font-size: 20px;
  color: var(--neon-cyan);
}

.dot {
  position: absolute;
  top: -2px;
  left: -2px;
  width: 8px;
  height: 8px;
  background: red;
  border-radius: 50%;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.role-badge {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 20px;
  font-weight: 500;
}

.role-badge.admin {
  background: rgba(0, 255, 255, 0.15);
  color: var(--neon-cyan);
}

.role-badge.staff {
  background: rgba(157, 0, 255, 0.15);
  color: var(--neon-purple);
}

.logout {
  background: transparent;
  border: 1px solid var(--neon-red);
  color: var(--neon-red);
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.logout:hover {
  background: var(--neon-red);
  color: #000;
}
</style>
