<template>
  <router-view v-slot="{ Component }" >
    <transition>
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script setup>

</script>

<style>

</style>
