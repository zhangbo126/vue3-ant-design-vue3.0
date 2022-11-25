<template>
  <a-row>
    <a-col :span="24">
      <a-button type="primary" :style="{ margin: '10px 0px' }" v-auth="['Btn_Add_Goods']" @click="onAddgoods">新增商品+</a-button>
      <!-- 查询区域 -->
      <ul class="query-handle">
        <li>
          <a-input style="width: 140px" v-model:value.trim="pageData.queryInfo.goodsName" placeholder="商品名称" @keyup.enter="onChangeSearch" />
        </li>
        <li>
          <a-input style="width: 140px" v-model:value.trim="pageData.queryInfo.brandName" placeholder="品牌名称" @keyup.enter="onChangeSearch" />
        </li>
        <li>
          <a-input style="width: 140px" v-model:value.trim="pageData.queryInfo.categoryName" placeholder="分类名称" @keyup.enter="onChangeSearch" />
        </li>
        <li>
          <a-input style="width: 140px" v-model:value.trim="pageData.queryInfo.goodsNo" placeholder="商品货号" @keyup.enter="onChangeSearch" />
        </li>
        <li>
          <a-input style="width: 140px" v-model:value.trim="pageData.queryInfo.skuName" placeholder="规格名称" @keyup.enter="onChangeSearch" />
        </li>
        <li>
          <a-input style="width: 140px" v-model:value.trim="pageData.queryInfo.placeOrigin" placeholder="产地" @keyup.enter="onChangeSearch" />
        </li>
        <li>
          <a-select v-model:value="pageData.queryInfo.goodsType" placeholder="商品类型" style="width: 160px" @change="onChangeSearch" show-search>
            <a-select-option :value="1">普通商品</a-select-option>
            <a-select-option :value="2">秒杀商品</a-select-option>
            <a-select-option :value="3">团购商品</a-select-option>
          </a-select>
        </li>
        <li>
          <a-space>
            <a-button @click="onChangeSearch" type="primary">搜索</a-button>
            <a-button @click="onResult">重置</a-button>
          </a-space>
        </li>
      </ul>
      <!-- 表内容 -->
      <z-table :dataSource="dataSource" bordered rowKey="_id" :columns="columns" :scroll="{x:1400}" v-model:pageNumber="pageData.queryInfo.pageNumber" v-model:pageSize="pageData.queryInfo.pageSize" v-model:total="pageData.total" @onPagination="onPagination">
        <template #bodyCell="{ column, text,record }">
          <template v-if="column.dataIndex === 'status'">
            <div v-if="text == 1">在售</div>
          </template>
          <template v-if="column.dataIndex === 'goodsName'">
            <div class="goods-info">
              <div class="sku-img">
                <a :href="record.designSketch" target="_brank">
                  <img :src="record.designSketch" width="100" height="100" alt />
                </a>
              </div>
              <ul class="info">
                <li>
                  <span class="lable">商品名称:</span>
                  <span>{{ record.goodsName }}</span>
                </li>
                <li>
                  <span class="lable">SKU名称:</span>
                  <span>{{ record.skuName }}</span>
                </li>
                <li>
                  <span class="lable">SKU规格:</span>
                  <span>
                    {{
                    goodsSkuSet(
                    record.specValue1,
                    record.specValue2,
                    record.specValue3,
                    record.specValue4
                    )
                    }}
                  </span>
                </li>
                <li>
                  <span class="lable">商品重量:</span>
                  <span>{{ record.weight }}(g)</span>
                </li>
                <li>
                  <span class="lable">商品产地:</span>
                  <span>{{ record.placeOrigin }}</span>
                </li>
                <li>
                  <span class="lable">商品类型:</span>
                  <span v-if="record.goodsType == 1">普通商品</span>
                  <span v-if="record.goodsType == 2">秒杀商品</span>
                  <span v-if="record.goodsType == 3">团购商品</span>
                </li>
              </ul>
            </div>
          </template>
          <template v-if="column.dataIndex === 'logoFilePath'">
            <div>
              <img :src="text" width="120" alt />
            </div>
          </template>
          <template v-if="column.dataIndex === 'action'">
            <a-button v-auth="['Btn_Edit_Goods']" type="link" @click="onEditGoods(record)">编辑</a-button>
            <a-button v-auth="['Btn_Edit_Goods']" type="link" @click="setGoodsDetail(record)">设置商品详情</a-button>
          </template>
        </template>
      </z-table>
    </a-col>
  </a-row>
