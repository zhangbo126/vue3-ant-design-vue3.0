<template>
  <a-row>
    <a-col :span="24">
      <a-card>
        <a-button type="primary" :style="{ margin: '10px 0px' }" @click="onAddbrand">新增品牌+</a-button>
        <!-- 查询区域 -->
        <ul class="query-handle">
          <li>
            <a-input style="width: 140px" v-model:value.trim="queryInfo.name" placeholder="品牌名称" @keyup.enter="onChangeSearch" />
          </li>
          <li>
            <a-select style="width: 140px" v-model:value="queryInfo.status" placeholder="状态" @change="onChangeSearch">
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
            <template v-if="column.dataIndex === 'logoFilePath'">
              <div>
                <img :src="text" width="120" alt />
              </div>
            </template>
            <template v-if="column.dataIndex === 'action'">
              <ul class="table-action">
                <li>
                  <a @click="onDelbrand(record._id)">删除</a>
                </li>
                <li>
                  <a @click="onEditbrand(record)">编辑</a>
                </li>
              </ul>
            </template>
          </template>
        </a-table>
      </a-card>
    </a-col>
    <!-- 新增编辑商品品牌-->
    <add-edit-brand ref="brand" @refresh="refresh"></add-edit-brand>
  </a-row>
</template>

<script>
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
export default {
  components: {
    AddEditBrand
  },
  setup() {
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
    const refresh = () => {
      getList();
    };
    onMounted(() => {
      getList();
    });

    const statusMapFilter = type => {
      return statusMap[type];
    };

    return {
      brand,
      columns,
      statusMap,
      data,
      ...toRefs(pageData),
      statusMapFilter,
      onChangeSearch,
      handlePageSizeChange,
      onChangePage,
      onSearch,
      onResult,
      onAddbrand,
      onDelbrand,
      onEditbrand,
      refresh
    };
  }
};
</script>

<style></style>
