<template>
  <Transition name="fade">
    <div class="overlay" v-show="show" @click="$emit('close')">
      <Transition name="slide">
        <div class="menu" v-show="show" @click.stop>
          <p class="menu__title">検索履歴</p>
          <ul class="menu__history">
            <li v-for="item,i in histories" :key="i" @click="$emit('select', item)">
              <p class="menu__history-item">{{ item }}</p>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useHistory } from '../search'

const props = defineProps<{
  show: boolean;
}>();

const { get } = useHistory();
const histories = computed(() => get());

</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
  display: flex;
  justify-content: flex-end;
}

.menu {
  width: 80%;
  max-width: 300px;
  height: 100%;
  background-color: #fff;

  &__title {
    font-size: 1rem;
    font-optical-sizing: auto;
    font-style: normal;
    text-align: center;
    padding: 0.8rem;
    border-bottom: 1px solid #d8d8d8;
  }

  &__history {
    padding: 0 1.4rem;
  }

  &__history-item {
    padding: 0.8rem;
    border-bottom: 1px solid #d8d8d8;
    font-size: 0.9rem;
    font-optical-sizing: auto;
    font-style: normal;
    color: #333;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
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
