<template>
  <div class="not-container">
    <img src="@/assets/images/500.png" class="not-img" alt="500" />
    <div class="not-detail">
      <h2>500</h2>
      <h4>{{ $t(`components.500.msg`) }}~🤦‍♂️🤦‍♀️</h4>
      <el-button type="primary" @click="router.back"> {{ $t(`components.back`) }} </el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="500">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped lang="scss">
@import "./index";
</style>
