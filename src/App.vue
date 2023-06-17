<template>
  <a-config-provider :locale="zhCN" componentSize="small">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script setup>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { useStore } from "vuex";
import { reactive, computed, toRefs, provide, getCurrentInstance } from "vue";
import publicInfo from "@/config/publicConfig";
const { $bus } = getCurrentInstance().proxy;
$bus.on('receive',(msg)=>{
       console.log(msg)
})
const store = useStore();
const state = reactive({
  name: computed(() => {
    return store.state.name;
  }),
  roles: computed(() => {
    return store.state.permission.routers;
  }),
});
//全局方法deom
provide("publicInfo", publicInfo);
</script>

<style lang="less" scoped></style>
