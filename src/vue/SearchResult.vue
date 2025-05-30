<template>
  <div class="result">
    <div v-if="!searching">
      <h2 class="result__title">「{{ searchText }}」の検索結果</h2>
      <ul v-if="places.length">
        <li class="result__item" v-for="(place, i) in places" :key="i">
          <SearchResultItem
            :place="place"
            @fav="toggleFav"
            :is-fav="isFav(place)"
          />
        </li>
      </ul>
      <div v-else class="result__noitem">
        該当する地名が見つかりませんでした
      </div>
    </div>
    <div v-else class="result__loading">
      検索中...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Card from "./Card.vue";
import SearchResultItem from "./SearchResultItem.vue";
import { type Place, useSearch } from "../search.ts";
import { useFav } from "../fav.ts";

const props = defineProps<{
  searchText: string;
}>();

const places = ref<Place[]>([]);
const { search, searching } = useSearch();
const { toggle: toggleFav, isFav } = useFav();

watch(() => props.searchText, async (v) => {
  if (!v) {
    return;
  }
  places.value = await search(v);
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

  &__noitem {
    margin-top: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.9rem;
  }
}
</style>
