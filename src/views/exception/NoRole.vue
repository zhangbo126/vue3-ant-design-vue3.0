<template>
  <div></div>
</template>
<script>
import { Modal } from 'ant-design-vue';
export default {
  data() {
    return {};
  },
  mounted() {
    const _that= this
    Modal.info({
      title: "该账号没有权限",
      okText: "确认",
      onOk() {
           _that.$router.push('/loginview/login')
        },
    });
  },
};
</script>
