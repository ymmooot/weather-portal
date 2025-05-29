<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style scoped lang="scss">
h1 {
  background: linear-gradient(to right, #1f7625, #388e3c);
  color: #fff;
  padding: 0.6rem 0;
  text-align: center;
  font-size: 1.6rem;
  font-family: "Pacifico", cursive;
}
</style>
