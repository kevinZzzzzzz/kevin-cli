<template>
  <el-drawer v-model="drawerVisible" :title="$t('layouts.themeDrawer.title')" size="290px">
    <!-- 布局样式 -->
    <el-divider class="divider" content-position="center">
      <!-- <el-icon><Notification /></el-icon> -->
      {{ $t("layouts.themeDrawer.block1Text") }}
    </el-divider>
    <div class="layout-box">
      <el-tooltip effect="dark" :content="$t('layouts.themeDrawer.verticalLayoutHover')" placement="top" :show-after="200">
        <div :class="['layout-item layout-vertical', { 'is-active': layout == 'vertical' }]" @click="setLayout('vertical')">
          <div class="layout-dark"></div>
          <div class="layout-container">
            <div class="layout-light"></div>
            <div class="layout-content"></div>
          </div>
          <el-icon v-if="layout == 'vertical'">
            <CircleCheckFilled />
          </el-icon>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" :content="$t('layouts.themeDrawer.classicLayoutHover')" placement="top" :show-after="200">
        <div :class="['layout-item layout-classic', { 'is-active': layout == 'classic' }]" @click="setLayout('classic')">
          <div class="layout-dark"></div>
          <div class="layout-container">
            <div class="layout-light"></div>
            <div class="layout-content"></div>
          </div>
          <el-icon v-if="layout == 'classic'">
            <CircleCheckFilled />
          </el-icon>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" :content="$t('layouts.themeDrawer.horizontalLayoutHover')" placement="top" :show-after="200">
        <div :class="['layout-item layout-transverse', { 'is-active': layout == 'transverse' }]" @click="setLayout('transverse')">
          <div class="layout-dark"></div>
          <div class="layout-content"></div>
          <el-icon v-if="layout == 'transverse'">
            <CircleCheckFilled />
          </el-icon>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" :content="$t('layouts.themeDrawer.columnarLayoutHover')" placement="top" :show-after="200">
        <div :class="['layout-item layout-columns', { 'is-active': layout == 'columns' }]" @click="setLayout('columns')">
          <div class="layout-dark"></div>
          <div class="layout-light"></div>
          <div class="layout-content"></div>
          <el-icon v-if="layout == 'columns'">
            <CircleCheckFilled />
          </el-icon>
        </div>
      </el-tooltip>
    </div>
    <div class="theme-item">
      <span>
        {{ $t("layouts.themeDrawer.reverseColorSwitch") }}
        <el-tooltip effect="dark" :content="$t('layouts.themeDrawer.reverseColorSwitchHover')" placement="top">
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
      </span>
      <el-switch v-model="asideInverted" @change="setAsideTheme" />
    </div>
    <div class="theme-item mb50">
      <span>
        {{ $t("layouts.themeDrawer.headReversalColorSwitch") }}
        <el-tooltip effect="dark" :content="$t('layouts.themeDrawer.headReversalColorSwitchHover')" placement="top">
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
      </span>
      <el-switch v-model="headerInverted" @change="setHeaderTheme" />
    </div>

    <!-- 全局主题 -->
    <el-divider class="divider" content-position="center">
      <!-- <el-icon><ColdDrink /></el-icon> -->
      {{ $t("layouts.themeDrawer.block2Text") }}
    </el-divider>
    <div class="theme-item">
      <span>{{ $t("layouts.themeDrawer.themeColor") }}</span>
      <el-color-picker v-model="primary" :predefine="colorList" @change="changePrimary" />
    </div>
    <div class="theme-item">
      <span>{{ $t("layouts.themeDrawer.darkModeSwitch") }}</span>
      <SwitchDark />
    </div>
    <div class="theme-item">
      <span>{{ $t("layouts.themeDrawer.greyPatternSwitch") }}</span>
      <el-switch v-model="isGrey" @change="changeGreyOrWeak('grey', !!$event)" />
    </div>
    <div class="theme-item mb40">
      <span>{{ $t("layouts.themeDrawer.colorWeaknessPatternSwitch") }}</span>
      <el-switch v-model="isWeak" @change="changeGreyOrWeak('weak', !!$event)" />
    </div>

    <!-- 界面设置 -->
    <el-divider class="divider" content-position="center">
      <!-- <el-icon><Setting /></el-icon> -->
      {{ $t("layouts.themeDrawer.block3Text") }}
    </el-divider>
    <div class="theme-item">
      <span>{{ $t("layouts.themeDrawer.menuFoldingSwitch") }}</span>
      <el-switch v-model="isCollapse" />
    </div>
    <div class="theme-item">
      <span>{{ $t("layouts.themeDrawer.menuAccordionSwitch") }}</span>
      <el-switch v-model="accordion" />
    </div>
    <div class="theme-item">
      <span>{{ $t("layouts.themeDrawer.watermarkSwitch") }}</span>
      <el-switch v-model="watermark" />
    </div>
    <div class="theme-item">
      <span>{{ $t("layouts.themeDrawer.crumbsSwitch") }}</span>
      <el-switch v-model="breadcrumb" />
    </div>
    <div class="theme-item">
      <span>{{ $t("layouts.themeDrawer.crumbsIconSwitch") }}</span>
      <el-switch v-model="breadcrumbIcon" />
    </div>
    <div class="theme-item">
      <span>{{ $t("layouts.themeDrawer.tabSwitch") }}</span>
      <el-switch v-model="tabs" />
    </div>
    <div class="theme-item">
      <span>{{ $t("layouts.themeDrawer.tabIconSwitch") }}</span>
      <el-switch v-model="tabsIcon" />
    </div>
    <div class="theme-item">
      <span>{{ $t("layouts.themeDrawer.tabPageSwitch") }}</span>
      <el-switch v-model="footer" />
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useTheme } from "@/hooks/useTheme";
import { useGlobalStore } from "@/stores/modules/global";
import { LayoutType } from "@/stores/interface";
import { DEFAULT_PRIMARY } from "@/config";
import mittBus from "@/utils/mittBus";
import SwitchDark from "@/components/SwitchDark/index.vue";

const { changePrimary, changeGreyOrWeak, setAsideTheme, setHeaderTheme } = useTheme();

const globalStore = useGlobalStore();
const {
  layout,
  primary,
  isGrey,
  isWeak,
  asideInverted,
  headerInverted,
  isCollapse,
  accordion,
  watermark,
  breadcrumb,
  breadcrumbIcon,
  tabs,
  tabsIcon,
  footer
} = storeToRefs(globalStore);

// 预定义主题颜色
const colorList = [
  DEFAULT_PRIMARY,
  "#daa96e",
  "#0c819f",
  "#409eff",
  "#27ae60",
  "#ff5c93",
  "#e74c3c",
  "#fd726d",
  "#f39c12",
  "#9b59b6"
];

// 设置布局方式
const setLayout = (val: LayoutType) => {
  globalStore.setGlobalState("layout", val);
  setAsideTheme();
};

// 打开主题设置
const drawerVisible = ref(false);
mittBus.on("openThemeDrawer", () => (drawerVisible.value = true));
</script>

<style scoped lang="scss">
@import "./index";
</style>
