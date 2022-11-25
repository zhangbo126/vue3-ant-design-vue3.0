<template>
  <a-row>
    <a-col :span="24">
        <a-button type="primary" :style="{ margin: '10px 0px' }" v-auth="['Btn_Add_Role']" @click="addRole">新增角色+</a-button>
        <ul class="query-handle">
          <li>
            <a-input style="width: 140px" v-model:value.trim="pageData.queryInfo.name" placeholder="角色名称" @keyup.enter="onSearch" />
          </li>
          <li>
            <a-select style="width: 140px" v-model:value="pageData.queryInfo.status" placeholder="角色状态" @change="onSearch">
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
        <z-table
          :dataSource="dataSource"
          bordered
          rowKey="_id"
          :columns="columns"
          :scroll="{ x: 1000 }"
          v-model:pageNumber="pageData.queryInfo.pageNumber" v-model:pageSize="pageData.queryInfo.pageSize" v-model:total="pageData.total" @onPagination="onPagination"
        >
          <template #bodyCell="{ column, text,record }">
            <template v-if="column.dataIndex === 'status'">
              <div>{{ statusMapFilter(text) }}</div>
            </template>
            <template v-if="column.dataIndex === 'action'">
              <a-button type="link" v-auth="['Btn_Edit_Role']" @click="editRole(record)">编辑</a-button>
              <a-button type="link" v-auth="['Btn_Delete_Role']" @click="delRole(record._id)">删除</a-button>
            </template>
          </template>
        </z-table>
    </a-col>
    <add-edit-user-role ref="role" @refresh="getList"></add-edit-user-role>
  </a-row>
</template>

<script setup>
import { getRoleList, removeRole } from "@/api/UserCenters";
import AddEditUserRole from "./userRole/AddEditUserRole.vue";
import { reactive, ref, toRefs, onMounted } from "vue";
import { Modal, message } from "ant-design-vue";
const statusMap = {
  0: "已停用",
  1: "使用中"
};
const columns = [
  {
    title: "角色名称",
    dataIndex: "name",
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center",
    width: 120
  },
  {
    title: "角色描述",
    dataIndex: "describe",
    align: "center"
  },
  {
    title: "角色权限",
    dataIndex: "roleMenuName_List",
    align: "center"
  },
  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    width: 100,
    fixed: "right"
  }
];
const dataSource = ref([]);
const role = ref(null);
const pageData = reactive({
  queryInfo: {
    pageSize: 10,
    pageNumber: 1,
    name: null,
    status: null
  },
  total: 0
});

const getList = async () => {
  const res = await getRoleList(pageData.queryInfo);
  dataSource.value = res.data;
  dataSource.value.forEach(v => {
    v.roleMenuName_List = v.roleMenuName_List.join(",");
  });
  pageData.total = res.count;
};

const addRole = () => {
  role.value.showAddModal();
};
const editRole = obj => {
  role.value.showEditModal(obj);
};
const delRole = id => {
  Modal.confirm({
    title: "确认要执行操作吗?",
    okText: "确认",
    cancelText: "取消",
    onOk() {
      removeRole(id).then(res => {
        if (res.code == 1) {
          message.success("操作成功");
          getList();
        }
      });
    }
  });
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
<style scoped lang="less">
.query-handle {
  display: flex;
  li {
    margin-right: 8px;
  }
}
</style>
