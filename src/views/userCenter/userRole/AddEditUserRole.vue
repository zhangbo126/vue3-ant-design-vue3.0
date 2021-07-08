<template>
  <a-modal
    v-model:visible="visible"
    :width="700"
    ok-text="确认"
    cancel-text="取消"
    :title="type == 1 ? '新增角色' : '编辑角色'"
    @ok="submitHandle"
  >
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item ref="name" label="角色名称" name="name">
        <a-input v-model:value="form.name" />
      </a-form-item>

      <a-form-item label="角色描述" name="desc">
        <a-textarea v-model:value="form.desc" />
      </a-form-item>

      <a-form-item label="角色权限">
        <ul class="role-menu">
          <li v-for="menu in menuList" :key="menu._id">
            <a-checkbox v-model:checked="menu.isChecked">{{ menu.name }}</a-checkbox>
            <div class="menu-t2" v-for="m in menu.children" :key="m._id">
              <a-checkbox v-model:checked="m.isChecked">{{ m.name }}</a-checkbox>
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
  desc: [
    {
      required: true,
      message: "请输入",
      trigger: "blur",
      type: "string",
    },
  ],
};
import { reactive, ref, toRefs, watch, computed } from "vue";
import { getAddMenuList } from "@/api/UserCenter";

export default {
  setup(props, context) {
    const form = reactive({
      name: null,
      desc: null,
      roleMenuList: [],
    });
    const parametr = reactive({
      type: 1,
      visible: false,
      formRef: ref(),
      menuList: [],
    });

    const submitHandle = () => {
      parametr.formRef.validate().then(() => {
        console.log(form.menuList);
      });
    };
    const showAddModal = (e) => {
      parametr.visible = true;
      getMenuList();
    };
    const getMenuList = () => {
      getAddMenuList().then((res) => {
        parametr.menuList = res.data;
        setMenuChange(parametr.menuList);
      });
    };
    const setMenuChange = (menuList) => {
      menuList.forEach((v) => {
        v.isChecked = false;
        if (v.children.length > 0) {
          setMenuChange(v.children);
        }
      });
    };

    return {
      form,
      rules,
      rules,
      ...toRefs(parametr),
      submitHandle,
      showAddModal,
      getMenuList,
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
