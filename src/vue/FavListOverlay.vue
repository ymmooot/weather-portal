<template>
  <div class="menu">
    <div class="menu__header">
      <button class="menu__close batsu" @click="emit('close')"></button>
      <p class="menu__title">お気に入り</p>
    </div>
    <ul class="menu__list">
      <li class="menu__item" v-for="place, i in favList" :key="i">
        <SearchResultItem :place="place" is-fav @fav="toggle" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFav } from '../fav'
import SearchResultItem from './SearchResultItem.vue';

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'select', item: string): void;
}>();

const { get, toggle } = useFav();
const favList = computed(() => get());
</script>

<style scoped lang="scss">
.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background: #f0f4f8;
  z-index: 1000;
  overflow-y: auto;
  padding-bottom: 1rem;

  &__header {
    background-color: #fff;
  }

  &__close {
    position: absolute;
    top: 10px;
    left: 12px;
    width: 30px;
    height: 30px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  &__title {
    font-size: 1rem;
    font-optical-sizing: auto;
    font-style: normal;
    text-align: center;
    padding: 0.8rem;
    border-bottom: 1px solid #d8d8d8;
  }

  &__list {
    margin: 0 auto;
    max-width: 800px;
    padding: 0 1rem;
  }

  &__item {
    margin-top: 0.5rem;
    list-style: none;
  }
}

/* batsu */
.batsu {
  display: block;
}

.batsu::before,
.batsu::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 30px;
  background: #333;
}

.batsu::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.batsu::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
</style>
