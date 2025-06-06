<template>
  <div class="app">
    <AppHeader title="Weather Portal" v-model="menuOpened" />
    <main class="app__main">
      <SearchForm v-model="searchText" />
      <SearchResult :search-text="searchText" v-if="searchText" />
    </main>
    <AppFooter class="app__footer" />

    <SideOverlay
      :show="menuOpened"
      @close="menuOpened = false"
      @select="onSelect"
    />

    <!-- Fav -->
    <button class="app__fav" @click="favListOpened = true">
      <StarIcon class="app__fav-icon" active main-color="#fff" />
    </button>
    <Transition name="up">
      <FavListOverlay
        v-show="favListOpened"
        @close="favListOpened = false"
        @select="onSelect"
      />
    </Transition>

    <DetailOverlay v-if="place" :place="place" @close="clearID" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useScrollLock } from "@vueuse/core";

import AppHeader from "./AppHeader.vue";
import AppFooter from "./AppFooter.vue";
import SearchForm from "./SearchForm.vue";
import SearchResult from "./SearchResult.vue";
import SideOverlay from "./SideOverlay.vue";
import FavListOverlay from "./FavListOverlay.vue";
import StarIcon from "./StarIcon.vue";
import DetailOverlay from "./DetailOverlay.vue";
import { useDetail } from "../detail";

const { place, clearID } = useDetail();

const searchText = ref("");
const isWindowScollLocked = useScrollLock(window);

// --- Side Menu Overlay ---
const menuOpened = ref(false);
const onSelect = (item: string) => {
  menuOpened.value = false;
  searchText.value = item;
};
watch(menuOpened, (v) => {
  isWindowScollLocked.value = v;
});

// --- Favorite List Overlay ---
const favListOpened = ref(false);
watch(favListOpened, (v) => {
  isWindowScollLocked.value = v;

  // --- URL hash and history control ---
  // - When favListOpened becomes true (open), location.hash = '#fav' adds one entry to the browser history
  // - When favListOpened becomes false (close), history.replaceState removes the hash without adding to history
  // - As a result, only the transition from "no hash" to "#fav" is recorded in history, and repeated open/close does not increase history entries
  if (v) {
    if (location.hash !== "#fav") {
      location.hash = "#fav";
    }
  } else {
    history.replaceState(null, "", location.pathname);
  }
});
const syncFavWithHash = () => {
  favListOpened.value = location.hash === "#fav";
};
window.addEventListener("hashchange", syncFavWithHash);
syncFavWithHash();
</script>

<style scoped lang="scss">
.app {
  &__main {
    max-width: 800px;
    min-height: calc(100dvh - 110px); // 50px header + 60px footer
    padding: 1rem;
    margin: 0 auto;
  }

  &__footer {
    height: 60px;
  }

  &__fav {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    cursor: pointer;
    background-color: #f9b618;
    border: none;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgb(0 0 0 / 40%);
  }

  &__fav-icon {
    width: 24px;
    height: 24px;
  }
}

/* Transition for the favorite button */
.up-enter-active, .up-leave-active {
  transition: transform 0.3s ease;
}

.up-enter-from, .up-leave-to {
  transform: translateY(100%);
}

.up-enter-to, .up-leave-from {
  transform: translateY(0);
}
</style>
