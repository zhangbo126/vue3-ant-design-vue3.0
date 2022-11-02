<template>
  <a-modal v-model:visible="pageData.visible" @cancel="onCancelModal" :width="600" ok-text="确认" :destroyOnClose="true" keyboard cancel-text="取消" title="新增活动"
    @ok="submitHandle">
    <a-form ref="formRef" :model="form" :rules="rules" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
      <a-form-item ref="name" label="活动名称" name="name">
        <a-input placeholder="活动名称" style="width: 220px" v-model:value="form.name" />
      </a-form-item>
      <a-form-item label="状态" name="status" ref="status">
        <a-radio-group v-model:value="form.status">
          <a-radio :value="1">进行中</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="活动封面" name="imageFilePath" ref="imageFilePathRef">
        <a-upload v-model:file-list="pageData.fileList" list-type="picture-card" name="file" :before-upload="onBeforeUpload"
          :customRequest="onCustomRequest" @remove="onRemove">
          <div v-if="pageData.fileList.length == 0" class="ant-upload-text">
            <plus-outlined></plus-outlined>
            <div>上传</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="活动内容" ref="content" name="content">
        <a-textarea v-model:value.trim="form.content" placeholder="活动内容" allow-clear />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
const rules = {
  name: [
    {
      required: true,
      message: "请输入",
      trigger: ["change", "blur"],
      type: "string"
    },
    {
      message: "活动名称长度由0-18位组成",
      min: 0,
      max: 18,
      trigger: ["change", "blur"],
      type: "string"
    }
  ],
  status: [
    {
      required: true,
      message: "请选择",
      trigger: ["change", "blur"],
      type: "number"
    }
  ],
  imageFilePath: [
    {
      required: true,
      message: "请上传",
      trigger: ["change", "blur"],
      type: "string"
    }
  ],
  content: [
    {
      required: true,
      message: "请输入",
      trigger: ["change", "blur"],
      type: "string"
    }
  ]
};
import { reactive, ref, toRefs ,nextTick} from "vue";
import { message } from "ant-design-vue";
import { imgUpload, addInformation } from "@/api/informationCenter";
const emit = defineEmits(["refresh"]);
const form = reactive({
  name: null,
  imageFilePath: null,
  content: null,
  status: 1
});
const formRef = ref();
const imageFilePathRef = ref();
const pageData = reactive({
  visible: false,
  fileList: []
});

//上传图片前检测
const onBeforeUpload = file => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    pageData.fileList = [];
    return message.error("图片格式jpg/png!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    pageData.fileList = [];
    return message.error("图片大小限制2MB!");
  }
};
//图片上传
const onCustomRequest = file => {
  const formData = new FormData();
  formData.append("file", file.file);
  imgUpload(formData).then(res => {
    const file = [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: res.data.path
      }
    ];
    pageData.fileList = file;
    form.imageFilePath = res.data.path;
    formRef.value.validate("imageFilePath");
  });
};
//图片删除
const onRemove = e => {
  pageData.fileList = [];
  form.imageFilePath = null;
};

//保存提交
const submitHandle = () => {
  formRef.value.validate().then(() => {
    addInformation(form).then(res => {
      handleSuccessTip(res);
    });
  });
};

// 新增打开弹框
const showModal = () => {
  pageData.visible=true
};

const handleSuccessTip = res => {
  if (res.code == 1) {
    message.success("操作成功");
    emit("refresh");
    pageData.visible = false;
  }
};

//弹框关闭
const onCancelModal=()=>{
    formRef.value.resetFields()
    Object.assign(pageData, {
      visible: false,
      fileList: []
  });
}

defineExpose({
  showModal
});
</script>

