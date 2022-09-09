<template>
  <a-modal v-model:visible="visible" :width="690" ok-text="确认" cancel-text="取消" :title="type == 1 ? '新增菜单' : '编辑菜单'" @ok="submitHandle" @cancel="cancel">
    <a-form ref="formRef" :model="form" :rules="rules" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
      <a-form-item ref="name" label="菜单名称" name="name">
        <a-input size="small" placeholder="菜单名称" style="width: 220px" v-model:value.trim="form.name" />
      </a-form-item>
      <a-form-item ref="menuType" label="菜单类型" name="menuType">
        <a-radio-group name="radioGroup" v-model:value="form.menuType">
          <a-radio :value="1">菜单</a-radio>
          <a-radio :value="2">按钮</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item ref="parentId" label="父级菜单" name="parentId">
        <a-select size="small" style="width: 220px" v-model:value="form.parentId" placeholder="父级菜单" show-search :allowClear="true" :filter-option="filterOptionPartent">
          <a-select-option v-for="menu in menuList" :value="menu._id" :key="menu._id">{{ menu.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="路由地址" name="url" v-if="[1].includes(form.menuType)">
        <a-input size="small" placeholder="路由地址" style="width: 220px" v-model:value.trim="form.url" />
      </a-form-item>
      <a-form-item label="路由重定向地址" name="redirectUrl" v-if="[1].includes(form.menuType)">
        <a-input placeholder="路由重定向地址" style="width: 220px" v-model:value.trim="form.redirectUrl" />
      </a-form-item>
      <a-form-item label="排序号" name="sort">
        <a-input-number placeholder="排序号" style="width: 220px" :min="0" :max="1000" v-model:value="form.sort" />
      </a-form-item>
      <a-form-item label="唯一标识" name="key">
        <a-input placeholder="唯一标识" style="width: 220px" v-model:value.trim="form.key" />( 建议英文+下滑线组合)
      </a-form-item>
      <a-form-item label="使用组件" name="component" v-if="[1].includes(form.menuType)">
        <a-select placeholder="使用组件" style="width: 220px" v-model:value="form.component" show-search :filter-option="filterOption">
          <a-select-option v-for="com in componentList" :value="com.component" :key="com.component">{{ com.component }}({{ com.name }})</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="图标" v-if="form.menuType!=2">
        <a-select placeholder="图标" style="width: 220px" v-model:value="form.icon" show-search :filter-option="filterOption" :allowClear="true">
          <a-select-option v-for="icon in IconList" :value="icon" :key="icon">
            <span>{{ icon }}</span>
            <span>
              <component :is="$antIcons[icon]" />
            </span>
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
const rules = {
  name: [
    {
      required: true,
      message: "请输入",
      trigger: ["change", "blur"],
      type: "string"
    }
  ],
  url: [
    {
      required: true,
      message: "请输入",
      trigger: ["change", "blur"],
      type: "string"
    }
  ],
  key: [
    {
      required: true,
      message: "请输入",
      trigger: ["change", "blur"],
      type: "string"
    }
  ],
  component: [
    {
      required: true,
      message: "请选择",
      trigger: ["change", "blur"],
      type: "string"
    }
  ],
  menuType: [
    {
      required: true,
      message: "请选择",
      trigger: ["change", "blur"],
      type: "number"
    }
  ]
};
import { reactive, ref, toRefs } from "vue";
import { addMenuTree, getMenuList, editMenuTree } from "@/api/UserCenter";
import { message } from "ant-design-vue";
import { componentList, IconList } from "@/config/asyncRouter.js";
export default {
  setup(props, context) {
    const form = reactive({
      name: null,
      url: null,
      redirectUrl: null,
      key: null,
      component: null,
      sort: null,
      parentId: null,
      id: null,
      status: null,
      menuType: 1,
      icon: null
    });
    const formRef = ref();
    const parametr = reactive({
      type: 1,
      visible: false,
      menuList: []
    });

    const submitHandle = async () => {
      try {
        let valid = await formRef.value.validateFields();
        if (valid) {
          //新增
          if (parametr.type == 1) {
            addMenuTree(form).then(res => {
              handleSuccessTip(res);
            });
            return;
          }
          //编辑
          editMenuTree(form).then(res => {
            handleSuccessTip(res);
          });
        }
      } catch {}
    };

    const showAddModal = async () => {
      resultForm();
      parametr.type = 1;
      getMenu();
    };

    const showEditModal = obj => {
      parametr.visible = true;
      parametr.type = 2;
      const {
        name,
        url,
        _id,
        component,
        sort,
        parentId,
        key,
        redirectUrl,
        icon,
        menuType
      } = obj;
      Object.assign(form, {
        name,
        url,
        id: _id,
        component,
        sort,
        parentId,
        key,
        redirectUrl,
        status,
        icon,
        menuType
      });

      getMenu();
    };

    const getMenu = () => {
      getMenuList().then(res => {
        if (res.code == 1) {
          parametr.menuList = res.data;
          if (parametr.type == 1) {
            parametr.menuList = parametr.menuList;
            return;
          }
          //如果是编辑 则过滤 当前菜单
          parametr.menuList = parametr.menuList.filter(v => v.id != form.id);
        }
      });
    };

    const handleSuccessTip = res => {
      if (res.code == 1) {
        formRef.value.resetFields();
        message.success("操作成功");
        context.emit("refresh");
        parametr.visible = false;
      }
    };

    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const filterOptionPartent = (input, option) => {
      return (
        option.children[0].children
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    };

    const resultForm = () => {
      parametr.visible = true;
      // Object.assign(form, {
      //   name: null,
      //   url: null,
      //   redirectUrl: null,
      //   key: null,
      //   component: null,
      //   sort: null,
      //   parentId: null,
      //   id: null,
      //   status: null,
      //   icon: null,
      //   menuType:1
      // });
    };
    const cancel = () => {
      formRef.value.resetFields();
    };
    return {
      componentList,
      IconList,
      form,
      rules,
      ...toRefs(parametr),
      formRef,
      submitHandle,
      showAddModal,
      showEditModal,
      filterOption,
      filterOptionPartent,
      cancel
    };
  }
};
</script>

<style lang="less" scoped>
.role-menu {
  .menu-t2 {
    margin-left: 30px;
  }
}
</style>
