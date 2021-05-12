<template>
  <div>
    <ul class="head-hander">
      <li>
        <a-input v-model:value="pageInfo.pageInfo.searchProperty[0].searchValue" />
      </li>
      <li>
        <a-input v-model:value="pageInfo.pageInfo.searchProperty[1].searchValue" />
      </li>
      <li>
        <a-input v-model:value="pageInfo.pageInfo.searchProperty[2].searchValue" />
      </li>
      <li>
        <a-input v-model:value="pageInfo.pageInfo.searchProperty[3].searchValue" />
      </li>
      <li>
        <a-input v-model:value="pageInfo.pageInfo.searchProperty[4].searchValue" />
      </li>
      <li>
        <a-input v-model:value="pageInfo.pageInfo.searchProperty[5].searchValue" />
      </li>
      <li>
        <a-input v-model:value="pageInfo.pageInfo.searchProperty[6].searchValue" />
      </li>
      <li>
        <a-input v-model:value="pageInfo.pageInfo.searchProperty[7].searchValue" />
      </li>
      <li>
        <a-input v-model:value="pageInfo.pageInfo.searchProperty[8].searchValue" />
      </li>
      <li>
        <a-button type="primary" @click="searchGoods">搜索</a-button>
      </li>
      <li>
        <a-button @click="searchReset">重置</a-button>
      </li>
    </ul>
    <a-table :dataSource="dataSource" :columns="columns" :scroll="{ x: 2000 }" bordered>
    </a-table>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive, ref, toRaw, onMounted } from "vue";

const columns = [
  {
    dataIndex: "serNo",
    title: "商品编号",
    align: "center",
    fixed: "left",
    width: 100,
  },
  {
    dataIndex: "status",
    title: "商品SKU状态",
    align: "center",
    width: 120,
    fixed: "left",
    scopedSlots: {
      customRender: "status",
    },
  },
  {
    dataIndex: "name",
    title: "商品信息",
    align: "center",
    scopedSlots: {
      customRender: "name",
    },
  },
  {
    dataIndex: "price",
    align: "center",
    width: 250,
    scopedSlots: {
      customRender: "price",
    },
    slots: {
      title: "priceSort",
    },
  },
  {
    dataIndex: "attribute",
    title: "商品属性",
    align: "center",
    width: 260,
    scopedSlots: {
      customRender: "attribute",
    },
  },
  {
    dataIndex: "keyWords",
    title: "商品关键词",
    align: "center",
    width: 160,
  },
  {
    dataIndex: "sendGoodsDay",
    title: "商品交货期(天)",
    align: "center",
    scopedSlots: {
      customRender: "sendGoodsDay",
    },
    width: 130,
  },

  {
    dataIndex: "createUserName",
    title: "添加用户",
    align: "center",
    width: 140,
  },
  {
    dataIndex: "lastEditUserName",
    title: "最后操作用户",
    align: "center",
    width: 120,
  },
  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    fixed: "right",
    width: "200px",
    slots: {
      customRender: "action",
    },
  },
];

export default defineComponent({
  setup(props, context) {
    const formRef = ref();
    const dataSource = ref([1]);

    const pageInfo = reactive({
      pageInfo: {
        orderProperty: [],
        pageNumber: 1,
        pageSize: 10,
        searchProperty: [
          {
            searchFiled: "serNo",
            searchValue: "",
          },
          {
            searchFiled: "goodsNo",
            searchValue: "",
          },
          {
            searchFiled: "mixNo",
            searchValue: "",
          },
          {
            searchFiled: "goodsName",
            searchValue: "",
          },

          {
            searchFiled: "mixName",
            searchValue: "",
          },
          {
            searchFiled: "categoryName",
            searchValue: "",
          },
          {
            searchFiled: "brandName",
            searchValue: "",
          },
          {
            searchFiled: "styleName",
            searchValue: "",
          },
          {
            searchFiled: "seriesName",
            searchValue: "",
          },
          {
            searchFiled: "statusEasy",
            searchValue: undefined,
          },
          {
            searchFiled: "createUserName",
            searchValue: "",
          },
          {
            searchFiled: "lastEditUserName",
            searchValue: "",
          },
        ],
        orderProperty: [
          {
            orderFiled: "salePrice",
            orderDirection: "", //asc
          },
        ],
      },
    });

    const rules = {
      name: [
        {
          required: true,
          message: "Please input Activity name",
          trigger: "blur",
        },
        {
          min: 3,
          max: 5,
          message: "Length should be 3 to 5",
          trigger: "blur",
        },
      ],
      region: [
        {
          required: true,
          message: "Please select Activity zone",
          trigger: "change",
        },
      ],
      date1: [
        {
          required: true,
          message: "Please pick a date",
          trigger: "change",
          type: "object",
        },
      ],
      type: [
        {
          type: "array",
          required: true,
          message: "Please select at least one activity type",
          trigger: "change",
        },
      ],
      resource: [
        {
          required: true,
          message: "Please select activity resource",
          trigger: "change",
        },
      ],
      desc: [
        {
          required: true,
          message: "Please input activity form",
          trigger: "blur",
        },
      ],
    };

    const getList = () => {};

    const searchGoods = () => {
      pageInfo.pageInfo.pageNumber = 1;
      getList();
    };
    const searchReset = () => {
      pageInfo.pageInfo.pageNumber = 1;
      pageInfo.pageInfo.pageSize = 10;
      pageInfo.pageInfo.searchProperty.forEach((v) => {
        v.searchValue = undefined;
      });
      getList();
    };
    const onChange = (current) => {
      pageInfo.pageInfo.pageNumber = current;
      getList();
    };
    const showSizeChange = (current, pageSize) => {
      pageInfo.pageInfo.pageSize = pageSize;
      pageInfo.pageInfo.pageNumber = 1;

      getList();
    };
    onMounted(() => {
      getList();
    });
    const resetForm = () => {
      formRef.value.resetFields();
    };
    return {
      formRef,
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      rules,
      resetForm,
      columns,
      searchGoods,
      searchReset,
      pageInfo,
      onChange,
      showSizeChange,
      dataSource,
    };
  },
});
</script>

<style scoped lang="less">
.head-hander {
  display: flex;
  list-style: none;
  margin-top: 20px;
  li {
    margin-right: 8px;
  }
}
</style>