</template>

<script setup>
const columns = [
  {
    title: "商品货号",
    dataIndex: "goodsNo",
    align: "center",
    width: 110
  },

  {
    title: "状态",
    dataIndex: "status",
    align: "center",
    width: 80
  },
  {
    title: "规格名称",
    dataIndex: "skuName",
    align: "center"
  },
  {
    title: "商品信息",
    dataIndex: "goodsName",
    align: "center"
  },
  {
    title: "品牌名称",
    dataIndex: "brandName",
    align: "center",
    width: 140
  },
  {
    title: "分类名称",
    dataIndex: "categoryName",
    align: "center",
    width: 140
  },

  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    fixed: "right",
    width: 130
  }
];
import { getGoodsList } from "@/api/commodityCenter";
import { reactive, toRefs, ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
const dataSource = ref([]);
const pageData = reactive({
  queryInfo: {
    pageSize: 10,
    pageNumber: 1,
    goodsName: null,
    categoryName: null,
    brandName: null,
    goodsNo: null,
    skuName: null,
    placeOrigin: null,
    goodsType: null
  },
  total: 0
});
const router = useRouter();
const { proxy } = getCurrentInstance();
const getList = () => {
  getGoodsList(pageData.queryInfo).then(res => {
    if (res.code != 1) {
      return;
    }
    dataSource.value = res.data.map(v => {
      v.designSketch = v.designSketch[0] || null;
      return v;
    });

    pageData.total = res.count;
  });
};
//新增
const onAddgoods = () => {
  router.push({ path: proxy.$urls.Add_Edit_Commodity_Library });
};
//编辑
const onEditGoods = record => {
  proxy.$session.set("commodity_libray_info", pageData.queryInfo);
  router.push({
    path: proxy.$urls.Add_Edit_Commodity_Library,
    query: { goodsId: record.goodsId }
  });
};

//设置商品详情
const setGoodsDetail = record => {
  proxy.$session.set("commodity_libray_info", pageData.queryInfo);
  router.push({
    path: proxy.$urls.Set_Goods_Detail,
    query: { id: record._id }
  });
};

//sku规格处理
const goodsSkuSet = (specValue1, specValue2, specValue3, specValue4) => {
  if (specValue1 && specValue2 && specValue3 && specValue4) {
    return `${specValue1}+${specValue2}+${specValue3}+${specValue4}`;
  }
  if (specValue1 && specValue2 && specValue3) {
    return `${specValue1}+${specValue2}+${specValue3}`;
  }
  if (specValue1 && specValue2) {
    return `${specValue1}+${specValue2}`;
  }
  if (specValue1) {
    return specValue1;
  }
};

const onPagination = current => {
  getList();
};
const onChangeSearch = () => {
  pageData.queryInfo.pageNumber = 1;
  getList();
};

const onResult = () => {
  Object.assign(pageData.queryInfo, {
    pageSize: 10,
    pageNumber: 1,
    goodsName: null,
    categoryName: null,
    brandName: null,
    goodsNo: null,
    skuName: null,
    placeOrigin: null,
    goodsType: null
  });
  getList();
};

onMounted(() => {
  const queryInfo = proxy.$session.get("commodity_libray_info");
  if (queryInfo) {
    pageData.queryInfo = queryInfo;
  }
  proxy.$session.remove("commodity_libray_info");
  getList();
});
</script>

<style scoped lang="less">
.goods-info {
  display: flex;
  .info {
    text-align: left;
    margin-left: 8px;
  }
}
</style>
