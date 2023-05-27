<template>
  <div class="home">
    <a-row>
      <a-col :span="8">
        <div class="author">
          <div :style="{ textAlign: 'left', width: '600px', margin: '0 auto' }">
            <div>
              <a-image :width="70" :src="$drawAssetsImage('author.png')" />
            </div>
            <div style="width: 30px">
              <b>CSDN:</b>
              <a href="https://blog.csdn.net/weixin_43835425" target="_brank"
              >https://blog.csdn.net/weixin_43835425
            </a>
            </div>
            <div>
              <b>前端:</b>
              <a href="https://gitee.com/ZHANG_6666/crm-template" target="_brank"
                >https://gitee.com/ZHANG_6666/crm-template</a
              >
            </div>
            <div>
              <b>后端:</b>
              <a
                href="https://gitee.com/ZHANG_6666/express--vue3--ant-design2"
                target="_brank"
                >https://gitee.com/ZHANG_6666/express--vue3--ant-design2</a
              >
            </div>
            <div>
              <b>小程序端:</b>
              <a href="https://gitee.com/ZHANG_6666/uni-app" target="_brank"
                >https://gitee.com/ZHANG_6666/uni-app</a
              >
            </div>
          </div>
        </div>
      </a-col>
      <a-col :span="16">
        <p><b>当前项目封装的一些组件和指令</b></p>
        <z-table bordered :pagination="false" :dataSource="dataSource" :columns="columns">
          <template #bodyCell="{ column, text,record }">
            <template v-if="column.dataIndex === 'template'">
              <z-text-tooltip placement="top" :lineClamp="1">
                {{ text }}
              </z-text-tooltip>
            </template>
            <template v-if="column.dataIndex === 'describe'">
              <z-text-tooltip placement="top" :lineClamp="2">
                {{ text }}
              </z-text-tooltip>
            </template>
            <template v-if="column.dataIndex === 'other'">
              <z-text-tooltip placement="top" :lineClamp="1">
                {{ text }}
              </z-text-tooltip>
            </template>
          </template>
        </z-table>
      </a-col>
    </a-row>
    <a-row>
        <div id="echarts"></div>
    </a-row>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, onUnmounted, ref } from "vue";
import { getLocationParams, deepCopy } from "@/utils/utilityFunction";
import { GEO_3D_OPTIONS } from "@/config/echartsConfig.js";
import { tableColumns, tableData } from "./homeData.js";
import * as echarts from "echarts";
import "echarts-gl";
const { $scoketEvent } = getCurrentInstance().proxy;
const myChart = ref();
const dataSource = tableData;
const columns = tableColumns;
onMounted(() => {
  echartsInit();
});

const echartsInit = () => {
  myChart.value = echarts.init(document.getElementById("echarts"));
  myChart.value.setOption(GEO_3D_OPTIONS);
  window.addEventListener("resize", myChart.value.resize);
};

// onMounted(() => {
//   $scoketEvent.messageSend("1231312313");
// });

// $scoketEvent.messageListener(msg => {
//    console.log(msg);
// });

//清除监听
onUnmounted(() => {
  window.removeEventListener("resize", myChart.value.resize);
  myChart.value.dispose()
});

</script>

<style scoped lang="less">
.home {
  .author {
    display: flex;
    justify-content: center;
    div {
      margin-bottom: 20px;
    }
  }
  #echarts {
    width: 60%;
    margin:0 auto;
    height: calc(100vh - 100px);
  }
}
</style>
