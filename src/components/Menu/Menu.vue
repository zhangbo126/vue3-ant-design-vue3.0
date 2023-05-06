<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import {
  computed,
  ref,
  watch,
  h,
  resolveComponent,
  defineComponent,
  getCurrentInstance,
} from "vue";
export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    //当前选中项
    const selectedKeys = ref([route.name]);
    //当前展开项
    const openKeys = ref([route.meta.partentName || ""]);
    const menuTrees = computed(() => store.state.permission.addRouters);
    watch(route, (n, o) => {
      selectedKeys.value = [n.name];
    });

    // 生成 subMenu 菜单
    const renderSubMenu = (menu) => {
      const menuItem = [];
      menu.children.forEach((item) => menuItem.push(renderMenu(item)));
      const slot = {
        title: () => <span> {menu.meta.title}</span>,
        icon: () => <span>{menu.meta.icon ? h(resolveComponent(menu.meta.icon)) : ''} </span>
      };
      return (
        <a-sub-menu key={menu.name} v-slots={slot}>
          {menuItem}
        </a-sub-menu>
      );
    };
    // 生成  menu-item 菜单
    const renderMenuItem = (menu) => {
      const slot = {
        icon: () => <span>{menu.meta.icon ? h(resolveComponent(menu.meta.icon)) : ''} </span>
      }
      return (
        <a-menu-item key={menu.name} v-slots={slot}>
          <router-link to={menu.path}>{menu.meta.title}</router-link>
        </a-menu-item>
      );
    };

    const renderMenu = (menu) => {
      return menu.children ? renderSubMenu(menu) : renderMenuItem(menu);
    };

    const menuList = menuTrees.value.map((menu) => {
      return renderMenu(menu);
    });
    return () => (
      <a-menu
        mode="inline"
        theme="dark"
        forceSubMenuRender={true}
        v-model:selectedKeys={selectedKeys.value}
        v-model:openKeys={openKeys.value}
      >
        {menuList}
      </a-menu>
    );
  },
});
</script>
