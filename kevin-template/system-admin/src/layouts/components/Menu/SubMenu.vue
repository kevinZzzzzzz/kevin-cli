<template>
  <!-- <template v-if="!collapse"> -->
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <template #title>
        <el-icon v-if="subItem.meta.icon">
          <component :is="subItem.meta.icon" />
        </el-icon>
        <span class="sle">{{ $t(`layouts.menu.${subItem.name}`) }}</span>
      </template>
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <el-icon v-if="subItem.meta.icon">
        <component :is="subItem.meta.icon" />
      </el-icon>
      <template #title>
        <span class="sle">{{ $t(`layouts.menu.${subItem.name}`) }}</span>
      </template>
    </el-menu-item>
  </template>
  <!-- </template>
  <el-scrollbar v-else>
    <div class="split-list">
      <div v-for="item in menuList" :key="item.path" class="split-item">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span class="title">{{ $t(`layouts.menu.${item.name}`) }}</span>
      </div>
    </div>
  </el-scrollbar> -->
</template>

<script setup lang="ts">
// @ts-expect-error
import { Menu } from "@element-plus/icons-vue/dist/types/components";
import { useRouter } from "vue-router";

const menuList = defineModel("menuList", {
  type: Array as () => Menu.MenuOptions[],
  default: () => []
});
const collapse = defineModel("collapse", {
  type: Boolean,
  default: false
});
const router = useRouter();
// const splitActive = ref("");
const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
  router.push(subItem.path);
};
</script>

<style lang="scss">
.el-sub-menu .el-sub-menu__title:hover {
  color: var(--el-menu-hover-text-color) !important;
  background-color: transparent !important;
}
.el-menu--collapse {
  .is-active {
    .el-sub-menu__title {
      color: #ffffff !important;
      background-color: var(--el-color-primary) !important;
    }
  }
}
.el-menu-item {
  &:hover {
    color: var(--el-menu-hover-text-color);
  }
  &.is-active {
    color: var(--el-menu-active-color) !important;
    background-color: var(--el-menu-active-bg-color) !important;
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      content: "";
      background-color: var(--el-color-primary);
    }
  }
}
.vertical,
.classic,
.transverse {
  .el-menu-item {
    &.is-active {
      &::before {
        left: 0;
      }
    }
  }
}
.columns {
  .el-menu-item {
    &.is-active {
      &::before {
        right: 0;
      }
    }
  }
}

// .el-scrollbar {
//   height: calc(100% - 55px);
//   .split-list {
//     flex: 1;
//     .split-item {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       justify-content: center;
//       height: 70px;
//       cursor: pointer;
//       transition: all 0.3s ease;
//       .el-icon {
//         font-size: 20px;
//       }
//       .title {
//         margin-top: 6px;
//         font-size: 12px;
//       }
//       .el-icon,
//       .title {
//         color: var(--el-menu-text-color);
//       }
//     }
//     .split-active {
//       background-color: var(--el-color-primary) !important;
//       .el-icon,
//       .title {
//         color: #ffffff !important;
//       }
//     }
//   }
// }
</style>
