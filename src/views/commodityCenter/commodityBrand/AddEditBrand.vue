<template>
  <a-modal
    v-model:visible="pageData.visible"
    :width="600"
    @cancel="onCancelModal"
    ok-text="确认"
    :destroyOnClose="true"
    cancel-text="取消"
    :title="pageData.type == 1 ? '新增品牌' : '编辑品牌'"
    @ok="submitHandle"
  >
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item ref="name" label="品牌名称" name="name">
        <a-input placeholder="品牌名称" style="width: 220px" v-model:value="form.name" />
      </a-form-item>
      <a-form-item label="排序" name="sort">
        <a-input-number
          placeholder="排序"
          style="width: 220px"
          v-model:value="form.sort"
        />
      </a-form-item>
      <a-form-item label="状态" name="status" ref="status">
        <a-radio-group v-model:value="form.status">
          <a-radio :value="1">使用中</a-radio>
          <a-radio :value="0">已停用</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="品牌图标" name="logoFilePath">
        <z-upload
          list-type="picture-card"
          v-model:filePath="form.logoFilePath"
          name="file"
        ></z-upload>
      </a-form-item>
      <a-form-item ref="introduce" label="描述" name="introduce">
        <a-textarea
          v-model:value.trim="form.introduce"
          placeholder="描述"
          :auto-size="{ minRows: 3, maxRows: 6 }"
        />
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
      type: "string",
    },
    {
      message: "品牌名称长度由0-18位组成",
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
  introduce: [
    {
      message: "字符长度2-200",
      min: 2,
      max: 200,
      trigger: ["change", "blur"],
      type: "string",
    },
  ],
};
import ZUpload from "@/components/ZUpload";
import { reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { addBrand, editBrand } from "@/api/commodityCenter";
const emit = defineEmits(["refresh"]);
const form = reactive({
  name: null,
  logoFilePath: null,
  sort: null,
  _id: null,
  status: 1,
  introduce: null,
});
const formRef = ref();
const pageData = reactive({
  type: 1,
  visible: false,
});

//保存提交
const submitHandle = () => {
  formRef.value.validate().then(async () => {
    if (pageData.type == 1) {
      const res = await addBrand(form);
      handleSuccessTip(res);
      return;
    }
    const res = await editBrand(form);
    handleSuccessTip(res);
  });
};

// 新增打开弹框
const showAddModal = async () => {
  pageData.type = 1;
  pageData.visible = true;
};
//编辑打开弹框
const showEditModal = (obj) => {
  pageData.type = 2;
  pageData.visible = true;
  const { name, logoFilePath, sort, _id, introduce } = obj;
  Object.assign(form, {
    name,
    logoFilePath,
    sort,
    introduce,
    _id,
  });
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
  showAddModal,
  showEditModal,
});
</script>
