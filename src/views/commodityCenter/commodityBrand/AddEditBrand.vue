<template>
  <a-modal v-model:visible="visible" :width="600" ok-text="确认" cancel-text="取消" :title="type == 1 ? '新增品牌' : '编辑品牌'" @ok="submitHandle">
    <a-form ref="formRef" :model="form" :rules="rules" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
      <a-form-item ref="name" label="品牌名称" name="name">
        <a-input placeholder="品牌名称" style="width: 220px" v-model:value="form.name" />
      </a-form-item>
      <a-form-item label="排序" name="sort">
        <a-input-number placeholder="排序" style="width: 220px" v-model:value.trim="form.sort" />
      </a-form-item>
      <a-form-item label="状态" name="status" ref="status">
        <a-radio-group v-model:value="form.status">
          <a-radio :value="1">使用中</a-radio>
          <a-radio :value="0">已停用</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="品牌图标" name="logoFilePath">
        <a-upload v-model:file-list="fileList" list-type="picture-card" name="file" :before-upload="onBeforeUpload" :customRequest="onCustomRequest" :remove="onRemove">
          <div v-if="fileList.length == 0" class="ant-upload-text">
            <plus-outlined></plus-outlined>
            <div>上传</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item ref="introduce" label="描述" name="introduce">
        <a-textarea v-model:value.trim="form.introduce" placeholder="描述" :auto-size="{ minRows: 3, maxRows: 6 }" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
const rules = {
  name: [
    {
      required: true,
      message: "请输入",
      trigger: ["change", "blur"],
      type: "string"
    },
    {
      message: "品牌名称长度由0-18位组成",
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
  introduce: [
    {
      message: "字符长度2-200",
      min: 2,
      max: 200,
      trigger: ["change", "blur"],
      type: "string"
    }
  ]
};
import { reactive, ref, toRefs } from "vue";

import { message } from "ant-design-vue";
import { imgUpload, addBrand, editBrand } from "@/api/commodityCenter";
export default {
  setup(props, context) {
    const form = reactive({
      name: null,
      logoFilePath: null,
      sort: null,
      _id: null,
      status: 1,
      introduce: null
    });
    const formRef = ref();
    const parametr = reactive({
      type: 1,
      visible: false,
      fileList: []
    });

    //上传图片前检测
    const onBeforeUpload = file => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        return message.error("图片格式jpg/png!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
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
        parametr.fileList = file;
        form.logoFilePath = res.data.path;
      });
    };
    //图片删除
    const onRemove = e => {
      parametr.fileList = [];
      form.logoFilePath = null;
    };

    //保存提交
    const submitHandle = () => {
      formRef.value.validate().then(() => {
        if (parametr.type == 1) {
          addBrand(form).then(res => {
            handleSuccessTip(res);
          });
          return;
        }
        editBrand(form).then(res => {
          handleSuccessTip(res);
        });
      });
    };

    // 新增打开弹框
    const showAddModal = async () => {
      parametr.type = 1;
      resultForm();
    };
    //编辑打开弹框
    const showEditModal = obj => {
      parametr.type = 2;
      parametr.visible = true;
      parametr.fileList = [];
      const { name, logoFilePath, sort, _id, introduce } = obj;
      Object.assign(form, {
        name,
        logoFilePath,
        sort,
        introduce,
        _id
      });
      if (logoFilePath) {
        parametr.fileList = [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: logoFilePath
          }
        ];
      }
    };

    const handleSuccessTip = res => {
      if (res.code == 1) {
        message.success("操作成功");
        context.emit("refresh");
        parametr.visible = false;
      }
    };

    //手动重置表单内容
    const resultForm = () => {
      Object.assign(parametr, {
        visible: true,
        fileList: []
      });
      Object.assign(form, {
        name: null,
        logoFilePath: null,
        sort: null,
        _id: null,
        status: 1,
        introduce: null
      });
    };
    return {
      form,
      rules,
      ...toRefs(parametr),
      formRef,
      submitHandle,
      showAddModal,
      showEditModal,
      onBeforeUpload,
      onCustomRequest,
      onRemove
    };
  }
};
</script>

<style lang="less" scoped></style>
