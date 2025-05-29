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
  background: #fff;
  border-bottom: 1px solid #d8d8d8;
  color: #333;
  padding: 0.6rem 0;
  text-align: center;

  margin-top: 4px;
  font-size: 1.5rem;
  font-family: "Josefin Sans", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}
</style>
