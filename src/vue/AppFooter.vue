<template>
  <footer class="footer">
    <p class="footer__text">Created by
      <a href="https://github.com/ymmooot" target="_blank" rel="noopener noreferrer">ymmooot</a>
    </p>
    <p class="footer__version">Version: {{ commitHash }}</p>
  </footer>
</template>

<script setup lang="ts">
const commitHash = __COMMIT_HASH__;
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__text {
    font-size: 0.8rem;
  }

  &__version {
    font-size: 0.6rem;
    color:  #999;
    margin-top: 4px;
    padding-bottom: 10px;
  }
}
</style>
