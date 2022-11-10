<template>
  <a-modal v-model:visible="pageData.visible" :width="600" ok-text="确认" cancel-text="取消" title="定义角色" @ok="submitHandle" @cancel="onCancelModal">
    <a-form ref="formRef" :model="form" :rules="rules" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
      <a-form-item ref="userAccount" label="账户名称">{{ form.userAccount }}</a-form-item>
      <a-form-item label="用户角色" name="userRole">
        <a-checkbox-group v-model:value="form.userRole">
          <a-checkbox v-for="role in pageData.roleList" :key="role._id" :value="role._id">{{ role.name }}</a-checkbox>
        </a-checkbox-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
const rules = {
  userRole: [
    {
      required: true,
      message: "请选择",
      trigger: ["change", "blur"],
      type: "array"
    }
  ]
};
import { reactive, ref, toRefs } from "vue";
import { roleAssignment, getRoleList } from "@/api/UserCenter";
import { message } from "ant-design-vue";
const emit = defineEmits(["refresh"]);
const form = reactive({
  userAccount: null,
  userRole: null,
  id: null
});
const formRef = ref();
const pageData = reactive({
  visible: false,
  roleList: []
});

const submitHandle = () => {
  formRef.value.validate().then(() => {
    roleAssignment(form).then(res => {
      handleSuccessTip(res);
    });
  });
};

const showModal = async obj => {
  const { _id, userRole, userAccount } = obj;
  pageData.visible = true;
  const { data } = await getRoleList();
  pageData.roleList = data;
  await Object.assign(form, {
    userAccount,
    userRole,
    id: _id
  });
};
const handleSuccessTip = res => {
  if (res.code == 1) {
    message.success("操作成功");
    emit("refresh");
    pageData.visible = false;
  }
};

const onCancelModal = () => {
  formRef.value.resetFields();
  Object.assign(form, {
    userAccount: null,
    userRole: null,
    id: null
  });
};
defineExpose({
  showModal
});
</script>

<style lang="less" scoped></style>
