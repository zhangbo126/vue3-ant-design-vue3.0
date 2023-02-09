<template>
  <router-view v-slot="{ Component }" >
    <transition>
      <!-- <keep-alive>
        <component :is="Component"></component>
      </keep-alive> -->
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script setup>

</script>

<style>

</style>
