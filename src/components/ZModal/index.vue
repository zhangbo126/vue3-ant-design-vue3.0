<template>
  <div id="modal-box" v-drag-modal>
    <a-modal v-bind="$attrs" ref="modal" :getContainer="getContainer">
      <template #title>
        <div ref="modalTitleRef" style="width: 100%; cursor: move">{{ 22323 }}</div>
      </template>
      <template #[slotName]="slotProps" v-for="(slot, slotName) in $slots">
        <slot :name="slotName" v-bind="slotProps" />
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { watch, useAttrs, ref, onMounted, reactive } from "vue";
const modal = ref();
const getContainer = () => {
  return document.getElementById("modal-box");
};
</script>

<style></style>
