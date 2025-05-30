<template>
  <Card class="item">
    <div class="item__info">
      <div class="item__info-main">
        <p class="item__name">{{ place.name }}</p>
        <p class="item__tag">{{ place.addresstype }}</p>
      </div>
      <p class="item__detail">{{ detail }}</p>
      <p class="item__latlon">{{ place.lat }} / {{ place.lon }}</p>
    </div>
    <div class="item__actions">
      <a
        class="item__action-button"
        :href="scwLink"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/scw.png" alt="scw"><span>SCW</span>
      </a>
      <a
        class="item__action-button"
        :href="windyLink"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/windy.png" alt="Windy"><span>Windy</span>
      </a>
      <a
        class="item__action-button"
        :href="weatherNewsLink"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/wn.svg" alt="ウェザーニュース"><span>WN</span>
      </a>
    </div>

    <StarIcon
      class="item__star"
      :active="isFav ?? false"
      @click='emit("fav", place)'
    />
  </Card>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Card from "./Card.vue";
import StarIcon from "./StarIcon.vue";
import { type Place } from "../search.ts";

const props = defineProps<{
  place: Place;
  isFav?: boolean;
}>();

const emit = defineEmits<{
  (e: "fav", placeID: Place): void;
}>();

const detail = computed((): string => {
  // 最後の「, 日本」を削除
  if (!props.place.display_name) {
    return "";
  }
  if (props.place.display_name.endsWith("日本")) {
    return props.place.display_name.slice(0, -4);
  }
  return props.place.display_name || "";
});

const scwLink = computed((): string => {
  return `https://supercweather.com/?lat=${props.place.lat}&lng=${props.place.lon}`;
});
const windyLink = computed((): string => {
  return `https://www.windy.com/${props.place.lat}/${props.place.lon}`;
});
const weatherNewsLink = computed(() => {
  return `https://weathernews.jp/onebox/${props.place.lat}/${props.place.lon}`;
});
</script>

<style lang="scss" scoped>
.item {
  position: relative;

  &__info-main {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
  }

  &__name {
    font-size: 1.2rem;
    font-weight: bold;
  }

  &__tag {
    display: inline-block;
    font-size: 0.6rem;
    color: #fff;
    background-color: #29ca5f;
    margin-top: 0.2rem;
    padding: 0.1rem 0.4rem;
    border-radius: 6px;
    text-transform: capitalize;
  }

  &__detail {
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.2rem;
  }

  &__latlon {
    font-size: 0.8rem;
    color: #999;
  }

  &__actions {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0.5rem;
    gap: 8px;
  }

  &__action-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0.4rem 0.6rem;
    color: #666;
    border: 1px solid #ccc;
    text-decoration: none;
    border-radius: 4px;
    font-size: 0.8rem;

    img {
      width: 1.2rem;
      height: 1.2rem;
      vertical-align: middle;
    }

    &:hover {
      opacity: 0.8;
    }
  }

  &__star {
    position: absolute;
    top: 0.7rem;
    right: 0.7rem;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}
</style>
