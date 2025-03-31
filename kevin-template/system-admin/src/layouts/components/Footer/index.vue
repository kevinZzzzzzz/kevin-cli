<template>
  <div class="footer flx-center">
    <a> {{ year }} © System-Admin By System Technology. </a>
  </div>
</template>
<script setup lang="ts" name="Footer">
import { ref } from "vue";

const year = ref(new Date().getFullYear());
</script>

<style scoped lang="scss">
@import "./index";
</style>
