<template>
    <a-menu mode="inline" theme="dark" :forceSubMenuRender="true" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys">
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
</template>

<script setup>
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
}
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import {computed,toRaw,reactive,ref,watch} from 'vue'
const store = useStore()
const route = useRoute()
//当前选中项
const selectedKeys =ref([route.name])
//当前展开项
const openKeys =ref([route.meta.partentName || ""])
const collapsed = ref(true)
const  menuTrees = computed(()=>store.state.permission.addRouters)
watch(route,(n,o)=>{
   selectedKeys.value = [n.name]
})
 

</script>
