<template>
  <div class="login">
    <a-form
      name="custom-validation"
      ref="formRef"
      :model="form"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-item required name="userAccount">
        <a-input v-model:value="form.userAccount" size="large" placeholder="账号" />
      </a-form-item>
      <a-form-item required name="passWord">
        <a-input-password
          v-model:value="form.passWord"
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
          :loading="loading"
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
      userAccount: "admin",
      passWord: "123456",
    });
    let usernameRule = async (rule, value) => {
      if (!value) {
        return Promise.reject("请输入");
      }
    };

    let passwordRule = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入");
      }
      return Promise.resolve();
    };

    const rules = {
      userAccount: [
        {
          validator: usernameRule,
          trigger: ["change", "blur"],
        },
      ],
      passWord: [
        {
          validator: passwordRule,
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
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions(["Login"]),
    onSubmit() {
      this.$refs.formRef
        .validate()
        .then((res) => {
          this.loading = true;
          this.Login(this.form)
            .then((res) => {
              this.loading = false;
              this.$router.push("/");
              this.$message.success("登录成功");
            })
            .catch((res) => {
              this.loading = false;
              this.$message.warning(res.message);
            });
        })
        .catch(() => {});
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
