<template>
  <header class="header">
    <h1 class="header__title">{{ title }}</h1>
    <MenuButton class="header__menu" v-model="menuOpened" />
  </header>
</template>

<script setup lang="ts">
import MenuButton from "./MenuButton.vue";
defineProps<{
  title: string;
}>();
const menuOpened = defineModel<boolean>({ default: false });
</script>

<style scoped lang="scss">
.header {
  position: relative;
  height: 50px;
  padding: 0.9rem 0 0.6rem;
  color: #333;
  text-align: center;
  background: #fff;
  border-bottom: 1px solid #d8d8d8;

  &__title {
    margin: 0;
    font-family: "Josefin Sans", sans-serif;
    font-size: 1.5rem;
    font-style: normal;
    font-optical-sizing: auto;
  }

  &__menu {
    position: absolute;
    top: 8px;
    right: 12px;
    z-index: 10;
  }
}
</style>
