<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive, computed, toRefs } from "vue";
import publicInfo from '@/config/publicConfig'
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
      txt: "篮网总冠军",
      arr: [
        {
          name: "内容1",
          content: 2,
        },
        {
          name: "内容1",
          content: 2,
        },
      ],
    });

    return {
      ...toRefs(state),
      state,
    };
  },
  data() {
    return {};
  },
  provide: {
    publicInfo,
  
  },
};
</script>

<style lang="less" scoped></style>
