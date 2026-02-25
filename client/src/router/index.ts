import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth.store";

// Layouts
import MainLayout from "../layouts/MainLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

// Views
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import LiveView from "../views/LiveView.vue";
import CustomersView from "../views/CustomersView.vue";
import PricingView from "../views/PricingView.vue";
import DiscountView from "../views/DiscountView.vue";
import ReportView from "../views/ReportView.vue";

const routes = [
  // =========================
  // Auth Routes
  // =========================
  {
    path: "/login",
    component: AuthLayout,
    children: [
      {
        path: "",
        component: LoginView,
      },
    ],
  },

  // =========================
  // Protected Routes
  // =========================
  {
    path: "/",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: "/live",
      },

      {
        path: "live",
        component: LiveView,
      },

      {
        path: "dashboard",
        component: DashboardView,
        meta: { role: "admin" },
      },

      {
        path: "customer",
        component: CustomersView,
      },

      {
        path: "pricing",
        component: PricingView,
        meta: { role: "admin" },
      },

      {
        path: "discount",
        component: DiscountView,
        meta: { role: "admin" },
      },

      {
        path: "report",
        component: ReportView,
        meta: { role: "admin" },
      },
    ],
  },

  // Fallback
  {
    path: "/:pathMatch(.*)*",
    redirect: "/live",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// =========================
// Navigation Guard
// =========================

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore();
  auth.initialize();

  // اگر لاگین هست و می‌خواد بره /login
  if (to.path === "/login" && auth.isAuthenticated) {
    return next("/live");
  }

  // Auth check
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next("/login");
  }

  // Role check (واقعی)
  const requiredRole = to.meta.role as string | undefined;
  if (requiredRole) {
    if (!auth.user) return next("/live");
    if (auth.user.role !== requiredRole) return next("/live");
  }

  next();
});

export default router;
