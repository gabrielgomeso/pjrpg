<script setup lang="ts">
const props = defineProps<{
  dieResult: Number;
  diceType: Number;
}>();
</script>

<template>
  <div class="number-container">
    <svg viewBox="0 0 50 50">
      <polygon points="25,0 50,50 0,50" fill="black" />
    </svg>
    <span class="number">{{ props.dieResult }}</span>
  </div>
</template>

<style>
.die-body {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 30px solid black;
}

.number-container {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 20px;
}

svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  color: white;
}
</style>
