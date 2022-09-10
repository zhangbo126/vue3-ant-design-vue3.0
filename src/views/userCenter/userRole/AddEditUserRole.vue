<template>
  <a-modal v-model:visible="visible" :width="700" ok-text="确认" cancel-text="取消" :title="type == 1 ? '新增角色' : '编辑角色'" @ok="submitHandle" @cancel="cancel">
    <a-form ref="formRef" :model="form" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
      <a-form-item ref="name" label="角色名称" name="name">
        <a-input v-model:value.trim="form.name" />
      </a-form-item>
      <a-form-item label="角色描述" name="describe">
        <a-textarea v-model:value.trim="form.describe" />
      </a-form-item>
      <a-form-item label="角色权限">
        <a-tree ref="treeRef"  checkable v-if="menuList.length"  v-model:checkedKeys="form.roleMenu_List" defaultExpandAll :tree-data="menuList" :field-names="{title:'name',key:'_id'}">
          <template #title="{ name }">
            <span>{{ name }}</span>
          </template>
        </a-tree>
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
      trigger: "blur",
      type: "string"
    }
  ],
  describe: [
    {
      required: true,
      message: "请输入",
      trigger: "blur",
      type: "string"
    }
  ]
};
import { reactive, ref, toRefs } from "vue";
import {
  getAddMenuList,
  addRole,
  getEditMenuList,
  eidtRole
} from "@/api/UserCenter";
import { message } from "ant-design-vue";
export default {
  setup(props, context) {
    const form = reactive({
      name: null,
      describe: null,
      id: null,
      roleMenu_List: []
    });
    const pageData = reactive({
      type: 1,
      visible: false,
      formRef: ref(),
      menuList: []
    });

    const submitHandle = () => {
      pageData.formRef.validate().then(() => {
        //新增提交
        if (pageData.type == 1) {
          addRole(form).then(res => {
            handleSuccessTip(res);
          });
          return;
        }
        //编辑提交
        eidtRole(form).then(res => {
          handleSuccessTip(res);
        });
      });
    };
    const showAddModal = async e => {
       pageData.type = 1;
       resultForm();
       //获取菜单列表
       const {data} = await getAddMenuList()
       pageData.menuList = data;
    };
    const showEditModal = async obj => {
      pageData.type = 2;
      resultForm();
      const { name, describe, _id } = obj;
      Object.assign(form, {
        name,
        describe,
        id: _id
      });
      //获取菜单列表
       const {data} = await getEditMenuList(form.id)
       pageData.menuList=data.menuList
       form.roleMenu_List=data.selectMenuIdList
    };

    const handleSuccessTip = res => {
      if (res.code == 1) {
        message.success("操作成功");
        context.emit("refresh");
        pageData.visible = false;
      }
    };

    //重置表单
    const resultForm = () => {
      pageData.visible = true;
      pageData.menuList = [];
      Object.assign(form, {
        name: null,
        describe: null,
        id: null,
        roleMenu_List: []
      });
    };
    const cancel = () => {
      pageData.formRef.resetFields();
    };
    return {
      form,
      rules,
      ...toRefs(pageData),
      submitHandle,
      showAddModal,
      showEditModal,
      cancel
    };
  }
};
</script>

<style lang="less" scoped>

</style>
