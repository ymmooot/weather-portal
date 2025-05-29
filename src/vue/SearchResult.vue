<template>
  <div class="result">
    <h2 class="result__title">「{{ searchText }}」の検索結果</h2>
    <ul>
      <li class="result__item" v-for="place, i in places" :key="i">
        <SearchResultItem :place="place" />
      </li>
    </ul>
  </div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Card from './Card.vue';
import SearchResultItem from './SearchResultItem.vue';
import { searchLocation, type Place } from '../search.ts';

const props = defineProps<{
  searchText: string;
}>();

const places = ref<Place[]>([]);

watch(() => props.searchText, async (v) => {
  if (!v) {
    return;
  }
  places.value = await searchLocation(v)
}, {
  immediate: true,
});

</script>

<style lang="scss" scoped>
.result {
  margin-top: 20px;

  &__title {
    font-size: 0.9rem;
    border-bottom: 2px solid #29ca5f;
    padding-bottom: 0.5rem;
  }

  &__item {
    margin: 0.5rem 0;
    list-style: none;
  }
}
</style>
