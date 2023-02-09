<template>
  <a-layout class="app-layout">
    <a-layout-sider v-model:collapsed="collapsed" collapsible id="components-layout-demo-side">
      <template #trigger>
        <MenuFoldOutlined v-show="collapsed" />
        <MenuUnfoldOutlined v-show="!collapsed" />
      </template>
      <div class="logo">
        <img src="https://store.antdv.com/pro/preview/img/logo.59818776.png" />
        <span>一韵茶叶管理系统</span>
      </div>
      <z-menu></z-menu>
    </a-layout-sider>
    <div class="sider-hidden" :style="{width:!collapsed?'200px':'80px'}"></div>
    <a-layout class="layout-content">
      <a-layout-header class="layout-header">
        <div class="trigger">
          <MenuFoldOutlined v-if="collapsed" @click="collapsed = !collapsed" :style="{ fontSize: '20px', cursor: 'pointer' }" />
          <MenuUnfoldOutlined @click="collapsed = !collapsed" :style="{ fontSize: '20px', cursor: 'pointer' }" v-else />
        </div>
        <div class="user-menu">
          <user-menus></user-menus>
        </div>
      </a-layout-header>
      <a-layout-content>
        <z-tab></z-tab>
        <div class="app-content">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import ZMenu from "@/components/Menu/Menu";
import ZTab from "@/components/MultiTab/MultiTab";
import UserMenus from "@/components/UserMenus/UserMenus.vue";
const collapsed = ref(false);
const route = useRoute();
const roterKey = computed(() => {
  return route.path;
});
</script>
<style scoped lang="less">
#components-layout-demo-side {
  overflow: hidden;
  flex: 0 0 208px;
  max-width: 208px;
  min-width: 208px;
  width: 208px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100%;
}
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  img {
    height: 32px;
  }
  span {
    color: #fff;
  }
}
.app-layout {
  display: flex;
  min-height: 100vh;
}
.sider-hidden {
  flex-shrink: 0;
  overflow: hidden;
}
.layout-content {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.layout-header {
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 0;
  right: 0;
  .trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 16px;
    width: 40px;
    height: 100%;
  }
}

.a-layout-content {
  background-color: #fff;
}
.app-content {
  background-color: #fff;
  height: calc(100vh - 100px);
  overflow: scroll;
  padding-left: 10px;
}
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
