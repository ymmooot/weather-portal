<template>
  <Card class="search">
    <form @submit.prevent="search" class="search__form">
      <input type="text" placeholder="Where?" v-model.trim="searchText" class="search__input" autofocus/>
      <button type="submit" class="search__button">Go</button>
    </form>
  </Card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Card from './Card.vue';

const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

// local state for search text
const searchText = ref(props.modelValue);
// watch for changes in the modelValue prop
watch(() => props.modelValue, (val) => {
  searchText.value = val;
});

const search = () => {
  emit('update:modelValue', searchText.value.trim());
};
</script>

<style lang="scss" scoped>
// 横幅いっぱいに二つ並べる
.search {
  padding: 1rem;

  &__form {
    display: flex;
    justify-content: space-between;
    align-items: center;

  }

  &__input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    margin-right: 0.5rem;

    &:focus {
      border-color: #29ca5f;
      outline: none;
    }
  }

  &__button {
    padding: 0.5rem 1rem;
    background-color: #29ca5f;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
