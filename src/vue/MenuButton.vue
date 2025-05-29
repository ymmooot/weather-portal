<template>
  <button
    class="menu-button"
    :aria-pressed="modelValue"
    :aria-label="modelValue ? 'メニューを閉じる' : 'メニューを開く'"
    @click="toggle"
  >
    <span :class="['bar', 'bar1', { open: modelValue }]"></span>
    <span :class="['bar', 'bar2', { open: modelValue }]"></span>
    <span :class="['bar', 'bar3', { open: modelValue }]"></span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();
const toggle = () => emit('update:modelValue', !props.modelValue);
</script>

<style scoped lang="scss">
.menu-button {
  position: relative;
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  z-index: 10;
  padding: 0;
}
.bar {
  display: block;
  width: 1.6rem;
  height: 0.2rem;
  background: #333;
  border-radius: 2px;
  transition: all 0.3s ease;
  position: relative;
}
.bar1.open {
  transform: translateY(0.5rem) rotate(45deg);
}
.bar2.open {
  opacity: 0;
}
.bar3.open {
  transform: translateY(-0.5rem) rotate(-45deg);
}
</style>
