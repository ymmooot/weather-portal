<template>
  <footer class="footer">
    <p class="footer__text">
      Created by
      <a
        href="https://github.com/ymmooot"
        target="_blank"
        rel="noopener noreferrer"
      >ymmooot</a>
    </p>
    <p class="footer__version">Version: {{ commitHash }}</p>
  </footer>
</template>

<script setup lang="ts">
// @ts-ignore __COMMIT_HASH_ is replaced by Vite during build
const commitHash = __COMMIT_HASH__;
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__text {
    font-size: 0.8rem;
  }

  &__version {
    padding-bottom: 10px;
    margin-top: 4px;
    font-size: 0.6rem;
    color: #999;
  }
}
</style>
