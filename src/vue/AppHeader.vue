<template>
  <header class="header">
    <h1 class="header__title">{{ title }}</h1>
    <MenuButton class="header__menu" v-model="menuOpened" />
  </header>
</template>

<script setup lang="ts">
import MenuButton from './MenuButton.vue';
const props = defineProps<{
  title: string;
}>();
const menuOpened = defineModel<boolean>({ default: false });
</script>

<style scoped lang="scss">
.header {
  height: 50px;
  position: relative;
  background: #fff;
  border-bottom: 1px solid #d8d8d8;
  color: #333;
  padding: 0.9rem 0 0.6rem;
  text-align: center;

  &__title {
    font-size: 1.5rem;
    font-family: "Josefin Sans", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    margin: 0;
  }

  &__menu {
    position: absolute;
    top: 8px;
    right: 12px;
    z-index: 10;
  }
}
</style>
