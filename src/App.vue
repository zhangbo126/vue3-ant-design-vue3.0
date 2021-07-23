<template>
 <a-config-provider :locale="locale">
  <div id="app">
    <router-view />
  </div>
    </a-config-provider>
</template>


<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { useStore } from "vuex";
import { reactive, computed, toRefs } from "vue";
import publicInfo from "@/config/publicConfig";
export default {
  setup() {
    const store = useStore();
    const state = reactive({
      name: computed(() => {
        return store.state.name;
      }),
      roles: computed(() => {
        return store.state.permission.routers;
      }),
    });

    return {
      ...toRefs(state),
      state,
      locale:zhCN,
    };
  },

  provide: {
    publicInfo,
  },
};
</script>

<style lang="less" scoped></style>
