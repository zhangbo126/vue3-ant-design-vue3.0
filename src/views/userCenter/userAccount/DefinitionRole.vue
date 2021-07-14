<template>
  <a-modal
    v-model:visible="visible"
    :width="600"
    ok-text="确认"
    cancel-text="取消"
    title="定义角色"
    @ok="submitHandle"
  >
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item ref="userAccount" label="账户名称">
        {{ form.userAccount }}
      </a-form-item>

      <a-form-item label="用户角色" name="userRole">
        <a-checkbox-group v-model:value="form.userRole">
          <a-checkbox v-for="role in roleList" :key="role._id" :value="role._id">
            {{ role.name }}
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
const rules = {
  userRole: [
    { required: true, message: "请选择", trigger: ["change", "blur"], type: "array" },
  ],
};
import { reactive, ref, toRefs } from "vue";
import { roleAssignment, getRoleList } from "@/api/UserCenter";
import { message } from "ant-design-vue";

export default {
  setup(props, context) {
    const form = reactive({
      userAccount: null,
      userRole: null,
      id: null,
    });
    const formRef = ref();
    const parametr = reactive({
      visible: false,
      roleList: [],
    });

    const submitHandle = () => {
      formRef.value.validate().then(() => {
        roleAssignment(form).then((res) => {
          handleSuccessTip(res);
        });
      });
    };

    const showModal = async (obj) => {
      const { _id, userRole, userAccount } = obj;
      resultForm();
      await getRole();
      await Object.assign(form, {
        userAccount,
        userRole,
        id: _id,
      });
    };
    const getRole = () => {
      getRoleList().then((res) => {
        if (res.code == 1) {
          parametr.roleList = res.data;
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

    const resultForm = () => {
      parametr.visible = true;
      Object.assign(form, {
        userAccount: null,
        userRole: null,
        id: null,
      });
    };

    return {
      form,
      rules,
      ...toRefs(parametr),
      formRef,
      submitHandle,
      showModal,
    };
  },
};
</script>

<style lang="less" scoped></style>
