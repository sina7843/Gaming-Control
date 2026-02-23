<template>
  <div class="live-view">
    <div class="page-header">
      <h1>کافه زنده</h1>
    </div>

    <div class="grid">
      <ResourceCard
        v-for="r in resources"
        :key="r._id"
        :resource="r"
        @start="handleStart"
        @finish="handleFinish"
        @openSession="openSession"
      />
    </div>

    <SessionDrawer>
      <SessionDetail
        v-if="sessionStore.activeSession"
        :session="sessionStore.activeSession"
        @finish="handleFinishFromDrawer"
      />
    </SessionDrawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useResourceStore } from "../store/resource.store";
import { useSessionStore } from "../store/session.store";
import { usePolling } from "../composables/usePolling";
import { startSession, finishSession } from "../api/session.api";
import ResourceCard from "../components/resource/ResourceCard.vue";
import SessionDrawer from "../components/resource/SessionDrawer.vue";
import SessionDetail from "../components/resource/SessionDetail.vue";

const resourceStore = useResourceStore();
const sessionStore = useSessionStore();

const { resources } = storeToRefs(resourceStore);

let isFetching = false;

onMounted(async () => {
  await resourceStore.fetchResources();
});

usePolling(async () => {
  if (isFetching) return;
  isFetching = true;

  await resourceStore.fetchResources();

  if (sessionStore.drawerOpen && sessionStore.activeSession) {
    await sessionStore.fetchSession(sessionStore.activeSession._id);
  }

  isFetching = false;
}, 5000);

async function handleStart(resource: any) {
  await startSession({
    resourceId: resource._id,
    seatCount: 1,
  });

  await resourceStore.fetchResources();
}

async function handleFinish(resource: any) {
  if (!resource.activeSessionId) return;

  await finishSession(resource.activeSessionId);
  await resourceStore.fetchResources();
}

async function handleFinishFromDrawer() {
  if (!sessionStore.activeSession) return;

  await finishSession(sessionStore.activeSession._id);

  sessionStore.closeDrawer();
  await resourceStore.fetchResources();
}

async function openSession(resource: any) {
  if (!resource.activeSessionId) return;

  await sessionStore.fetchSession(resource.activeSessionId);
  sessionStore.drawerOpen = true;
}
</script>
