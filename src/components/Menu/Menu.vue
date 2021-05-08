<template>
  <div>
    <a-menu mode="inline" theme="dark" :inline-collapsed="collapsed" :selectedKeys="selectedKeys">
      <template v-for="item in menuTree" :key="item.path">
        <template v-if="!item.children">
          <a-menu-item :key="item.path">
            <PieChartOutlined />
            <router-link :to="{ path: item.path }">{{ item.name }}</router-link>
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
import { defineComponent, ref, computed, reactive, watch, toRefs } from "vue";
import { useRoute } from "vue-router";
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
                 <router-link :to="{path:item.path}">{{ item.name }}</router-link>
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
    const route = useRoute();
    const collapsed = ref(false);
    const menuState = reactive({
      selectedKeys: [route.path],
    });
    watch(
      () => route.path,
      (n, o) => {
        menuState.selectedKeys = [n];
        console.log(menuState.selectedKeys)
      }
    );
    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value;
    };
    const store = useStore();
    const menuTree = computed(() => store.state.permission.addRouters);

    return {
      collapsed,
      toggleCollapsed,
      menuTree,
      ...toRefs(menuState),
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
