<template>
  <a-row>
    <a-col :span="24">
      <a-button type="primary" v-auth="['Btn_Add_Account']" :style="{ margin: '10px 0px' }" @click="addAccount">新增账号+</a-button>
      <ul class="query-handle">
        <li>
          <a-input style="width: 140px" v-model:value.trim="pageData.queryInfo.userAccount" placeholder="账号" @keyup.enter="onSearch" />
        </li>
        <li>
          <a-input style="width: 140px" v-model:value.trim="pageData.queryInfo.email" placeholder="邮箱" @keyup.enter="onSearch" />
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
      <z-table :dataSource="data" bordered rowKey="_id" :scroll="{ x: 1300 }" :columns="columns" v-model:pageNumber="pageData.queryInfo.pageNumber" v-model:pageSize="pageData.queryInfo.pageSize" v-model:total="pageData.total" @onPagination="onPagination">
        <template #bodyCell="{ column, text,record }">
          <template v-if="column.dataIndex === 'status'">
            <div>{{ statusMapFilter(text) }}</div>
          </template>
          <template v-if="column.dataIndex === 'action'">
            <a-button type="link" v-if="record.status == 0" v-auth="['Btn_Delete_Account']" @click="removeAccount(record._id)">删除</a-button>
            <a-button type="link" v-if="record.status == 1" v-auth="['Btn_Edit_Account']" @click="setAccountStatus(record._id)">启用</a-button>
            <a-button type="link" v-if="record.status == 1" v-auth="['Btn_Edit_Account']" @click="setAccountStatus(record._id)">禁用</a-button>
            <a-button type="link" v-if="record.status == 1" v-auth="['Btn_Edit_Account']" @click="setRole(record)">定义角色</a-button>
            <a-button type="link" v-if="record.status == 1" v-auth="['Btn_Edit_Account']" @click="resultPass(record._id)">重置密码</a-button>
          </template>
        </template>
      </z-table>
    </a-col>
    <!-- 新增账户 -->
    <add-edit-account ref="account" @refresh="getList"></add-edit-account>
    <!-- 定义角色 -->
    <definition-role ref="role" @refresh="getList"></definition-role>
  </a-row>
</template>

<script setup>
import {
  getAccountList,
  delAccount,
  accountStatusSet,
  resultPassWord
} from "@/api/UserCenters";
import { reactive, ref, toRefs, onMounted } from "vue";
import { Modal, message } from "ant-design-vue";
import moment from "moment";
import AddEditAccount from "./userAccount/AddEditAccount.vue";
import DefinitionRole from "./userAccount/DefinitionRole.vue";
const statusMap = {
  0: "已停用",
  1: "使用中"
};
const columns = [
  {
    title: "账号",
    dataIndex: "userAccount",
    align: "center",
    width: 140
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center",
    width: 100
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    align: "center",
    width: 220
  },
  {
    title: "用户角色",
    dataIndex: "userRoleName",
    align: "center"
  },
  {
    title: "联系方式",
    dataIndex: "phone",
    align: "center",
    width: 140
  },
  {
    title: "邮箱",
    dataIndex: "email",
    align: "center",
    width: 190
  },
  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    width: 130,
    fixed: "right"
  }
];
const data = ref([]);
const account = ref(null);
const role = ref(null);
const pageData = reactive({
  queryInfo: {
    pageSize: 10,
    pageNumber: 1,
    userAccount: null,
    email: null,
    status: null
  },
  total: 0
});
//获取账号列表
const getList = async () => {
  const res = await getAccountList(pageData.queryInfo);

  data.value = res.data;
  pageData.total = res.count;
  data.value.forEach(v => {
    v.userRoleName = v.userRoleName.join(",");
  });
};

//新增账号
const addAccount = () => {
  account.value.showAddModal();
};
//删除账号
const removeAccount = id => {
  Modal.confirm({
    title: "确认要执行操作吗?",
    okText: "确认",
    cancelText: "取消",
    onOk() {
      delAccount(id).then(res => {
        if (res.code == 1) {
          message.success("操作成功");
          getList();
        }
      });
    }
  });
};
//设置账户状态
const setAccountStatus = (id, status) => {
  Modal.confirm({
    title: "确认要执行操作吗?",
    okText: "确认",
    cancelText: "取消",
    onOk() {
      accountStatusSet({ id, status }).then(res => {
        if (res.code == 1) {
          message.success("操作成功");
          getList();
        }
      });
    }
  });
};
//定义角色
const setRole = obj => {
  role.value.showModal(obj);
};
//重置密码
const resultPass = id => {
  Modal.confirm({
    title: "确认要执行操作吗?",
    okText: "确认",
    cancelText: "取消",
    onOk() {
      resultPassWord(id).then(res => {
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
    userAccount: null,
    email: null,
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
</style>
