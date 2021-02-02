<template>
  <a-layout-sider
    :class="['sider', 'shadow', 'ant-fixed-sidemenu']"
    width="208px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null"
  >
    <div class="scroll" style="flex: 1 1 0%; overflow: hidden auto;height:100%">
      <s-menu
        class="s-menu"
        :collapsed="collapsed"
        :menu="menus"
        :theme="theme"
        :mode="mode"
        :inlineCollapsed="false"
        @select="onSelect"
        style="padding: 16px 0px"
      ></s-menu>
    </div>
  </a-layout-sider>
</template>

<script>
import SMenu from "./index";

export default {
  name: "SideMenu",
  components: { SMenu },

  props: {
    mode: {
      type: String,
      required: false,
      default: "inline",
    },
    theme: {
      type: String,
      required: false,
      default: "dark",
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false,
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false,
    },
    menus: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onSelect(obj) {
      this.$emit("menuSelect", obj);
    },
  },
};
</script>

<style lang="less" scoped>
.scroll::-webkit-scrollbar-thumb {
  background: hsla(0, 0%, 100%, 0.2);
  border-radius: 3px;
}
.scroll::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.scroll::-webkit-scrollbar-track {
  background: hsla(0, 0%, 100%, 0.15);
  border-radius: 3px;
}
</style>
