<script lang="ts" setup>
import type { IStatus } from "@/data/models";
import { useFilters } from "@/composables/useFilters";
const { statusFilter } = useFilters();

const props = defineProps<{
  status: IStatus;
}>();
</script>

<template>
  <h2>Status</h2>
  <div class="character-status">
    <span v-for="(points, key) in props.status" :key="key">
      <div class="character-status__value">
        {{ points }}
      </div>
      <span class="character-status__name">
        {{ statusFilter(key) }}
      </span>
    </span>
  </div>
</template>

<style>
.character-status {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  text-align: center;
  gap: 14px;
}

.character-status__name {
  margin-bottom: 14px;
}

.character-status__value {
  background-color: lightgray;
  padding: 8px;
  font-size: 1.5em;
}
</style>
