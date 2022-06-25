<template>
  <a-row>
    <a-col :span="24">
      <a-card>
        <a-button type="primary" :style="{ margin: '10px 0px' }" @click="onAddActivity">新增活动+</a-button>
        <!-- 查询区域 -->
        <ul class="query-handle">
          <li>
            <a-input style="width: 140px" v-model:value.trim="queryInfo.name" placeholder="活动名称" @keyup.enter="onChangeSearch" />
          </li>
          <li>
            <a-select style="width: 140px" v-model:value="queryInfo.status" placeholder="状态" @change="onChangeSearch">
              <a-select-option key="1" :value="1">进行中</a-select-option>
              <a-select-option key="2" :value="0">已结束</a-select-option>
            </a-select>
          </li>
          <li>
            <a-space>
              <a-button @click="onSearch" type="primary">搜索</a-button>
              <a-button @click="onResult">重置</a-button>
            </a-space>
          </li>
        </ul>
        <!-- 表内容 -->
        <a-table
          :dataSource="data"
          bordered
          rowKey="_id"
          :columns="columns"
          :pagination="{
          size:'small',
          total, 
          onChange:onChangePage,
          onShowSizeChange:handlePageSizeChange,
          showTotal:(total) => `总计${total}`,
          pageSize:queryInfo.pageSize,
          current:queryInfo.pageNumber, 
          showSizeChanger:true,
          showQuickJumper:true,
          position:['bottomCenter']}"
        >
          <template #bodyCell="{ column, text,record }">
            <template v-if="column.dataIndex === 'status'">
              <div>{{ statusMapFilter(text) }}</div>
            </template>
            <template v-if="column.dataIndex === 'imageFilePath'">
              <div>
                <img :src="text" width="120" alt />
              </div>
            </template>
            <template v-if="column.dataIndex === 'action'">
              <ul class="table-action">
                <li v-if="record.status == 1">
                  <a @click="endActivity(record._id)">结束活动</a>
                </li>
                <li v-if="record.status == 0">
                  <a @click="removeActivity(record._id)">删除活动</a>
                </li>
              </ul>
            </template>
          </template>
        </a-table>
      </a-card>
    </a-col>
    <add-activity ref="activity" @refresh="refresh"></add-activity>
  </a-row>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from "vue";
import { Modal, message } from "ant-design-vue";
import {
  getActivityList,
  delActivity,
  stopActivity
} from "@/api/informationCenter";
import AddActivity from "./informationList/AddActivity.vue";

const columns = [
  {
    title: "活动名称",
    dataIndex: "name",
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center"
  },
  {
    title: "活动封面",
    dataIndex: "imageFilePath",
    align: "center",
    width: 130
  },
  {
    title: "活动内容",
    dataIndex: "content",
    align: "center"
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    align: "center"
  },

  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    width: 130
  }
];
const statusMap = {
  0: "已结束",
  1: "进行中"
};

export default {
  components: { AddActivity },
  setup() {
    const data = ref([]);
    const activity = ref(null);
    const pageData = reactive({
      queryInfo: {
        pageSize: 10,
        pageNumber: 1,
        name: null,
        status: null
      },
      total: 0
    });

    //新增活动
    const onAddActivity = () => {
      activity.value.showModal();
    };
    //结束活动
    const endActivity = id => {
      Modal.confirm({
        title: "确认要执行操作吗?",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          stopActivity(id).then(res => {
            if (res.code == 1) {
              message.success("操作成功");
              getList();
            }
          });
        }
      });
    };
    //删除活动
    const removeActivity = id => {
      Modal.confirm({
        title: "确认要执行操作吗?",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          delActivity(id).then(res => {
            if (res.code == 1) {
              message.success("操作成功");
              getList();
            }
          });
        }
      });
    };
    const getList = () => {
      getActivityList(pageData.queryInfo).then(res => {
        if (res.code != 1) {
          return;
        }
        data.value = res.data;
        pageData.total = res.count;
      });
    };

    const onChangePage = current => {
      pageData.queryInfo.pageNumber = current;
      getList();
    };
    const onChangeSearch = () => {
      getList();
    };
    const handlePageSizeChange = (current, size) => {
      pageData.queryInfo.pageNumber = 1;
      pageData.queryInfo.pageSize = size;
      getList();
    };
    const onSearch = () => {
      pageData.queryInfo.pageNumber = 1;
      getList();
    };
    const onResult = () => {
      Object.assign(pageData.queryInfo, {
        pageNumber: 1,
        pageSize: 10,
        name: null,
        status: null
      });
      getList();
    };
    const statusMapFilter = type => {
      return statusMap[type];
    };
    onMounted(() => {
      getList();
    });

    const refresh = () => {
      getList();
    };
    return {
      statusMap,
      statusMapFilter,
      activity,
      data,
      columns,
      onChangePage,
      onAddActivity,
      onChangeSearch,
      handlePageSizeChange,
      ...toRefs(pageData),
      onSearch,
      onResult,
      refresh,
      endActivity,
      removeActivity
    };
  }
};
</script>

<style scoped lang="less"></style>
