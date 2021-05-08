<!--<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :theme="theme"
  >
    <template v-for="menu in menuTree" :key="menu.path">
      <a-sub-menu :key="menu.path" :title="menu.name" v-if="menu.children">
        <a-menu-item :key="m.path" v-for="m in menu.children"
          ><router-link :to="m.path">{{ m.name }}</router-link></a-menu-item
        >
      </a-sub-menu>
      <a-menu-item :key="menu.path" v-else>
        <router-link :to="menu.path">{{ menu.name }}</router-link>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script>
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, reactive, toRefs, computed } from "vue";
import { useStore, mapState } from "vuex";
export default {
  setup() {
    const state = reactive({
      theme: "dark",
      selectedKeys: ["1"],
      openKeys: ["sub1"],
    });
    const store = useStore();
    const menuTree = computed(() => store.state.permission.addRouters);

    return { ...toRefs(state), menuTree };
  },

  components: {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="less"></style>
-->

<template>
  <div>
    <a-menu mode="inline" theme="dark" :inline-collapsed="collapsed">
      <template v-for="item in menuTree" :key="item.path">
        <template v-if="!item.children">
          <a-menu-item :key="item.path">
            <PieChartOutlined />
            <span>{{ item.name }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.path" />
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
} from "@ant-design/icons-vue"; // you can rewrite it to a single file component, if not, you should config vue alias to vue/dist/vue.esm-bundler.js
import { useStore } from "vuex";
const SubMenu = {
  name: "SubMenu",
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  template: `
    <a-sub-menu :key="menuInfo.path" v-bind="$attrs">
      <template #title>
        <span>
          <MailOutlined /><span>{{ menuInfo.name }}</span>
        </span>
      </template>
      <template v-for="item in menuInfo.children" :key="item.path">
        <template v-if="!item.children">
          <a-menu-item :key="item.path">
            <PieChartOutlined />
            <span>{{ item.name }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.path" />
        </template>
      </template>
    </a-sub-menu>
  `,
  components: {
    PieChartOutlined,
    MailOutlined,
  },
};

export default defineComponent({
  setup() {
    const collapsed = ref(false);

    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value;
    };
    const store = useStore();
    const menuTree = computed(() => store.state.permission.addRouters);

    return {
      collapsed,
      toggleCollapsed,
      menuTree,
    };
  },

  components: {
    "sub-menu": SubMenu,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
  },
});
</script>
