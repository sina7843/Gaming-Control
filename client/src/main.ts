import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import VueApexCharts from "vue3-apexcharts";

// Global styles (RTL, colors, variables)
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/neon.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(VueApexCharts);
app.component("apexchart", VueApexCharts);

app.mount("#app");
