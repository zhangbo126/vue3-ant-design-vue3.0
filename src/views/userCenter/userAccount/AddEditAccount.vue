<template>
  <a-modal v-model:visible="pageData.visible" :width="600" ok-text="确认" :destroyOnClose="true" cancel-text="取消" :title="pageData.type == 1 ? '新增账号' : '编辑账号'" @ok="submitHandle" @cancel="onCancelModal">
    <a-form ref="formRef" :model="form" :rules="rules" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
      <a-form-item ref="userAccount" label="账户名称" name="userAccount">
        <a-input placeholder="账户名称" style="width: 220px" v-model:value="form.userAccount" />
      </a-form-item>
      <a-form-item label="联系方式" name="phone">
        <a-input placeholder="联系方式" style="width: 220px" v-model:value.trim="form.phone" />
      </a-form-item>
      <a-form-item label="邮箱" name="email" required>
        <a-input placeholder="邮箱" type="email" style="width: 220px" v-model:value.trim="form.email" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
const rules = {
  userAccount: [
    {
      required: true,
      message: "请输入",
      trigger: ["change", "blur"],
      type: "string"
    },
    {
      message: "账号名由英文或者数字6-18位组成",
      pattern: /^[a-zA-Z\d]{6,18}$/,
      trigger: ["change", "blur"],
      type: "string"
    }
  ],
  phone: [
    {
      required: true,
      message: "请输入",
      trigger: ["change", "blur"],
      type: "string"
    },
    {
      message: "手机格式不正确",
      pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      trigger: ["change", "blur"],
      type: "string"
    }
  ],
  email: [
    {
      required: true,
      message: "请输入",
      trigger: ["change", "blur"],
      type: "string"
    },
    {
      message: "邮箱格式不正确",
      pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      trigger: ["change", "blur"],
      type: "string"
    }
  ]
};
import { reactive, ref, toRefs } from "vue";
import { addAccount, editMenuTree } from "@/api/userCenters";
import { message } from "ant-design-vue";
const emit = defineEmits(["refresh"]);
const form = reactive({
  userAccount: null,
  phone: null,
  email: null,
  id: null
});
const formRef = ref();
const pageData = reactive({
  type: 1,
  visible: false,
});

const submitHandle = () => {
  formRef.value.validate().then(() => {
    if (pageData.type == 1) {
      addAccount(form).then(res => {
        handleSuccessTip(res);
      });
      return;
    }
    editMenuTree(form).then(res => {
      handleSuccessTip(res);
    });
  });
};

const showAddModal = async () => {
  pageData.type = 1;
  pageData.visible = true;
};

const handleSuccessTip = res => {
  if (res.code == 1) {
    message.success("操作成功");
    emit("refresh");
    pageData.visible = false;
  }
};

const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const filterOptionPartent = (input, option) => {
  return (
    option.children[0].children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  );
};
const onCancelModal = () => {
  formRef.value.resetFields();
  Object.assign(form, {
    userAccount: null,
    phone: null,
    email: null,
    id: null
  });
};
defineExpose({
  showAddModal,
});
</script>

<style lang="less" scoped></style>
