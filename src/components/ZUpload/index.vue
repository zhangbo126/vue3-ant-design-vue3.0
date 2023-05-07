<template>
  <a-upload
    v-model:file-list="fileList"
    accept=".png,.jpg,.jpeg"
    v-bind="$attrs"
    :before-upload="onBeforeUpload"
    :customRequest="onCustomRequest"
    @remove="onRemove"
  >
    <div class="ant-upload-text">
      <plus-outlined></plus-outlined>
      <div>上传</div>
    </div>
  </a-upload>
</template>
<script setup>
import { message } from "ant-design-vue";
import { ref, onMounted, nextTick, computed, watch } from "vue";
import { imgUpload } from "@/api/commodityCenter";

const emit = defineEmits(["update:filePath", "uploadSuccess"]);
const props = defineProps({
  //上传数量
  limit: {
    type: Number,
    default: 1,
  },
  filePath: {
    default: null,
  },
  // 上传数量类型
  many: {
    type: Boolean,
    default: false,
  },
});

const fileList = ref([]);
//上传前的图片验证
const onBeforeUpload = (file) => {
  const fileType = ["image/jpeg", "image/png"];
  const isJpgOrPng = fileType.includes(file.type);
  if (!isJpgOrPng) {
    message.error("图片格式jpg/png!");
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("图片大小限制2MB!");
    return false;
  }
};
//上传
const onCustomRequest = async (file) => {
  const formData = new FormData();
  formData.append("file", file.file);
  const {
    data: { path },
  } = await imgUpload(formData);
  const files = [
    {
      uid: Math.random() * 1000,
      name: "image.png",
      status: "done",
      url: path,
    },
  ];

  if (!props.many) {
    fileList.value = files;
    emit("update:filePath", path);
    emit("uploadSuccess", path);
  } else {
    fileList.value = fileList.value.concat(files).filter((v) => v.status == "done");
    emit("update:filePath", fileList.value);
    emit("uploadSuccess", fileList.value);
  }
};

const onRemove = ({ uid }) => {
  if (!props.many) {
    fileList.value = [];
    emit("update:filePath", null);
    emit("uploadSuccess", null);
  } else {
    const index = fileList.value.findIndex((v) => v.uid == uid);
    fileList.value.splice(index, 1);
    emit("update:filePath", fileList.value);
    emit("uploadSuccess", fileList.value);
  }
};

watch(props, ({ filePath }) => {
  if (props.many && filePath && filePath.length) {
    fileList.value = filePath.map((url) => {
      return {
        uid: Math.random() * 1000,
        name: "image.png",
        status: "done",
        url,
      };
    });
  } else if (filePath) {
    fileList.value = [
      {
        uid: Math.random() * 1000,
        name: "image.png",
        status: "done",
        url: filePath,
      },
    ];
  }
});
</script>

<style scoped lang="less"></style>
