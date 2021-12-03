<template>
  <div id="loginView">
    <div class="login-containter">
      <div class="header">
        <img src="https://store.antdv.com/pro/preview/img/logo.0f102d1c.svg" alt="" />
        <span>一韵茶叶后台管理系统</span>
      </div>
      <div class="describe">基于vue3cli,ant-design-vue2.0版本搭建的后台管理系统</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
#loginView {
  position: relative;
  width: 100%;
  min-height: 100%;
  padding: 110px 0 144px;
  background-image: url("../assets/image/login_bg.svg");
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  .login-containter {
    text-align: center;
    line-height: 44px;
    img {
      height: 44px;
      margin-right: 16px;
      vertical-align: top;
      border-style: none;
    }
    span {
      position: relative;
      top: 2px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 600;
      font-size: 33px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    }
  }
  .describe {
    margin-top: 12px;
    margin-bottom: 40px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
