<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible id="components-layout-demo-side">
      <template #trigger>
        <MenuFoldOutlined v-show="collapsed" />
        <MenuUnfoldOutlined v-show="!collapsed" />
      </template>
      <div class="logo">
        <img src="https://store.antdv.com/pro/preview/img/logo.59818776.png" />
        <span>一韵茶叶管理系统</span>
      </div>
      <s-menu></s-menu>
    </a-layout-sider>
    <a-layout class="layout-content">
      <a-layout-header :style="{ width:` calc(100% - ${collapsed ? '80px' : '200px'})` }" class="layout-header">
        <div class="trigger">
          <MenuFoldOutlined v-if="collapsed" @click="collapsed = !collapsed" :style="{ fontSize: '20px', cursor: 'pointer' }" />
          <MenuUnfoldOutlined @click="collapsed = !collapsed" :style="{ fontSize: '20px', cursor: 'pointer' }" v-else />
        </div>
        <div class="user-menu">
          <user-menus></user-menus>
        </div>
      </a-layout-header>
      <div :style="{ height: '64px' }"></div>
      <a-layout-content :style="{ backgroundColor: '#fff', paddingLeft: collapsed ? '80px' : '200px' }">
        <s-tab></s-tab>
        <div :style="{ background: '#fff', minHeight: '360px' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center; padding-left: 210px">VUE3.0 + Ant-Design-Vue 2.0</a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import { ref } from "vue";
import SMenu from "@/components/Menu/Menu";
import STab from "@/components/MultiTab/MultiTab";
import UserMenus from "../tools/UserMenus.vue";
export default {
  components: {
    SMenu,
    STab,
    UserMenus
  },
  setup() {
    const collapsed = ref(false);
    return {
      collapsed
    };
  }
};
</script>
<style scoped lang="less">
#components-layout-demo-side {
  position: fixed;
  z-index: 1000;
  min-height: 100vh;
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
.layout-content {
  display: flex;
  flex-direction: column;
}

.layout-header {
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 1000;
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

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
