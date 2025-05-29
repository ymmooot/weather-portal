<template>
  <div class="app">
    <AppHeader title="Weather Portal" v-model="menuOpened"/>
    <main class="app__main">
      <SearchForm v-model="searchText" />
      <SearchResult :search-text="searchText" v-if="searchText"/>
    </main>
    <AppFooter class="app__footer"/>

    <OverlayMenu :show="menuOpened" @close="menuOpened = false" @select="onSelect"/>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
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
    margin: 0 auto;
    max-width: 800px;
    padding: 1rem 1rem;
    min-height: calc(100dvh - 110px); // 50px header + 60px footer
  }

  &__footer {
    height: 60px;
  }
}
</style>
