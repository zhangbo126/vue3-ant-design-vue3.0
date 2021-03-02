<template>
  <div id="nav">
    <router-view />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      name: (state) => state.name,
    }),
    ...mapGetters(["mapName"]),
  },
  created() {
    this.MOUDLE_DEMO('哈哈哈哈1');
  },
  methods: {
    ...mapMutations(["NAME_DEMO",'MOUDLE_DEMO']),
    ...mapActions(["spackName", "moudlesDemp"]),
  },
};
</script>

<style lang="less" scoped>
  // .b{
  //   .c{
  //     color: red;
  //   }
  // }
</style>
