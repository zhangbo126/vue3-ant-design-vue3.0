<template>
  <a-row>
    <a-col :span="24">
      <a-card>
        <a-button type="primary" :style="{ margin: '10px 0px' }" @click="onAddclass">新增分类+</a-button>
        <!-- 查询区域 -->
        <ul class="query-handle">
          <li>
            <a-input style="width: 140px" v-model:value.trim="queryInfo.name" placeholder="分类名称" @keyup.enter="onChangeSearch" />
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
                  <a @click="onDelclass(record._id)">删除</a>
                </li>
                <li>
                  <a @click="onEditclass(record)">编辑</a>
                </li>
              </ul>
            </template>
          </template>
        </a-table>
      </a-card>
    </a-col>
    <!-- 新增编辑商品分类 -->
    <add-edit-class ref="classify" @refresh="refresh"></add-edit-class>
  </a-row>
</template>

<script>
const columns = [
  {
    title: "分类名称",
    dataIndex: "name",
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center",
  },
  {
    title: "分类图标",
    dataIndex: "logoFilePath",
    align: "center",
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
    width: 130,
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
export default {
  components: {
    AddEditClass
  },
  setup() {
    const data = ref([]);
    const classify = ref(null);
    const pageData = reactive({
      queryInfo: {
        pageSize: 10,
        pageNumber: 1,
        name: null,
        status: null
      },
      total: 0
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
    const getList = () => {
      getClassList(pageData.queryInfo).then(res => {
        if (res.code != 1) {
          return;
        }
        data.value = res.data.map(v => {
          v.level = 1;
          if (v.partentId) {
            v.level = 2;
          }
          return v;
        });

        pageData.total = res.count;
      });
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
      classify,
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
      onAddclass,
      onDelclass,
      onEditclass,
      refresh
    };
  }
};
</script>

<style></style>
