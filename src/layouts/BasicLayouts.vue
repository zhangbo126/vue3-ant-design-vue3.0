<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      id="components-layout-demo-side"
    >
      <template #trigger>
        <MenuFoldOutlined v-show="collapsed" />
        <MenuUnfoldOutlined  v-show="!collapsed" />
      </template>
      <div class="logo">
        <img src="https://store.antdv.com/pro/preview/img/logo.59818776.png" />
        <span>AntDesignVue2.0</span>
      </div>
      <s-menu></s-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" class="layout-header">
        <div class="trigger">
          <MenuFoldOutlined
            v-if="collapsed"
            @click="collapsed = !collapsed"
            :style="{ fontSize: '20px', cursor: 'pointer' }"
          />
          <MenuUnfoldOutlined
            @click="collapsed = !collapsed"
            :style="{ fontSize: '20px', cursor: 'pointer' }"
            v-else
          />
        </div>
      </a-layout-header>
      <a-layout-content :style="{backgroundColor:'#fff'}">
        <s-tab></s-tab>
        <div :style="{ background: '#fff', minHeight: '360px' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        VUE3.0 + Ant-Design-Vue 2.0
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>

import {  ref } from "vue";
import SMenu from "@/components/Menu/Menu";
import STab from "@/components/MultiTab/MultiTab";
export default {
  components: {
    SMenu,
    STab,
  },
  data() {
    return {
      collapsed: ref(false),
    };
  },
};
</script>
<style scoped lang="less">
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
.layout-header {
      border-bottom: 1px solid #f0f0f0;
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
