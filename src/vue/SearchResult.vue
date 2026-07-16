<template>
  <div class="result">
    <div v-if="!searching">
      <h2 class="result__title">
        <span>「{{ searchText }}」の検索結果</span>
        <button class="result__clear" @click='$emit("clear")'>クリア</button>
      </h2>
      <ul v-if="places.length">
        <li class="result__item" v-for="(place, i) in places" :key="i">
          <SearchResultItem :place="place" @fav="toggleFav" :is-fav="isFav(place)" />
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
import SearchResultItem from "./SearchResultItem.vue";
import { type Place, useSearch } from "../search";
import { useFav } from "../fav";

const props = defineProps<{
  searchText: string;
}>();

defineEmits<{
  clear: [];
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.5rem;
    font-size: 0.9rem;
    border-bottom: 2px solid #29ca5f;
  }

  &__clear {
    padding: 0.2rem 0.6rem;
    font-size: 0.7rem;
    color: #666;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 0.25rem;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  &__item {
    margin: 0.5rem 0;
    list-style: none;
  }

  &__noitem {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.2rem;
    font-size: 0.9rem;
  }
}
</style>
