<template>
    <a-result status="404" title="404" sub-title="当前页面丢失！">
    <template #extra>
      <a-button type="primary" @click="$router.push('/home/page')">返回首页</a-button>
    </template>
  </a-result>
</template>