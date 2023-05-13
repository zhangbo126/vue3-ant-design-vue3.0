<template>
  <a-upload
    v-model:file-list="fileList"
    accept=".png,.jpg,.jpeg"
    v-bind="$attrs"
    :before-upload="onBeforeUpload"
    :customRequest="onCustomRequest"
  >
    <div class="ant-upload-text">
      <plus-outlined></plus-outlined>
      <div>上传</div>
    </div>
    <template #itemRender="{ file, actions }">
      <div class="upload-img">
        <img :src="file.url" />
        <div class="upload-mask">
          <a-space>
            <eye-outlined
              @click="onPreview(file, actions)"
              :style="{ fontSize: '16px' }"
            />
            <delete-outlined @click="onRemove(file)" :style="{ fontSize: '16px' }" />
          </a-space>
        </div>
      </div>
    </template>
  </a-upload>
  <div :style="{ display: 'none' }">
    <a-image-preview-group
      :preview="{
        visible,
        onVisibleChange: (vis) => (visible = vis),
        current: imageCurrent,
      }"
    >
      <a-image
        v-for="item in fileList"
        :key="item.uid"
        :width="100"
        :height="100"
        :src="item.url"
      />
    </a-image-preview-group>
  </div>
</template>
<script setup>
import { message } from "ant-design-vue";
import { ref, watch, onMounted } from "vue";
import { imgUpload, imgBatchUpload } from "@/api/commodityCenter";

const emit = defineEmits(["update:filePath", "uploadSuccess"]);
const props = defineProps({
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
const visible = ref(false);
const imageCurrent = ref(0);
watch(props, ({ filePath }) => {
  initUploadFile(filePath);
});

onMounted(() => {
  initUploadFile(props.filePath);
});

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
// 删除
const onRemove = ({ uid }) => {
  if (!props.many) {
    fileList.value = [];
    emit("update:filePath", null);
    emit("uploadSuccess", null);
  } else {
    const index = fileList.value.findIndex((v) => v.uid == uid);
    fileList.value.splice(index, 1);
    if (fileList.value.length) {
      emit("update:filePath", fileList.value);
      emit("uploadSuccess", fileList.value);
    } else {
      emit("update:filePath", null);
      emit("uploadSuccess", null);
    }
  }
};
// 预览
const onPreview = (file) => {
  imageCurrent.value = fileList.value.findIndex((v) => v.uid == file.uid);
  visible.value = true;
};

// 初始化上传组件文件
const initUploadFile = (filePath) => {
  if (props.many && filePath && filePath.length) {
    fileList.value = filePath.map((file) => {
      return {
        uid: Math.random() * 1000,
        name: "image.png",
        status: "done",
        url: file.url,
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
};
</script>

<style scoped lang="less">
/deep/ .ant-image-img {
  height: 100px;
}
.upload-img {
  width: 100px;
  height: 100px;
  position: relative;

  .upload-mask {
    position: absolute;
    display: block;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s;
    &:hover {
      opacity: 1;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
