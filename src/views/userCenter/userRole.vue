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
            <ul class="table-action">
              <li><a @click="editRole(record)"> 编辑 </a></li>
              <li><a @click="delRole(record._id)"> 删除 </a></li>
            </ul>
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
import { Modal ,message} from "ant-design-vue";
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
    slots: {
      customRender: "status",
    },
  },
  {
    title: "角色描述",
    dataIndex: "describe",
    align: "center",
  },
  {
    title: "角色权限",
    dataIndex: "name",
    align: "center",
  },
  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    slots: {
      customRender: "action",
    },
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
      },
    });

    const getList = () => {
      getRoleList(pageData.queryInfo).then((res) => {
        data.value = res.data;
      });
    };
    const refresh = () => {
      getList();
    };
    const addRole = () => {
      // this.$refs.role.showAddModal();
      role.value.showAddModal();
    };
    const editRole = (obj) => {
      role.value.showEditModal(obj);
    };
    const delRole = (id) => {
      //  removeRole(id).then()
      Modal.confirm({
        title: "确认要执行操作吗?",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          removeRole(id).then((res) => {
            if (res.code == 1) {
              message.success('操作成功')
              getList();
            }
          });
        },
      });
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
    };
  },
};
</script>

<style></style>
