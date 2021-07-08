<template>
  <a-row>
    <a-col :span="24">
      <a-card>
        <a-button type="primary" :style="{ margin: '10px 0px' }" @click="addRole"
          >新增角色+</a-button
        >
        <a-table :dataSource="data" bordered rowKey="_id" :columns="columns">
          <template #status="{ text }">
            <div>
              {{ statusMapFilter(text) }}
            </div>
          </template>
          <template #action="{ text, record }">
            <a> 编辑 </a>
          </template>
        </a-table>
      </a-card>
    </a-col>
    <add-edit-user-role ref="role"></add-edit-user-role>
  </a-row>
</template>

<script>
import { getRoleList } from "@/api/UserCenter";
import AddEditUserRole from './userRole/AddEditUserRole.vue';

const statusMap = {
  0: "已停用",
  1: "使用中",
};
const columns = [
  {
    title: "角色名称",
    dataIndex: "name",
  },
  {
    title: "状态",
    dataIndex: "status",
    slots: {
      customRender: "status",
    },
  },
  {
    title: "角色描述",
    dataIndex: "describe",
  },
  {
    title: "角色权限",
    dataIndex: "name",
  },
  {
    title: "操作",
    dataIndex: "action",
    slots: {
      customRender: "action",
    },
  },
];
export default {
  components: { AddEditUserRole },
  data() {
    return {
      data: [],
      columns,
      statusMap,
      queryInfo: {
        pageSize: 10,
        pageNumber: 1,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //新增角色
    addRole() {
     
      this.$refs.role.showAddModal()
    },
    getList() {
      getRoleList(this.queryInfo).then((res) => {
        this.data = res.data;
      });
    },
    statusMapFilter(type) {
      return statusMap[type];
    },
  },
};
</script>

<style></style>
