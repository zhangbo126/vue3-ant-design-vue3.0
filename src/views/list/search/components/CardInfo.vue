<template>
  <div class="cardInfo">
    <div>
      <p>活跃用户</p>
      <p>{{ activeUser }}</p>
    </div>
    <div>
      <p>新增用户</p>
      <p>{{ newUser }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardInfo',
  props: {
    activeUser: {
      type: [String, Number],
      default: 0
    },
    newUser: {
      type: [String, Number],
      default: 0
    }
  }
}
</script>

<style lang="less" scoped>



</style>
