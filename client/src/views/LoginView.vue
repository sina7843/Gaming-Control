<template>
  <div class="login-container">
    <div class="login-card">
      <h2>ورود به سیستم</h2>

      <input v-model="username" placeholder="نام کاربری" />
      <input v-model="password" type="password" placeholder="رمز عبور" />

      <button @click="handleLogin">ورود</button>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../store/auth.store";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const error = ref("");

const auth = useAuthStore();
const router = useRouter();

async function handleLogin() {
  try {
    await auth.login(username.value, password.value);

    if (auth.isAdmin) {
      router.push("/");
    } else {
      router.push("/live");
    }
  } catch (err: any) {
    error.value = "اطلاعات ورود نادرست است";
  }
}
</script>
