<template>
  <div class="shared">
    <h2 class="shared__title">
      <span>共有された場所</span>
      <button class="shared__clear" @click='$emit("close")'>クリア</button>
    </h2>
    <SearchResultItem :place="place" @fav="toggle" :is-fav="isFav(place)" />
  </div>
</template>

<script setup lang="ts">
import SearchResultItem from "./SearchResultItem.vue";
import { type Place } from "../search";
import { useFav } from "../fav";

defineProps<{
  place: Place;
}>();

defineEmits<{
  close: [];
}>();

const { toggle, isFav } = useFav();
</script>

<style lang="scss" scoped>
.shared {
  margin-top: 20px;

  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
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
}
</style>
