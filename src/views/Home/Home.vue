<template>
  <a-result>
    <template #icon>
      <a-image :width="70" :src="require('@/assets/image/avatar.jpg')" />
    </template>
    <template #extra>
      <div :style="{ textAlign: 'left', width: '500px', margin: '0 auto' }">
        <div>
          <b>CSDN:</b>
          <a href="https://blog.csdn.net/weixin_43835425" target="_brank">https://blog.csdn.net/weixin_43835425</a>
        </div>
        <div>
          <b>前端:</b>
          <a href="https://gitee.com/ZHANG_6666/crm-template" target="_brank">https://gitee.com/ZHANG_6666/crm-template</a>
        </div>
        <div>
          <b>后端:</b>
          <a href="https://gitee.com/ZHANG_6666/express--vue3--ant-design2" target="_brank">https://gitee.com/ZHANG_6666/express--vue3--ant-design2</a>
        </div>
      </div>
    </template>
  </a-result>
</template>

<script>
export default {};
</script>

<style></style>
