<template>
  <Card class="item">
    <div class="item__info">
      <div class="item__info-main">
        <p class="item__name">{{ place.name }}</p>
        <p class="item__tag">{{ place.addresstype }}</p>
      </div>
      <p class="item__detail">{{ detail }}</p>
      <p class="item__latlon">{{ place.lat }} / {{ place.lon }}</p>
      <HtmlComment :text="place.osm_id" />
    </div>
    <div class="item__actions">
      <a class="item__action-button" :href="scwLink" target="_blank" rel="noopener noreferrer">
        <img src="/scw.png" alt="scw"><span class="item__action-text">SCW</span>
      </a>
      <a class="item__action-button" :href="windyLink" target="_blank" rel="noopener noreferrer">
        <img src="/windy.png" alt="Windy"><span class="item__action-text">Windy</span>
      </a>
      <a
        class="item__action-button"
        :href="weatherNewsLink"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/wn.svg" alt="ウェザーニュース"><span class="item__action-text">WN</span>
      </a>
      <a
        v-if="yamatenLink"
        class="item__action-button"
        :href="yamatenLink"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/yamaten.jpg" alt="ヤマテン"><span class="item__action-text">ヤマテン</span>
      </a>
      <button v-if="canShare" class="item__action-button" @click="share">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" x2="12" y1="2" y2="15" />
        </svg><span class="item__action-text">共有</span>
      </button>
    </div>

    <StarIcon class="item__star" :active="isFav ?? false" @click='emit("fav", place)' />
  </Card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Card from "./Card.vue";
import StarIcon from "./StarIcon.vue";
import HtmlComment from "./HtmlComment.vue";
import { type Place } from "../search";
import { getYamatenID } from "../yamaten";

const props = defineProps<{
  place: Place;
  isFav?: boolean;
}>();

const emit = defineEmits<{
  (e: "fav", placeID: Place): void;
}>();

const detail = computed((): string => {
  if (!props.place.display_name) {
    return "";
  }
  // 最後の「, 日本」を削除
  if (!props.place.display_name.endsWith("日本")) {
    return "";
  }
  const parts = props.place.display_name
    .split(", ")
    .slice(0, -1)
    .filter((part) => part !== "日本")
    .filter((part) => !/^\d{3}-\d{4}$/.test(part)); // 郵便番号を除外
  return parts.reverse().join(" ");
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

const canShare = typeof navigator.share === "function";
const share = async () => {
  const url = new URL(window.location.origin + window.location.pathname);
  // 古いキャッシュ済みデータには osm_type がないので Node 扱いにフォールバック
  url.searchParams.set("id", `${props.place.osm_type ?? "N"}${props.place.osm_id}`);
  const data = {
    title: props.place.name,
    url: url.toString(),
  };
  if (navigator.canShare && !navigator.canShare(data)) {
    return;
  }
  await navigator.share(data);
};

const yamatenLink = computed((): string | null => {
  const mountainID = getYamatenID({
    lat: props.place.lat,
    lon: props.place.lon,
  });
  if (!mountainID) {
    return null;
  }
  return mountainID ? `https://i.yamatenki.co.jp/mountain?mid=${mountainID}` : null;
});
</script>

<style lang="scss" scoped>
.item {
  position: relative;

  &__info-main {
    display: flex;
    gap: 4px;
    align-items: flex-start;
    align-items: center;
    justify-content: flex-start;
  }

  &__name {
    font-size: 1.2rem;
    font-weight: bold;
  }

  &__tag {
    display: inline-block;
    padding: 0.1rem 0.4rem;
    margin-top: 0.2rem;
    font-size: 0.6rem;
    color: #fff;
    text-transform: capitalize;
    background-color: #29ca5f;
    border-radius: 6px;
  }

  &__detail {
    margin-top: 0.2rem;
    font-size: 0.9rem;
    color: #666;
  }

  &__latlon {
    font-size: 0.8rem;
    color: #999;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    justify-content: flex-start;
    margin-top: 0.5rem;
  }

  &__action-button {
    display: inline-flex;
    gap: 6px;
    align-items: center;
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
    color: #666;
    text-decoration: none;
    cursor: pointer;
    background: none;
    border: 1px solid #ccc;
    border-radius: 4px;

    img,
    svg {
      width: 1.2rem;
      height: 1.2rem;
      vertical-align: middle;
    }

    &:hover {
      opacity: 0.8;
    }
  }

  &__action-text {
    display: inline-block;
    vertical-align: middle;
    white-space: nowrap;
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
