<template>
  <Transition name="fade">
    <div class="overlay" v-show="show" @click='$emit("close")'>
      <Transition name="slide">
        <div class="menu" v-show="show" @click.stop>
          <section class="menu__section">
            <h2 class="menu__section-title">設定</h2>
            <label class="menu__setting">
              <span class="menu__setting-label">
                <img class="menu__setting-icon" src="/shademap.png" alt="">
                ShadeMap を表示
              </span>
              <input
                class="menu__switch"
                type="checkbox"
                role="switch"
                v-model="settings.shadeMap"
              >
            </label>
          </section>
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
import { useLocalStorage } from "@vueuse/core";
import { allCacheKeys } from "../const";
import { useSettings } from "../settings";

const { settings } = useSettings();

defineProps<{
  show: boolean;
}>();

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
  padding-top: 50px; // AppHeader と同じ高さ
  overflow-y: auto;
  overscroll-behavior-y: none;
  background-color: #fff;

  &__section {
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }

  &__section-title {
    margin-bottom: 0.6rem;
    font-size: 0.8rem;
    font-weight: bold;
    color: #666;
  }

  &__setting {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9rem;
    cursor: pointer;
  }

  &__setting-label {
    display: inline-flex;
    gap: 6px;
    align-items: center;
  }

  &__setting-icon {
    width: 1.2rem;
    height: 1.2rem;
  }

  &__switch {
    position: relative;
    width: 2.6rem;
    height: 1.5rem;
    margin: 0;
    cursor: pointer;
    background-color: #ccc;
    border-radius: 0.75rem;
    transition: background-color 0.2s ease;
    appearance: none;

    &::before {
      position: absolute;
      top: 0.15rem;
      left: 0.15rem;
      width: 1.2rem;
      height: 1.2rem;
      content: "";
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0 1px 2px rgb(0 0 0 / 30%);
      transition: transform 0.2s ease;
    }

    &:checked {
      background-color: #29ca5f;

      &::before {
        transform: translateX(1.1rem);
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
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
