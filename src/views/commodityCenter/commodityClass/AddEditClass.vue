<template>
  <a-modal
    v-model:visible="pageData.visible"
    @cancel="onCancelModal"
    :destroyOnClose="true"
    keyboard
    :width="600"
    ok-text="确认"
    cancel-text="取消"
    :confirm-loading="pageData.confirmLoading"
    :title="pageData.type == 1 ? '新增分类' : '编辑分类'"
    @ok="submitHandle"
  >
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item ref="name" label="分类名称" name="name">
        <a-input placeholder="分类名称" style="width: 220px" v-model:value="form.name" />
      </a-form-item>
      <a-form-item label="父级分类" name="partentId">
        <a-select
          v-model:value="form.partentId"
          placeholder="父级分类"
          style="width: 220px"
          :allowClear="true"
          show-search
          :filter-option="filterOption"
        >
          <a-select-option
            v-for="item in pageData.classList"
            :key="item._id"
            :value="item._id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
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
      <a-form-item label="分类图标" name="logoFilePath">
        <z-upload
          list-type="picture-card"
          v-model:filePath="form.logoFilePath"
          name="file"
        ></z-upload>
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
      message: "分类名称长度由0-18位组成",
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
};
import { reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { getPartentClass, addClass, editClass } from "@/api/commodityCenter";
const emit = defineEmits(["refresh"]);
const form = reactive({
  name: null,
  logoFilePath: null,
  sort: null,
  partentId: null,
  _id: null,
  status: 1,
});
const formRef = ref();
const pageData = reactive({
  type: 1,
  visible: false,
  classList: [],
  confirmLoading:false
});

//保存提交
const submitHandle = () => {
  formRef.value.validate().then(async () => {
    try {
      pageData.confirmLoading=true
      if (pageData.type == 1) {
        const res = await addClass(form);
        handleSuccessTip(res);
        return;
      }
      const res = await editClass(form);
      handleSuccessTip(res);
    } finally {
       pageData.confirmLoading=false
    }
  });
};

// 新增打开弹框
const showAddModal = async () => {
  pageData.type = 1;
  pageData.visible = true;
  const { data } = await getPartentClass();
  pageData.classList = data;
};
//编辑打开弹框
const showEditModal = async (obj) => {
  pageData.type = 2;
  pageData.visible = true;
  const { data } = await getPartentClass();
  pageData.classList = data;
  const { name, logoFilePath, sort, partentId, _id } = obj;
  Object.assign(form, {
    name,
    logoFilePath,
    sort,
    partentId,
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

const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

//弹框关闭
const onCancelModal = () => {
  formRef.value.resetFields();
  Object.assign(pageData, {
    visible: false,
    confirmLoading:false,
    classList: [],
  });
};
defineExpose({
  showAddModal,
  showEditModal,
});
</script>

<style lang="less" scoped></style>
