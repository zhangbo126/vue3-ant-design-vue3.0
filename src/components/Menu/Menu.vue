<template>
  <div>
    <a-menu
      mode="inline"
      theme="dark"
    
      v-model:selectedKeys="selectedKeys"
    >
   
  <!-- :inline-collapsed="collapsed" -->
      <template v-for="item in menuTree" :key="item.path">
        <template v-if="!item.children">
          <a-menu-item :key="item.path" v-if="!item.hide">
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
import { defineComponent } from "vue";
import { mapState } from "vuex";
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
         <component :is="$antIcons[menuInfo.icon]" /><span>{{ menuInfo.name }}</span>
        </span>
      </template>
      <template v-for="item in menuInfo.children" :key="item.path">
        <template v-if="!item.children">
          <a-menu-item :key="item.path" v-if="!item.hide">
                 <router-link :to="{path:item.path}">{{ item.name }}</router-link>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.path" />
        </template>
      </template>
    </a-sub-menu>
  `,
};
export default defineComponent({
  components: {
    "sub-menu": SubMenu,
  },
  data() {
    return {
      collapsed: true,
      selectedKeys: [this.$route.path],
    };
  },
  watch: {
    $route: function (n, o) {
      this.$nextTick(() => {
        this.selectedKeys = [n.path];
      });
    },
  },
  computed: {
    ...mapState({
      menuTree: (state) => state.permission.addRouters,
    }),
  },
});
</script>
