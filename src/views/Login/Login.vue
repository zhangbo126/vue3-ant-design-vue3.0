<template>
  <div class="login">
    <a-form
      name="custom-validation"
      ref="formRef"
      :model="form"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-item required name="account">
        <a-input v-model:value="form.account" size="large" placeholder="账号" />
      </a-form-item>
      <a-form-item required name="checkPass">
        <a-input-password
          v-model:value="form.checkPass"
          size="large"
          type="password"
          placeholder="密码"
          autocomplete="off"
        />
      </a-form-item>

      <a-form-item>
        <a-button
          class="login-btn"
          size="large"
          type="primary"
          html-type="submit"
          @click="onSubmit"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { defineComponent, reactive } from "vue";
import { mapActions } from "vuex";
export default defineComponent({
  setup() {
    const form = reactive({
      account: undefined,
      checkPass: undefined,
    });
    let accountRule = async (rule, value) => {
      if (!value) {
        return Promise.reject("请输入");
      }
    };

    let checkPassRule = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入");
      }
      return Promise.resolve();
    };

    const rules = {
      account: [
        {
          validator: accountRule,
          trigger: ["change", "blur"],
        },
      ],
      checkPass: [
        {
          validator: checkPassRule,
          trigger: ["change", "blur"],
        },
      ],
    };
    const layout = {
      labelCol: {
        span: 0,
      },
      wrapperCol: {
        span: 24,
      },
    };

    return {
      form,
      rules,
      layout,
    };
  },
  created() {},
  methods: {
    ...mapActions(["Login"]),
    onSubmit() {
      this.$refs.formRef
        .validate()
        .then((res) => {
          this.Login().then((res) => {
            console.log(res);
            this.$router.push("/form/formlist");
            this.$message.success("登录成功");
          });
        })
        .catch((res) => {
          console.log(res);
        });
    },
  },
});
</script>

<style scoped lang="less">
.login {
  width: 340px;
  margin: 0 auto;
  .login-btn {
    width: 100%;
  }
}
</style>
