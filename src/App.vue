<template>
  <div id="app">
    <router-view />
   
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions, useStore } from "vuex";
import {
  onMounted,
  reactive,
  computed,
  toRefs,
  isReactive,
  readonly,
  shallowReactive,
  toRaw,
} from "vue";
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
  computed: {},
  created() {
    //  console.log(store)
  },
  methods: {},
};
</script>

<style lang="less" scoped>
// .b{
//   .c{
//     color: red;
//   }
// }
</style>
