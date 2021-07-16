<template>
  <a-tabs
    v-if="multTab.length"
    v-model:activeKey="activeKey"
    type="editable-card"
    hide-add
    @edit="onClone"
    @change="onChangeTab"
  >
    <a-tab-pane
      v-for="tab in multTab"
      :closable="multTab.length != 1"
      :key="tab.path"
      :tab="tab.title"
    ></a-tab-pane>
  </a-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeKey: null,
      multTab: [],
      fullPath: [],
    };
  },
  watch: {
    // 监听当前路由变化动态设置 tab 标签
    $route: function (n, o) {
      this.activeKey = n.path;
      if (!this.fullPath.includes(n.path)) {
        const tab = {
          title: n.meta.title,
          path: n.path,
        };
        this.fullPath.push(n.path);
        this.multTab.push(tab);
      }
    },
  },
  methods: {
    onClone(e) {
      this.multTab = this.multTab.filter((tab) => tab.path !== e);
      this.fullPath = this.fullPath.filter((path) => path !== e);
      //如果关闭的标签是当前页面 重新选择另外一个路由
      if (e == this.activeKey) {
        this.activeKey = this.multTab[this.multTab.length - 1].path;
        this.$router.push(this.activeKey);
      }
    },
    onChangeTab(e) {
      this.$router.push(e);
    },
  },
};
</script>

<style scoped lang="less">
:deep(.ant-tabs-bar) {
  margin: 0;
}
:deep(.ant-tabs-card) {
  background-color: #fff;
}
</style>
