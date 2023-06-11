<template>
  <a-modal v-model:visible="pageData.visible" :width="600" ok-text="确认" cancel-text="取消" title="密码修改" @ok="submitHandle" :destroyOnClose="true" @cancel="onCancelModal">
    <a-form ref="formRef" :model="form" :rules="rules" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
      <a-form-item ref="oldPassWord" label="原密码" name="oldPassWord">
        <a-input-password placeholder="原密码" style="width: 220px" v-model:value.trim="form.oldPassWord" />
      </a-form-item>
      <a-form-item label="新密码" name="passWord">
        <a-input-password placeholder="新密码" style="width: 220px" v-model:value.trim="form.passWord" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup>
const rules = {
  oldPassWord: [
    {
      required: true,
      message: "请输入",
      trigger: ["change", "blur"],
      type: "string"
    }
  ],
  passWord: [
    {
      required: true,
      message: "请输入",
      trigger: ["change", "blur"],
      type: "string"
    }
  ]
};
import { editPasswordTesting, editPassword } from "@/api/userCenters.js";
import { reactive, ref, toRefs } from "vue";
import { message } from "ant-design-vue";
import { useStore } from "vuex";

const form = reactive({
  oldPassWord: null,
  passWord: null
});
const store = useStore();
const formRef = ref();
const pageData = reactive({
  visible: false
});

const submitHandle = () => {
  formRef.value
    .validate()
    .then(async () => {
      // 原密码验证
      const { code } = await editPasswordTesting(form.oldPassWord);
      if (code == 1) {
        const res = await editPassword(form);
        if (res.code == 1) {
          message.success("操作成功");
          setTimeout(() => {
            store.dispatch("Logout");
          }, 1000);
        }
      }
    })
    .catch(error => {});
};

const showModal = async () => {
  pageData.visible = true;
};

const onCancelModal = () => {
  formRef.value.resetFields();
  Object.assign(form, {
    oldPassWord: null,
    passWord: null
  });
};
defineExpose({
  showModal
});
</script>
