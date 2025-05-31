<template>
  <Card class="search">
    <form @submit.prevent="search" class="search__form">
      <input
        type="search"
        placeholder="Where?"
        v-model.trim="searchText"
        class="search__input"
        autofocus
      />
      <button type="submit" class="search__button">Go</button>
    </form>
  </Card>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Card from "./Card.vue";

const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

// local state for search text
const searchText = ref(props.modelValue);
// watch for changes in the modelValue prop
watch(() => props.modelValue, (val) => {
  searchText.value = val;
});

const search = () => {
  emit("update:modelValue", searchText.value.trim());
  (document.activeElement as HTMLElement)?.blur();
};
</script>

<style lang="scss" scoped>
.search {
  padding: 1rem;

  &__form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__input {
    flex: 1;
    padding: 0.5rem;
    margin-right: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;

    &:focus {
      outline: none;
      border-color: #29ca5f;
    }
  }

  &__input::-webkit-search-cancel-button {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  &__button {
    padding: 0.5rem 1rem;
    color: white;
    cursor: pointer;
    background-color: #29ca5f;
    border: none;
    border-radius: 0.25rem;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
