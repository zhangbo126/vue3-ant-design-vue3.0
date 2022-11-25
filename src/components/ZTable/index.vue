<template>
  <a-table v-bind="$attrs" :pagination="
	   {
		size:'small',
		total,
		pageSize,
		current:pageNumber,
		showSizeChanger:true,
		showQuickJumper:true,
		showTotal:(total) => `总计${total}`,
		position:['bottomCenter'],
		onChange:onChangePage,
		onShowSizeChange,
	  }">
    <template #[slotName]="slotProps" v-for="(slot, slotName) in $slots">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </a-table>
</template>
  
<script setup>
import { useAttrs, useSlots, ref } from "vue";
const emit = defineEmits([
  "update:pageNumber",
  "update:pageSize",
  "onPagination"
]);
//传入的参数
const props = defineProps({
  pageNumber: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 0
  }
});
//操作的类型
const changeType = ref("");
const onChangePage = (pageNumber, pageSize, e) => {
  if (changeType.value == "showSizeChange") {
    emit("update:pageNumber", 1);
  } else {
    emit("update:pageNumber", pageNumber);
  }
  changeType.value = "change";
  emit("update:pageSize", pageSize);
  emit("onPagination", { pageNumber, pageSize });
};

const onShowSizeChange = (pageNumber, pageSize) => {
  changeType.value = "showSizeChange";
};
</script>
