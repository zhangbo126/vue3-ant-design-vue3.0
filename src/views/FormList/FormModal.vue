<template>
  <a-modal v-model:visible="visible" title="表单弹框" :width="600" @ok="hideModal">
    <a-form ref="formRule" :model="formState" :rules="rules">
      <a-form-item>
        <a-form-item ref="name" label="Activity name" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="Activity time" name="pickTime">
          <a-date-picker
            v-model:value="formState.pickTime"
            show-time
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">Create</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
        </a-form-item>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      formState: {
        name: null,
        pickTime: null,
        type: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入",
            trigger: ["blur", "change"],
            type: "string",
          },
        ],
        pickTime: [
          {
            required: true,
            message: "请输入",
            trigger: ["blur", "change"],
            type: "object",
          },
        ],
        type: [{ required: true, message: "请输入", trigger: ["blur", "change"] }],
      },
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    onSubmit() {
      this.$refs.formRule.validate().then(() => {
        console.log(1);
      });
    },
    resetForm() {
      this.$refs.formRule.resetFields();
    },
    hideModal() {
      //   this.$refs.formRule.resetFields()
      this.visible = false;
    },
  },
};
</script>

<style></style>
