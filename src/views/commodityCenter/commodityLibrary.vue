<template>
  <a-row>
    <a-col :span="24">
      <a-card>
        <a-button
          type="primary"
          :style="{ margin: '10px 0px' }"
          @click="onAddgoods"
        >
          新增商品+
        </a-button>
        <!-- 查询区域 -->
        <ul class="query-handle">
          <li>
            <a-input
              style="width: 140px"
              v-model:value.trim="queryInfo.goodsName"
              placeholder="商品名称"
              @keyup.enter="onChangeSearch"
            />
          </li>
          <li>
            <a-input
              style="width: 140px"
              v-model:value.trim="queryInfo.brandName"
              placeholder="品牌名称"
              @keyup.enter="onChangeSearch"
            />
          </li>
          <li>
            <a-input
              style="width: 140px"
              v-model:value.trim="queryInfo.categoryName"
              placeholder="分类名称"
              @keyup.enter="onChangeSearch"
            />
          </li>
          <li>
            <a-input
              style="width: 140px"
              v-model:value.trim="queryInfo.goodsNo"
              placeholder="商品货号"
              @keyup.enter="onChangeSearch"
            />
          </li>
          <li>
            <a-input
              style="width: 140px"
              v-model:value.trim="queryInfo.skuName"
              placeholder="规格名称"
              @keyup.enter="onChangeSearch"
            />
          </li>
          <li>
            <a-select
              style="width: 140px"
              v-model:value="queryInfo.status"
              placeholder="状态"
              @change="onChangeSearch"
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
        <!-- 表内容 -->
        <a-table
          :dataSource="data"
          bordered
          rowKey="_id"
          :columns="columns"
          :pagination="false"
        >
          <template #logoFilePath="{ text }">
            <div>
              <img :src="text" width="120" alt="" />
            </div>
          </template>
          <template #action="{ text, record }">
            <ul class="table-action">
              <li>
                <a @click="onEditGoods(record)">编辑</a>
              </li>
            </ul>
          </template>
        </a-table>

        <a-pagination
          size="small"
          :total="total"
          @change="onChangePage"
          @showSizeChange="handlePageSizeChange"
          :show-total="(total) => `总计${total}`"
          :pageSize="queryInfo.pageSize"
          :current="queryInfo.pageNumber"
          show-size-changer
          show-quick-jumper
        />
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
const columns = [
  {
    title: "商品货号",
    dataIndex: "goodsNo",
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
    title: "商品信息",
    dataIndex: "goodsName",
    align: "center",
    slots: {
      customRender: "goodsName",
    },
  },
  {
    title: "品牌名称",
    dataIndex: "brandName",
    align: "center",
  },
  {
    title: "分类名称",
    dataIndex: "categoryName",
    align: "center",
  },
  {
    title: "规格名称",
    dataIndex: "skuName",
    align: "center",
  },
  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    width: 130,
    slots: {
      customRender: "action",
    },
  },
];
import { getGoodsList } from "@/api/commodityCenter";
import { reactive, toRefs, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import $urls from "@/utils/routerPath";
export default {
  setup(props, context) {
    const data = ref([]);
    const pageData = reactive({
      queryInfo: {
        pageSize: 10,
        pageNumber: 1,
        goodsName: null,
        status: null,
        categoryName: null,
        brandName: null,
        goodsNo: null,
        skuName: null,
      },
      total: 0,
    });
    const router = useRouter();

    const getList = () => {
      getGoodsList(pageData.queryInfo).then((res) => {
        if (res.code != 1) {
          return;
        }
        data.value = res.data;
        pageData.total = res.count;
      });
    };
    //新增
    const onAddgoods = () => {
      router.push({ path: $urls.Add_Edit_Commodity_Library });
    };
    //编辑
    const onEditGoods = (record) => {
      router.push({
        path: $urls.Add_Edit_Commodity_Library,
        query: { goodsId: record.goodsId },
      });
    };

    const handlePageSizeChange = (current, size) => {
      pageData.queryInfo.pageNumber = 1;
      pageData.queryInfo.pageSize = size;
      getList();
    };
    const onChangePage = (current) => {
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
        pageSize: 10,
        pageNumber: 1,
        goodsName: null,
        status: null,
        categoryName: null,
        brandName: null,
        goodsNo: null,
        skuName: null,
      });
      getList();
    };
    const refresh = () => {
      getList();
    };
    onMounted(() => {
      getList();
    });
    return {
      columns,
      data,
      ...toRefs(pageData),
      onAddgoods,
      onEditGoods,
      onChangeSearch,
      handlePageSizeChange,
      onChangePage,
      onSearch,
      onResult,
      refresh,
    };
  },
};
</script>

<style></style>
