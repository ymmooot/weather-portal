<template>
  <div class="detail">
    <div class="detail__inner">
      <SearchResultItem class="detail__card" :place="place" @fav="toggle" :is-fav="isFav(place)" />
      <button class="detail__close batsu" @click='$emit("close")'></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import SearchResultItem from "./SearchResultItem.vue";
import { type Place } from "../search";
import { useFav } from "../fav";

const { isFav, toggle } = useFav();

defineProps<{
  place: Place;
}>();

defineEmits<{
  (e: "close"): void;
}>();

onMounted(() => {
  (document.activeElement as HTMLInputElement)?.blur();
});
</script>

<style scoped lang="scss">
.detail {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 50%);
  backdrop-filter: blur(3px);

  &__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 800px;
  }

  &__close {
    width: 36px;
    height: 36px;
    margin-top: 10px;
    cursor: pointer;
    background-color: white;
    border: none;
    border-radius: 6px;
  }
}

/* batsu */
.batsu {
  position: relative;
  display: block;
}

.batsu::before,
.batsu::after {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 18px;
  content: "";
  background: #333;
}

.batsu::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.batsu::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
</style>
