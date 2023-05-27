<template>
  <a-tabs
    v-if="pageInfo.multTab.length"
    v-model:activeKey="pageInfo.activeKey"
    type="editable-card"
    hide-add
    @edit="onClone"
    @change="onChangeTab"
  >
    <a-tab-pane
      v-for="tab in pageInfo.multTab"
      :closable="pageInfo.multTab.length != 1"
      :key="tab.path"
      :tab="tab.title"
    ></a-tab-pane>
  </a-tabs>
</template>

<script setup>
import { watch, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
const emit = defineEmits(["update:length"]);

const pageInfo = reactive({
  activeKey: null,
  multTab: [],
  fullPath: [],
});
//路由参数信息
const route = useRoute();
//路由
const router = useRouter();
//关闭tab
const onClone = (e) => {
  pageInfo.multTab = pageInfo.multTab.filter((tab) => tab.path !== e);
  pageInfo.fullPath = pageInfo.fullPath.filter((path) => path !== e);
  //如果关闭的标签是当前页面 重新选择另外一个路由
  if (e == pageInfo.activeKey) {
    pageInfo.activeKey = pageInfo.multTab[pageInfo.multTab.length - 1].path;
    router.push(pageInfo.activeKey);
  }
};

//选中tab
const onChangeTab = () => {
  router.push(pageInfo.activeKey);
};

//监听路由变化
watch(route, (n, o) => {
  pageInfo.activeKey = n.path;
  const {
    path,
    meta: { title, hideTabs },
  } = n;
  //判断是否有重复的路由
  if (!pageInfo.fullPath.includes(n.path)) {
    const tab = { title, path };
    pageInfo.fullPath.push(n.path);
    if (!hideTabs) {
      pageInfo.multTab.push(tab);
    }
  }
  emit("update:length", pageInfo.multTab.length);
});
</script>

<style scoped lang="less">
:deep(.ant-tabs-bar) {
  margin: 0;
}
:deep(.ant-tabs-card) {
  background-color: #fff;
}
:deep(.ant-tabs-nav) {
  margin: 0 !important;
}
</style>
