<template>
  <a-row>
    <a-col :span="24">
      <a-card>
        <a-button type="primary" :style="{ margin: '10px 0px' }" @click="addRole"
          >新增角色+</a-button
        >
        <ul class="query-handle">
          <li>
            <a-input
              style="width: 140px"
              v-model:value.trim="queryInfo.name"
              placeholder="角色名称"
              @keyup.enter="onChangeStatus"
            />
          </li>
          <li>
            <a-select
              style="width: 140px"
              v-model:value="queryInfo.status"
              placeholder="角色状态"
              @change="onChangeStatus"
            >
              <a-select-option key="1" :value="1">使用中 </a-select-option>
              <a-select-option key="2" :value="0">已停用 </a-select-option>
            </a-select>
          </li>
          <li>
            <a-space>
              <a-button @click="onSearch" type="primary">搜索</a-button>
              <a-button @click="onResult">重置</a-button>
            </a-space>
          </li>
        </ul>

        <a-table
          :dataSource="data"
          bordered
          rowKey="_id"
          :columns="columns"
          :scroll="{ x: 1000 }"
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
             <template v-if="column.dataIndex === 'action'">
               <ul class="table-action">
                 <li><a @click="editRole(record)"> 编辑 </a></li>
                 <li><a @click="delRole(record._id)"> 删除 </a></li>
              </ul>
            </template>
          </template>
        </a-table>
      </a-card>
    </a-col>
    <add-edit-user-role ref="role" @refresh="refresh"></add-edit-user-role>
  </a-row>
</template>

<script>
import { getRoleList, removeRole } from "@/api/UserCenter";
import AddEditUserRole from "./userRole/AddEditUserRole.vue";
import { reactive, ref, toRefs, onMounted } from "vue";
import { Modal, message } from "ant-design-vue";
const statusMap = {
  0: "已停用",
  1: "使用中",
};
const columns = [
  {
    title: "角色名称",
    dataIndex: "name",
    align: "center",
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center",
    width: 120,
  },
  {
    title: "角色描述",
    dataIndex: "describe",
    align: "center",
  },
  {
    title: "角色权限",
    dataIndex: "roleMenuName_List",
    align: "center",
  },
  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    width: 100,
    fixed: "right",
  },
];
export default {
  components: { AddEditUserRole },
  setup() {
    const data = ref([]);
    const role = ref(null);
    const pageData = reactive({
      queryInfo: {
        pageSize: 10,
        pageNumber: 1,
        name: null,
        status: null,
      },
      total: 0,
    });

    const getList = () => {
      getRoleList(pageData.queryInfo).then((res) => {
        data.value = res.data;
        data.value.forEach((v) => {
          v.roleMenuName_List = v.roleMenuName_List.join(",");
        });
        pageData.total = res.count;
      });
    };
    const refresh = () => {
      getList();
    };
    const addRole = () => {
      role.value.showAddModal();
    };
    const editRole = (obj) => {
      role.value.showEditModal(obj);
    };
    const delRole = (id) => {
      Modal.confirm({
        title: "确认要执行操作吗?",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          removeRole(id).then((res) => {
            if (res.code == 1) {
              message.success("操作成功");
              getList();
            }
          });
        },
      });
    };

    const onChangePage = (current) => {
      pageData.queryInfo.pageNumber = current;
      getList();
    };
    const handlePageSizeChange = (current, size) => {
      pageData.queryInfo.pageNumber = 1;
      pageData.queryInfo.pageSize = size;
      getList();
    };
    const onChangeStatus = () => {
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
        status: null,
      });
      getList();
    };

    onMounted(() => {
      getList();
    });

    const statusMapFilter = (type) => {
      return statusMap[type];
    };
    return {
      columns,
      statusMap,
      data,
      ...toRefs(pageData),
      statusMapFilter,
      refresh,
      getList,
      addRole,
      editRole,
      delRole,
      role,
      onChangePage,
      onChangeStatus,
      handlePageSizeChange,
      onSearch,
      onResult,
    };
  },
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
