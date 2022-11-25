<template>
  <a-row>
    <a-col :span="24">
      <a-button type="primary" :style="{ margin: '10px 0px' }" @click="onAddbrand">新增品牌+</a-button>
      <!-- 查询区域 -->
      <ul class="query-handle">
        <li>
          <a-input style="width: 140px" v-model:value.trim="pageData.queryInfo.name" placeholder="品牌名称" @keyup.enter="onSearch" />
        </li>
        <li>
          <a-select style="width: 140px" v-model:value="pageData.queryInfo.status" placeholder="状态" @change="onSearch">
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
      <z-table :dataSource="data" bordered rowKey="_id" :columns="columns" v-model:pageNumber="pageData.queryInfo.pageNumber" v-model:pageSize="pageData.queryInfo.pageSize" v-model:total="pageData.total" @onPagination="onPagination">
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
            <a-button type="link" @click="onDelbrand(record._id)">删除</a-button>
            <a-button type="link" @click="onEditbrand(record)">编辑</a-button>
          </template>
        </template>
      </z-table>
    </a-col>
    <!-- 新增编辑商品品牌-->
    <add-edit-brand ref="brand" @refresh="getList"></add-edit-brand>
  </a-row>
</template>

<script setup>
const columns = [
  {
    title: "品牌名称",
    dataIndex: "name",
    align: "center",
    width: 140
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center",
    width: 110
  },
  {
    title: "品牌图标",
    dataIndex: "logoFilePath",
    align: "center"
  },
  {
    title: "排序",
    dataIndex: "sort",
    align: "center",
    width: 120
  },
  {
    title: "描述",
    dataIndex: "introduce",
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
import { getBrandList, delBrand } from "@/api/commodityCenter";
import AddEditBrand from "./commodityBrand/AddEditBrand.vue";
import { Modal, message } from "ant-design-vue";
const data = ref([]);
const brand = ref(null);
const pageData = reactive({
  queryInfo: {
    pageSize: 10,
    pageNumber: 1,
    name: null,
    status: null
  },
  total: 0
});

const onDelbrand = id => {
  Modal.confirm({
    title: "确认要执行操作吗?",
    okText: "确认",
    cancelText: "取消",
    onOk() {
      delBrand(id).then(res => {
        if (res.code == 1) {
          message.success("操作成功");
          getList();
        }
      });
    }
  });
};
const getList = () => {
  getBrandList(pageData.queryInfo).then(res => {
    if (res.code != 1) {
      return;
    }
    data.value = res.data;
    pageData.total = res.count;
  });
};
const onEditbrand = obj => {
  brand.value.showEditModal(obj);
};
const onAddbrand = () => {
  brand.value.showAddModal();
};

const onPagination = () => {
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
