<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
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
    };
  },

  provide: {
    publicInfo,
  },
};
</script>

<style lang="less" scoped></style>
