<template>
  <div class="user-dropdown">
    <a-dropdown>
      <span class="user-dropdown-menu">
        {{ state.userInfo.userAccount }}&nbsp;
        <SettingFilled :style="{ fontSize: '16px', cursor: 'pointer' }" />
      </span>
      <template #overlay>
        <a-menu>
          <a-menu-item @click="handleLogout">
            <span>退出登录</span>
          </a-menu-item>
          <a-menu-item @click="handlePass">
            <span>密码修改</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <pass-modify-modal ref="modify"></pass-modify-modal>
  </div>
</template>
  
<script setup>
import { useStore } from "vuex";
import { reactive, toRefs, ref } from "vue";
import { Modal } from "ant-design-vue";
import PassModifyModal from "./PassModifyModal.vue";
const modify = ref();
const store = useStore();
const state = reactive({
  userInfo: store.state.login.userInfo
});

const handleLogout = () => {
  Modal.confirm({
    title: "确认要执行操作吗?",
    okText: "确认",
    cancelText: "取消",
    onOk() {
      store.dispatch("Logout");
    }
  });
};
const handlePass = () => {
  modify.value.showModal();
};
</script>
  
 <style lang="less" scoped>
.user-dropdown {
  cursor: pointer;
  padding: 0px 20px;
}
</style>
  