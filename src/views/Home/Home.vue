<template>
  <a-result>
    <template #icon>
      <a-image :width="70" src="https://portrait.gitee.com/uploads/avatars/user/1817/5452088_ZHANG_6666_1627609275.png!avatar200" />
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
        <div>
          <b>小程序端:</b>
          <a href="https://gitee.com/ZHANG_6666/uni-app" target="_brank">https://gitee.com/ZHANG_6666/uni-app</a>
        </div>
      </div>
      <div id="echarts"></div>
    </template>
  </a-result>
</template>

<script setup>
import { getCurrentInstance, onMounted, onUnmounted ,ref} from "vue";
import { getLocationParams, deepCopy } from "@/utils/utilityFunction";
import {GEO_3D_OPTIONS} from '@/config/echartsConfig.js'
import * as echarts from "echarts";
import "echarts-gl";

const { $scoketEvent } = getCurrentInstance().proxy;
const myChart =ref()
onMounted(() => {
  echartsInit()
});

const echartsInit = () => {
   myChart.value = echarts.init(document.getElementById("echarts"));
   myChart.value.setOption(GEO_3D_OPTIONS);
   window.addEventListener('resize',myChart.value.resize)
};

// onMounted(() => {
//   $scoketEvent.messageSend("1231312313");
// });

// $scoketEvent.messageListener(msg => {
//    console.log(msg);
// });

//清除监听
onUnmounted(() => {
    window.removeEventListener('resize',myChart.value.resize)
});
</script>

<style scoped>
#echarts {
  width: 100%;
  height: 500px;
}
</style>
