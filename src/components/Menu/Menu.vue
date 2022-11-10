<template>
  <div>
    <a-menu mode="inline" theme="dark" :forceSubMenuRender="true" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys">
      <!-- :inline-collapsed="collapsed" -->
      <template v-for="item in menuTrees" :key="item.name">
        <template v-if="!item.children">
          <a-menu-item :key="item.name" v-if="!item.hide">
            <router-link :to="{ path: item.path || '/' }">{{ item.meta.title }}</router-link>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.name" />
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
      default: () => ({})
    }
  },
  template: `
    <a-sub-menu :key="menuInfo.name" v-bind="$attrs">
      <template #title>
        <span>
          <component :is="$antIcons[menuInfo.meta.icon]" /> <span>{{ menuInfo.meta.title }}</span>
        </span>
      </template>
      <template v-for="item in menuInfo.children" :key="item.name">
        <template v-if="!item.children">
          <a-menu-item :key="item.name" v-if="!item.hide">
            <span :style="{marginRight:'10px'}"><component :is="$antIcons[item.meta.icon]" /></span>
            <router-link :to="{path:item.path}">{{ item.meta.title }}</router-link>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.name" />
        </template>
      </template>
    </a-sub-menu>
  `
};
export default defineComponent({
  components: {
    "sub-menu": SubMenu
  },
  // data() {
  //   return {
  //     collapsed: true,
  //     selectedKeys: [this.$route.name]
  //   };
  // },
  watch: {
    // $route: function(n, o) {
    //   this.$nextTick(() => {
    //     this.selectedKeys = [n.name];
    //   });
    // }
  },
  // computed: {
  //   ...mapState({
  //     menuTree: state => state.permission.addRouters
  //   })
  // }
});
</script>

<script setup>

import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import {computed,toRaw,reactive,ref} from 'vue'
const store = useStore()
const route = useRoute()
const selectedKeys =[route.name]
const openKeys =['P_User_Cente']
const collapsed = ref(true)
const  menuTrees = computed(()=>store.state.permission.addRouters)
console.log(menuTrees.value)
 
 

</script>
