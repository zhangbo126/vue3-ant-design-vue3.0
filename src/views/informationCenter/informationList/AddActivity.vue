<template>
  <a-modal
    v-model:visible="pageData.visible"
    @cancel="onCancelModal"
    :width="600"
    ok-text="确认"
    :destroyOnClose="true"
    keyboard
    cancel-text="取消"
    title="新增活动"
    @ok="submitHandle"
  >
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item ref="name" label="活动名称" name="name">
        <a-input placeholder="活动名称" style="width: 220px" v-model:value="form.name" />
      </a-form-item>
      <a-form-item label="状态" name="status" ref="status">
        <a-radio-group v-model:value="form.status">
          <a-radio :value="1">进行中</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="活动封面" name="imageFilePath" ref="imageFilePathRef">
        <z-upload
          list-type="picture-card"
          v-model:filePath="form.imageFilePath"
          name="file"
        ></z-upload>
      </a-form-item>
      <a-form-item label="活动内容" ref="content" name="content">
        <a-textarea
          v-model:value.trim="form.content"
          placeholder="活动内容"
          allow-clear
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import ZUpload from "@/components/ZUpload";
const rules = {
  name: [
    {
      required: true,
      message: "请输入",
      trigger: ["change", "blur"],
      type: "string",
    },
    {
      message: "活动名称长度由0-18位组成",
      min: 0,
      max: 18,
      trigger: ["change", "blur"],
      type: "string",
    },
  ],
  status: [
    {
      required: true,
      message: "请选择",
      trigger: ["change", "blur"],
      type: "number",
    },
  ],
  imageFilePath: [
    {
      required: true,
      message: "请上传",
      trigger: ["change", "blur"],
      type: "string",
    },
  ],
  content: [
    {
      required: true,
      message: "请输入",
      trigger: ["change", "blur"],
      type: "string",
    },
  ],
};
import { reactive, ref } from "vue";
import { message } from "ant-design-vue";
import {  addInformation } from "@/api/informationCenter";
const emit = defineEmits(["refresh"]);
const form = reactive({
  name: null,
  imageFilePath: null,
  content: null,
  status: 1,
});
const formRef = ref();
const imageFilePathRef = ref();
const pageData = reactive({
  visible: false,
});



//保存提交
const submitHandle =  () => {
  formRef.value.validate().then(async () => {
    const res = await addInformation(form)
    handleSuccessTip(res);
  });
};

// 新增打开弹框
const showModal = () => {
  pageData.visible = true;
};

const handleSuccessTip = (res) => {
  if (res.code == 1) {
    message.success("操作成功");
    emit("refresh");
    pageData.visible = false;
  }
};

//弹框关闭
const onCancelModal = () => {
  formRef.value.resetFields();
  Object.assign(pageData, {
    visible: false,
  });
};

defineExpose({
  showModal,
});
</script>
