<!--
 * @Author: kevinZzzzzz
 * @Date: 2023-05-06 14:50:30
 * @version: 
 * @LastEditors: kevinZzzzzz
 * @LastEditTime: 2023-06-02 11:38:36
 * @Description: 布局配置
 * @FilePath: \vue-ts-vite\src\layout\default.vue
-->
<template>
  <div class='main'>
    <div class="main__context">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'default-layout'
}
</script>
<script lang="ts" setup>
import {ref, onMounted, reactive} from 'vue'
</script>
<style scoped lang="less">
.main {
  width: 100vw;
  height: 100vh;
  background-color: #ccc;
  &__context {
    height: 100vh;
  }
}
</style>