<template>
  <div class="history" v-if="histories.length">
    <h2 class="history__title">検索履歴</h2>
    <Card>
      <ul class="history__list">
        <li class="history__item" v-for="item in histories" :key="item" @click='$emit("select", item)'>
          <p class="history__item-text">{{ item }}</p>
          <button class="history__item-remove" aria-label="削除" @click.stop="remove(item)">
            ✕
          </button>
        </li>
      </ul>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Card from "./Card.vue";
import { useHistory } from "../search";

defineEmits<{
  select: [item: string];
}>();

const { get, remove } = useHistory();
const histories = computed(() => get());
</script>

<style lang="scss" scoped>
.history {
  margin-top: 20px;

  &__title {
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    border-bottom: 2px solid #29ca5f;
  }

  &__list {
    padding: 0;
    margin: 0;
  }

  &__item {
    display: flex;
    align-items: center;
    cursor: pointer;
    list-style: none;
    border-bottom: 1px solid #d8d8d8;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: #f0f0f0;
    }
  }

  &__item-text {
    flex: 1;
    padding: 0.8rem;
    font-size: 0.9rem;
    color: #333;
  }

  &__item-remove {
    padding: 0.8rem;
    font-size: 0.8rem;
    color: #999;
    cursor: pointer;
    background: none;
    border: none;

    &:hover {
      color: #333;
    }
  }
}
</style>
