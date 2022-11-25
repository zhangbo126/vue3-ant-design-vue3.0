<template>
  <a-row>
    <a-col :span="24">
      <a-button type="primary" :style="{ margin: '10px 0px' }" @click="onAddclass">新增分类+</a-button>
      <!-- 查询区域 -->
      <ul class="query-handle">
        <li>
          <a-input style="width: 140px" v-model:value.trim="pageData.queryInfo.name" placeholder="分类名称" @keyup.enter="onChangeSearch" />
        </li>
        <li>
          <a-select style="width: 140px" v-model:value="pageData.queryInfo.status" placeholder="状态" @change="onChangeSearch">
            <a-select-option key="1" :value="1">使用中</a-select-option>
            <a-select-option key="2" :value="0">已停用</a-select-option>
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
        :dataSource="dataSource"
        :loading="pageData.loading"
        bordered
        rowKey="_id"
        :columns="columns"
        :pagination="{
          size:'small',
          total:pageData.total, 
          onChange:onChangePage,
          onShowSizeChange:handlePageSizeChange,
          showTotal:(total) => `总计${total}`,
          pageSize:pageData.queryInfo.pageSize,
          current:pageData.queryInfo.pageNumber, 
          showSizeChanger:true,
          showQuickJumper:true,
          position:['bottomCenter']}"
      >
        <template #bodyCell="{ column, text,record }">
          <template v-if="column.dataIndex === 'status'">
            <div>{{ statusMapFilter(text) }}</div>
          </template>
          <template v-if="column.dataIndex === 'logoFilePath'">
            <div>
              <img :src="text" width="120" alt />
            </div>
          </template>
          <template v-if="column.dataIndex === 'action'">
            <a-button @click="onDelclass(record._id)" type="link">删除</a-button>
            <a-button @click="onEditclass(record)" type="link">编辑</a-button>
          </template>
        </template>
      </a-table>
    </a-col>
    <!-- 新增编辑商品分类 -->
    <add-edit-class ref="classify" @refresh="getList"></add-edit-class>
  </a-row>
</template>

<script setup>
const columns = [
  {
    title: "分类名称",
    dataIndex: "name",
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center"
  },
  {
    title: "分类图标",
    dataIndex: "logoFilePath",
    align: "center"
  },
  {
    title: "父级分类",
    dataIndex: "partentName",
    align: "center"
  },
  {
    title: "分类级别",
    dataIndex: "level",
    align: "center"
  },
  {
    title: "排序",
    dataIndex: "sort",
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
  0: "已停用",
  1: "使用中"
};
import { reactive, toRefs, ref, onMounted } from "vue";
import { getClassList, delClass } from "@/api/commodityCenter";
import AddEditClass from "./commodityClass/AddEditClass.vue";
import { Modal, message } from "ant-design-vue";

const dataSource = ref([]);
const classify = ref(null);
const queryInfo = {
  pageSize: 10,
  pageNumber: 1,
  name: null,
  status: null
};
const pageData = reactive({
  queryInfo,
  total: 0,
  loading: false
});

const onDelclass = id => {
  Modal.confirm({
    title: "确认要执行操作吗?",
    okText: "确认",
    cancelText: "取消",
    onOk() {
      delClass(id).then(res => {
        if (res.code == 1) {
          message.success("操作成功");
          getList();
        }
      });
    }
  });
};
const getList = async () => {
  try {
    pageData.loading = true;
    const { code, data, count } = await getClassList(pageData.queryInfo);
    if (code != 1) {
      return;
    }
    dataSource.value = data.map(v => {
      v.level = 1;
      if (v.partentId) {
        v.level = 2;
      }
      return v;
    });
    pageData.total = count;
  } finally {
    pageData.loading = false;
  }
};
const onEditclass = obj => {
  classify.value.showEditModal(obj);
};
const onAddclass = () => {
  classify.value.showAddModal();
};
const handlePageSizeChange = (current, size) => {
  pageData.queryInfo.pageNumber = 1;
  pageData.queryInfo.pageSize = size;
  getList();
};
const onChangePage = current => {
  pageData.queryInfo.pageNumber = current;
  getList();
};
const onChangeSearch = () => {
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

onMounted(() => {
  getList();
});

const statusMapFilter = type => {
  return statusMap[type];
};
</script>

<style></style>
