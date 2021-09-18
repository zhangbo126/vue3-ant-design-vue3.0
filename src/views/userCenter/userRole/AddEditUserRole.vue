<template>
  <a-modal
    v-model:visible="visible"
    :width="700"
    ok-text="确认"
    cancel-text="取消"
    :title="type == 1 ? '新增角色' : '编辑角色'"
    @ok="submitHandle"
    @cancel="cancel"
  >
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item ref="name" label="角色名称" name="name">
        <a-input v-model:value.trim="form.name" />
      </a-form-item>

      <a-form-item label="角色描述" name="describe">
        <a-textarea v-model:value.trim="form.describe" />
      </a-form-item>

      <a-form-item label="角色权限" name="menuList">
        <ul class="role-menu">
          <li v-for="t1Menu in menuList" :key="t1Menu._id">
            <a-checkbox
              v-model:checked="t1Menu.isChecked"
              :indeterminate="t1Menu.indeterminate"
              @change="(e) => onChangeT1(e, t1Menu)"
              >{{ t1Menu.name }}</a-checkbox
            >
            <div class="menu-t2" v-for="t2Menu in t1Menu.children" :key="t2Menu._id">
              <a-checkbox
                v-model:checked="t2Menu.isChecked"
                @change="(e) => onChangeT2(e, t2Menu, t1Menu)"
                :indeterminate="t2Menu.indeterminate"
                >{{ t2Menu.name }}</a-checkbox
              >
              <div class="menu-t3" v-for="t3Menu in t2Menu.children" :key="t3Menu._id">
                <a-checkbox
                  v-model:checked="t3Menu.isChecked"
                  @change="() => onChangeT3(t1Menu, t2Menu)"
                  >{{ t3Menu.name }}</a-checkbox
                >
              </div>
            </div>
          </li>
        </ul>
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
      type: "string",
    },
  ],
  describe: [
    {
      required: true,
      message: "请输入",
      trigger: "blur",
      type: "string",
    },
  ],
};
import { reactive, ref, toRefs } from "vue";
import { getAddMenuList, addRole, getEditMenuList, eidtRole } from "@/api/UserCenter";
import { message } from "ant-design-vue";
export default {
  setup(props, context) {
    const form = reactive({
      name: null,
      describe: null,
      id: null,
      roleMenu_List: [],
    });
    const parametr = reactive({
      type: 1,
      visible: false,
      formRef: ref(),
      menuList: [],
    });

    const submitHandle = () => {
      parametr.formRef.validate().then(() => {
        setCheckId(parametr.menuList, form.roleMenu_List);
        //新增提交
        if (parametr.type == 1) {
          addRole(form).then((res) => {
            handleSuccessTip(res);
          });
          return;
        }
        //编辑提交
        eidtRole(form).then((res) => {
          handleSuccessTip(res);
        });
      });
    };
    const showAddModal = async (e) => {
      parametr.type = 1;
      resultForm();
      getMenuList();
    };
    const showEditModal = (obj) => {
      parametr.type = 2;
      resultForm();
      const { name, describe, _id } = obj;
      Object.assign(form, {
        name,
        describe,
        id: _id,
      });
      getMenuListEdit();
    };
    //新增获取菜单
    const getMenuList = () => {
      getAddMenuList().then((res) => {
        parametr.menuList = res.data;
        setMenuChange(parametr.menuList);
      });
    };
    //编辑获取菜单
    const getMenuListEdit = () => {
      getEditMenuList(form.id).then((res) => {
        parametr.menuList = res.data;
        setMenuChange(parametr.menuList);
      });
    };
    const setMenuChange = (menuList) => {
      menuList.forEach((v) => {
        v.isChecked = false;
        v.indeterminate = false;
        if (v.isChange == 1) {
          v.isChecked = true;
        }
        if (v.children.length > 0) {
          setMenuChange(v.children, v.isChecked);
        }
      });
    };

    const handleSuccessTip = (res) => {
      if (res.code == 1) {
        message.success("操作成功");
        context.emit("refresh");
        parametr.visible = false;
      }
    };

    //递归处理已勾选的菜单ID
    const setCheckId = (roleMenu_List, menuIdList) => {
      roleMenu_List.forEach((v) => {
        if (v.isChecked || v.indeterminate) {
          menuIdList.push(v._id);
        }
        if (v.children.length > 0) {
          setCheckId(v.children, menuIdList);
        }
      });
    };

    //递归调用选中
    const checkHandle = (list, checked) => {
      list.forEach((v) => {
        v.isChecked = checked;
        if (v.children.length > 0) {
          checkHandle(v.children, checked);
        }
      });
    };
    //一级菜单选择
    const onChangeT1 = (e, t1Menu) => {
      checkHandle(t1Menu.children, e.target.checked);
      t1Menu.indeterminate=false
    };
    //二级菜单选择
    const onChangeT2 = (e, t2Menu, t1Menu) => {
      checkHandle(t2Menu.children, e.target.checked);
      t2Menu.indeterminate = false;
      t1Menu.isChecked = t1Menu.children.every((v) => v.isChecked);
      /*一级菜单选中*/
      const t1Len = t1Menu.children.filter((v) => v.isChecked).length;
      t1Menu.indeterminate = t1Len != t1Menu.children.length && t1Len != 0;
    };
    //三级菜单选择
    const onChangeT3 = (t1Menu, t2Menu) => {
      /*二级菜单选中判断*/
      const t2Len = t2Menu.children.filter((v) => v.isChecked).length;
      t2Menu.indeterminate = t2Len != 0 && t2Len != t2Menu.children.length;
      t2Menu.isChecked = t2Len == t2Menu.children.length;

      /*一级级菜单选中判断*/
      t1Menu.isChecked = t1Menu.children.every((v) => v.isChecked);
      const t1Lenminate = t1Menu.children.some((v) => v.indeterminate);
      const t1Lenchecked = t1Menu.children.every((v) => v.isChecked);
      t1Menu.indeterminate = t1Lenminate || !t1Lenchecked;
    };

    //重置表单
    const resultForm = () => {
      parametr.visible = true;
      parametr.menuList = [];
      Object.assign(form, {
        name: null,
        describe: null,
        id: null,
        roleMenu_List: [],
      });
    };
    const cancel = () => {
      parametr.formRef.resetFields();
    };
    return {
      form,
      rules,
      ...toRefs(parametr),
      submitHandle,
      showAddModal,
      showEditModal,
      getMenuList,
      onChangeT1,
      onChangeT2,
      onChangeT3,
      cancel,
    };
  },
};
</script>

<style lang="less" scoped>
.role-menu {
  .menu-t2 {
    margin-left: 30px;
    .menu-t3 {
      margin-left: 30px;
    }
  }
}
</style>
