<template>
  <Transition name="fade">
    <div class="overlay" v-show="show" @click='$emit("close")'>
      <Transition name="slide">
        <div class="menu" v-show="show" @click.stop>
          <p class="menu__title">検索履歴</p>
          <ul class="menu__history">
            <li v-for="(item, i) in histories" :key="i" @click='$emit("select", item)'>
              <p class="menu__history-item">{{ item }}</p>
            </li>
          </ul>
          <div class="menu__actions">
            <button class="menu__clear" @click="clear">
              キャッシュをクリア
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { useHistory } from "../search";
import { allCacheKeys } from "../const";

defineProps<{
  show: boolean;
}>();

const { get } = useHistory();
const histories = computed(() => get());

const clear = () => {
  const ok = window.confirm(
    "キャッシュをクリアしますか？\n検索履歴、お気に入りが全て消去されます。",
  );
  if (!ok) return;
  allCacheKeys.forEach((key) => {
    const s = useLocalStorage(key, undefined);
    s.value = undefined;
  });
};
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  display: flex;
  justify-content: flex-end;
  width: 100dvw;
  height: 100dvh;
  background-color: rgb(0 0 0 / 50%);
}

.menu {
  width: 80%;
  max-width: 300px;
  height: 100%;
  overflow-y: auto;
  overscroll-behavior-y: none;
  background-color: #fff;

  &__title {
    padding: 0.8rem;
    font-size: 1rem;
    font-style: normal;
    font-optical-sizing: auto;
    text-align: center;
    border-bottom: 1px solid #d8d8d8;
  }

  &__history {
    padding: 0 1.4rem;
  }

  &__history-item {
    padding: 0.8rem;
    font-size: 0.9rem;
    font-style: normal;
    font-optical-sizing: auto;
    color: #333;
    cursor: pointer;
    border-bottom: 1px solid #d8d8d8;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 1rem;
  }

  &__clear {
    padding: 0.5rem 1rem;
    font-size: 0.7rem;
    color: white;
    cursor: pointer;
    background-color: gray;
    border: none;
    border-radius: 0.25rem;

    &:hover {
      opacity: 0.8;
    }
  }
}

/* Transition effects */

/* Fade in/out */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide in/out */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s linear;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
