<template>
  <a-row>
    <a-col :span="24">
      <a-card>
        <a-button type="primary" :style="{ margin: '10px 0px' }" @click="addAccount"
          >新增账号+</a-button
        >
        <a-table
          :dataSource="data"
          bordered
          rowKey="_id"
          :scroll="{ x: 1300 }"
          :columns="columns"
        >
          <template #status="{ text }">
            <div>
              {{ statusMapFilter(text) }}
            </div>
          </template>
          <template #action="{ text, record }">
            <ul class="table-action">
              <li><a @click="removeAccount(record._id)"> 删除 </a></li>
              <li v-if="record.status == 0">
                <a @click="setAccountStatus(record._id, 1)"> 启用 </a>
              </li>
              <li v-if="record.status == 1">
                <a @click="setAccountStatus(record._id, 0)"> 禁用 </a>
              </li>
              <li v-if="record.status == 1">
                <a @click="setRole(record)"> 定义角色 </a>
              </li>
              <li v-if="record.status == 1">
                <a @click="resultPass(record.id)"> 重置密码 </a>
              </li>
            </ul>
          </template>
        </a-table>
      </a-card>
    </a-col>
    <!-- 新增账户 -->
    <add-edit-account ref="account" @refresh="refresh"></add-edit-account>
    <!-- 定义角色 -->
    <definition-role ref="role" @refresh="refresh"></definition-role>
  </a-row>
</template>

<script>
import { getAccountList, delAccount, accountStatusSet,resultPassWord } from "@/api/UserCenter";
import { reactive, ref, toRefs, onMounted } from "vue";
import { Modal, message } from "ant-design-vue";
import moment from "moment";
import AddEditAccount from "./userAccount/AddEditAccount.vue";
import DefinitionRole from "./userAccount/DefinitionRole.vue";
const statusMap = {
  0: "已停用",
  1: "使用中",
};
const columns = [
  {
    title: "角色名称",
    dataIndex: "userAccount",
    align: "center",
    width: 140,
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center",
    width: 100,
    slots: {
      customRender: "status",
    },
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    align: "center",
    width: 220,
  },
  {
    title: "用户角色",
    dataIndex: "userRoleName",
    align: "center",
  },
  {
    title: "联系方式",
    dataIndex: "phone",
    align: "center",
    width: 120,
  },
  {
    title: "邮箱",
    dataIndex: "email",
    align: "center",
    width: 190,
  },
  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    width: 130,
    fixed: "right",
    slots: {
      customRender: "action",
    },
  },
];
export default {
  components: { AddEditAccount, DefinitionRole },
  setup() {
    const data = ref([]);
    const account = ref(null);
    const role = ref(null);
    const pageData = reactive({
      queryInfo: {
        pageSize: 10,
        pageNumber: 1,
      },
    });

    const getList = () => {
      getAccountList(pageData.queryInfo).then((res) => {
        data.value = res.data;
        data.value.forEach((v) => {
          v.userRoleName = v.userRoleName.join(",");
        });
      });
    };
    const refresh = () => {
      getList();
    };
    //新增账号
    const addAccount = () => {
      account.value.showAddModal();
    };
    //删除账号
    const removeAccount = (id) => {
      Modal.confirm({
        title: "确认要执行操作吗?",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          delAccount(id).then((res) => {
            if (res.code == 1) {
              message.success("操作成功");
              getList();
            }
          });
        },
      });
    };
    //设置账户状态
    const setAccountStatus = (id, status) => {
      Modal.confirm({
        title: "确认要执行操作吗?",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          accountStatusSet({ id, status }).then((res) => {
            if (res.code == 1) {
              message.success("操作成功");
              getList();
            }
          });
        },
      });
    };
    //定义角色
    const setRole = (obj) => {
      role.value.showModal(obj);
    };
    //重置密码
    const resultPass = (id) => {
      Modal.confirm({
        title: "确认要执行操作吗?",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          resultPassWord(id).then((res) => {
            if (res.code == 1) {
              message.success("操作成功");
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
      addAccount,
      removeAccount,
      account,
      role,
      moment,
      setAccountStatus,
      setRole,
      resultPass,
    };
  },
};
</script>


