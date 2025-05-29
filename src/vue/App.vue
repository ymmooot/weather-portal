<template>
  <div class="app">
    <AppHeader title="Weather Portal" v-model="menuOpened"/>
    <main class="app__main">
      <SearchForm v-model="searchText" />
      <SearchResult :search-text="searchText" v-if="searchText"/>
    </main>

    <OverlayMenu :show="menuOpened" @close="menuOpened = false" @select="onSelect"/>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import AppHeader from './AppHeader.vue';
import SearchForm from './SearchForm.vue';
import SearchResult from './SearchResult.vue';
import OverlayMenu from './OverlayMenu.vue';

const searchText = ref('');
const menuOpened = ref(false);
const onSelect = (item: string) => {
  menuOpened.value = false;
  searchText.value = item;
}
</script>

<style scoped lang="scss">
.app {
  &__main {
    margin: 1rem auto;
    max-width: 800px;
    padding: 0 1rem;
  }
}
</style>
