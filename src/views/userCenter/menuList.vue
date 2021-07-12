<template>
  <a-row>
    <a-col :span="24">
      <a-card>
        <a-button type="primary" :style="{ margin: '10px 0px' }" @click="addMenu"
          >新增菜单+</a-button
        >
        <a-table :dataSource="data" bordered rowKey="_id" :columns="columns">
          <template #status="{ text }">
            <div>
              {{ statusMapFilter(text) }}
            </div>
          </template>
          <template #action="{ text, record }">
             <ul>
                <li><a @click="editMenu(record)"> 编辑 </a></li>
                <li><a @click="editMenu(record)"> 删除 </a></li>
             </ul>
          </template>
        </a-table>
      </a-card>
    </a-col>
    <add-edit-menu ref="menu" @refresh="refresh"></add-edit-menu>
  </a-row>
</template>

<script>
import { getMenuTree } from "@/api/UserCenter";
import AddEditMenu from './menuList/AddEditMenu.vue';

const statusMap = {
  0: "已停用",
  1: "使用中",
};
const columns = [
  {
    title: "菜单名称",
    dataIndex: "name",
    align:'center'
  },
  {
    title: "状态",
    dataIndex: "status",
    align:'center',
    slots: {
      customRender: "status",
    },
  },
  {
    title: "使用组件",
    dataIndex: "component",
    align:'center',
  },
  {
    title: "路由地址",
    dataIndex: "url",
    align:'center',
  },
  {
    title: "路由重定向地址",
    dataIndex: "redirectUrl",
    align:'center',
  },
  {
    title: "唯一标识",
    dataIndex: "key",
    align:'center',
  },
  {
    title: "排序",
    dataIndex: "sort",
    align:'center',
  },
  {
    title: "操作",
    dataIndex: "action",
    align:'center',
    slots: {
      customRender: "action",
    },
  },
];
export default {
  components: { AddEditMenu },
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
    addMenu() {
      this.$refs.menu.showAddModal();
    },
    //编辑
    editMenu(obj){
     this.$refs.menu.showEditModal(obj); 
    },
    getList() {
      getMenuTree(this.queryInfo).then((res) => {
        this.data = res.data;

      });
    },
    statusMapFilter(type) {
      return statusMap[type];
    },
    refresh(){
        this.getList()
    }
  },
};
</script>

<style></style>
