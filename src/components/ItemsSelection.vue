<script setup lang="ts">
import * as items from "../../items.json";
const itemsList = items.items;
</script>

<template>
  <h2>Select first item</h2>
  <label
    class="form-label"
    v-for="item in itemsList"
    :key="item.name"
    :for="item.name"
  >
    <input type="radio" name="item" :id="item.name" :value="item.name" />
    {{ item.name }}
  </label>
</template>

<style></style>
