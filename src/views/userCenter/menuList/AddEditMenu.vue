<template>
  <a-modal
    v-model:visible="visible"
    :width="600"
    ok-text="确认"
    cancel-text="取消"
    :title="type == 1 ? '新增角色' : '编辑角色'"
    @ok="submitHandle"
    @cancel="formRef.resetFields()"
  >
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item ref="name" label="菜单名称" name="name">
        <a-input placeholder="菜单名称" style="width: 220px" v-model:value="form.name" />
      </a-form-item>
      <a-form-item ref="parentId" label="父级菜单" name="parentId">
        <a-select
          style="width: 220px"
          v-model:value="form.parentId"
          placeholder="父级菜单"
          show-search
          :allowClear="true"
          :filter-option="filterOptionPartent"
        >
          <a-select-option v-for="menu in menuList" :value="menu._id" :key="menu._id">{{
            menu.name
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="路由地址" name="url">
        <a-input
          placeholder="路由地址"
          style="width: 220px"
          v-model:value.trim="form.url"
        />
      </a-form-item>
      <a-form-item label="路由重定向地址" name="redirectUrl">
        <a-input
          placeholder="路由重定向地址"
          style="width: 220px"
          v-model:value.trim="form.redirectUrl"
        />
      </a-form-item>
      <a-form-item label="排序号" name="sort">
        <a-input-number
          placeholder="排序号"
          style="width: 220px"
          :min="0"
          :max="1000"
          v-model:value.trim="form.sort"
        />
      </a-form-item>
      <a-form-item label="唯一标识" name="key">
        <a-input
          placeholder="唯一标识"
          style="width: 220px"
          v-model:value.trim="form.key"
        />
      </a-form-item>
      <a-form-item label="使用组件" name="component">
        <a-select
          placeholder="使用组件"
          style="width: 220px"
          v-model:value="form.component"
          show-search
          :filter-option="filterOption"
        >
          <a-select-option
            v-for="com in componentList"
            :value="com.component"
            :key="com.component"
          >
            {{ com.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
const rules = {
  name: [
    { required: true, message: "请输入", trigger: ["change", "blur"], type: "string" },
  ],
  url: [
    { required: true, message: "请输入", trigger: ["change", "blur"], type: "string" },
  ],
  key: [
    { required: true, message: "请输入", trigger: ["change", "blur"], type: "string" },
  ],
  component: [
    { required: true, message: "请选择", trigger: ["change", "blur"], type: "string" },
  ],
};
import { reactive, ref, toRefs } from "vue";
import { addMenuTree, getMenuList, editMenuTree } from "@/api/UserCenter";
import { message } from "ant-design-vue";
import componentList from "@/config/componentName.js";
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
    });
    const formRef = ref();
    const parametr = reactive({
      type: 1,
      visible: false,
      menuList: [],
    });

    const submitHandle = () => {
      formRef.value.validate().then(() => {
        if (parametr.type == 1) {
          addMenuTree(form).then((res) => {
            handleSuccessTip(res);
          });
          return;
        }
        editMenuTree(form).then((res) => {
          handleSuccessTip(res);
        });
      });
    };

    const showAddModal = async () => {
      parametr.visible = true;
      parametr.type = 1;
      getMenu();
    };

    const showEditModal = (obj) => {
      const { name, url, _id, component, sort, parentId, key, redirectUrl } = obj;
      Object.assign(form, {
        name,
        url,
        id: _id,
        component,
        sort,
        parentId,
        key,
        redirectUrl,
      });
      parametr.visible = true;
      parametr.type = 2;
      getMenu();
    };

    const getMenu = () => {
      getMenuList().then((res) => {
        if (res.code == 1) {
          parametr.menuList = res.data;
          //如果是编辑 则过滤 当前菜单
          parametr.menuList = parametr.menuList.filter((v) => v.id != form.id);
        }
      });
    };

    const handleSuccessTip = (res) => {
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
      return option.children[0].children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    return {
      componentList,
      form,
      rules,
      ...toRefs(parametr),
      formRef,
      submitHandle,
      showAddModal,
      showEditModal,
      filterOption,
      filterOptionPartent,
    };
  },
};
</script>

<style lang="less" scoped>
.role-menu {
  .menu-t2 {
    margin-left: 30px;
  }
}
</style>
