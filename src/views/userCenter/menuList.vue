<template>
  <a-row>
    <a-col :span="24">
      <a-button type="primary" :style="{ margin: '10px 0px' }" @click="addMenu">新增菜单+</a-button>
      <a-table :dataSource="data" bordered rowKey="_id" :columns="columns" :scroll="{ x: 1400 }">
        <template #bodyCell="{ column, text,record }">
          <template v-if="column.dataIndex === 'status'">
            <div>{{ statusMapFilter(text) }}</div>
          </template>
          <template v-if="column.dataIndex === 'icon'">
            <component :is="$antIcons[text]" />
          </template>
          <template v-if="column.dataIndex === 'action'">
            <a-button type="link" @click="editMenu(record)">编辑</a-button>
            <a-button type="link" @click="removeMenu(record._id)">删除</a-button>
          </template>
        </template>
      </a-table>
    </a-col>
    <add-edit-menu ref="menu" @refresh="getList"></add-edit-menu>
  </a-row>
</template>

<script setup>
import { getMenuTree, removeMenuTree } from "@/api/UserCenters";
import AddEditMenu from "./menuList/AddEditMenu.vue";
import { reactive, ref, toRefs, onMounted } from "vue";
import { Modal, message } from "ant-design-vue";
const statusMap = {
  0: "已停用",
  1: "使用中"
};
const columns = [
  {
    title: "菜单名称",
    dataIndex: "name",
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "status",
    width: 120,
    align: "center"
    // slots: {
    //   customRender: "status"
    // }
  },
  {
    title: "使用组件",
    width: 120,
    dataIndex: "component",
    align: "center"
  },
  {
    title: "路由地址",
    dataIndex: "url",
    align: "center"
  },
  {
    title: "路由重定向地址",
    dataIndex: "redirectUrl",
    align: "center"
  },
  {
    title: "唯一标识",
    width: 130,
    dataIndex: "key",
    align: "center"
  },
  {
    title: "排序",
    width: 130,
    dataIndex: "sort",
    align: "center"
  },
  {
    title: "图标",
    width: 130,
    dataIndex: "icon",
    align: "center"
    // slots: {
    //   customRender: "icon"
    // }
  },
  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    fixed: "right",
    width: 120
    // slots: {
    //   customRender: "action"
    // }
  }
];
const data = ref([]);
const menu = ref(null);
const pageData = reactive({
  queryInfo: {
    pageSize: 10000,
    pageNumber: 1
  }
});

const getList = async () => {
  const res = await getMenuTree(pageData.queryInfo);
  data.value = res.data;
  setMenuChildren(data.value);
};
//处理菜单数据
const setMenuChildren = data => {
  data.forEach(v => {
    if (v.children.length) {
      setMenuChildren(v.children);
    } else {
      delete v.children;
    }
  });
};
//新增角色
const addMenu = () => {
  menu.value.showAddModal();
};
const editMenu = obj => {
  menu.value.showEditModal(obj);
};
const removeMenu = id => {
  Modal.confirm({
    title: "确认要执行操作吗?",
    okText: "确认",
    cancelText: "取消",
    onOk() {
      removeMenuTree(id).then(res => {
        if (res.code == 1) {
          message.success("操作成功");
          getList();
        }
      });
    }
  });
};
const statusMapFilter = type => {
  return statusMap[type];
};
onMounted(() => {
  getList();
});
</script>

<style></style>
