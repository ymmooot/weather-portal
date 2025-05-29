<template>
  <div class="app">
    <AppHeader title="Weather Portal" />
    <main class="app__main">
      <SearchForm v-model="searchText" />
      <SearchResult :search-text="searchText" v-if="searchText"/>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from './AppHeader.vue';
import SearchForm from './SearchForm.vue';
import SearchResult from './SearchResult.vue';

const searchText = ref('');
</script>

<style scoped lang="scss">
.app {
  &__main {
    margin: 1rem;
  }
}
</style>
