<template>
  <a-row>
    <a-col :span="24">
      <a-card>
        <!-- 商品基本信息 -->
        <div class="goods-info">
          <div class="info-title">商品基本信息</div>
          <a-form
            ref="formRef"
            :model="form"
            :rules="rules"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-form-item ref="goodsName" label="商品名称" name="goodsName">
              <a-input
                placeholder="商品名称"
                style="width: 220px"
                v-model:value="form.goodsName"
              />
            </a-form-item>

            <a-form-item label="商品分类" ref="categoryId" name="categoryId">
              <a-select
                v-model:value="form.categoryId"
                placeholder="商品分类"
                style="width: 220px"
                :allowClear="true"
                show-search
                :filter-option="filterOptionPartent"
              >
                <a-select-option v-for="c in classList" :key="c._id" :value="c._id">
                  {{ c.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="商品品牌" ref="brandId" name="brandId">
              <a-select
                v-model:value="form.brandId"
                placeholder="商品品牌"
                style="width: 220px"
                :allowClear="true"
                show-search
                :filter-option="filterOptionPartent"
              >
                <a-select-option v-for="c in brandList" :key="c._id" :value="c._id">
                  {{ c.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="商品货号" ref="goodsNo" name="goodsNo">
              <a-input
                placeholder="商品货号"
                style="width: 220px"
                v-model:value="form.goodsNo"
              />
            </a-form-item>
          </a-form>
        </div>
        <!-- 商品规格 -->
        <div class="mix-containter">
          <div class="mix-title">商品规格</div>
          <div class="mix-item">
            <div class="item-bar" v-for="(mixMax, index) in mixMaxItem" :key="mixMax.key">
              <div class="bar-nav">
                <div class="nav-lf">
                  <p>规格项:</p>
                  <a-input
                    v-model:value="mixMax.spaceName"
                    :allowClear="true"
                    size="small"
                  />
                </div>
                <div class="nav-lr">
                  <a @click="onRemoveMixItem(index)">删除</a>
                </div>
              </div>
              <div class="bar-value">
                <div class="value-box">
                  <div
                    class="value"
                    v-for="(mixMin, i) in mixMax.mixList"
                    :key="mixMin.key"
                  >
                    <a-input
                      @blur="onBlurMixValue(mixMin)"
                      v-model:value.trim="mixMin.mixName"
                      :style="{ width: '120px', marginRight: '10px' }"
                      v-if="mixMin.isShowInp"
                    />
                    <span class="txt" v-else @click="onCheckoutValue(mixMin)"
                      >{{ mixMin.mixName }}
                      <span class="ico" @click="onRemoveMinValue(mixMax.mixList, i)">
                        <CloseCircleOutlined />
                      </span>
                    </span>
                  </div>
                </div>
                <div class="add-value">
                  <a @click="onAddMaxValue(index)"> 添加规格值+</a>
                </div>
              </div>
            </div>
            <div class="add-btn">
              <a-button type="primary" @click="onAddMixItem">添加规格项+</a-button>
            </div>
          </div>
        </div>
        <!-- 规格表格 -->
        <div class="mix-table">
          <a-table bordered :columns="columns" :pagination="false" :data-source="data"> </a-table>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { reactive, ref, toRefs, watch } from "vue";
import { message } from "ant-design-vue";
import { watchMix } from "./mixDataWatch"; //处理数据变化方法
const rules = {
  goodsName: [
    { required: true, message: "请输入", trigger: ["change", "blur"], type: "string" },
    {
      message: "商品名称长度由0-18位组成",
      min: 0,
      max: 18,
      trigger: ["change", "blur"],
      type: "string",
    },
  ],
  categoryId: [
    { required: true, message: "请选择", trigger: ["change", "blur"], type: "number" },
  ],
  brandId: [
    { required: true, message: "请选择", trigger: ["change", "blur"], type: "number" },
  ],
  goodsNo: [
    { required: true, message: "请输入", trigger: ["change", "blur"], type: "string" },
  ],
};
const column = [
  {
    title: "商品规格",
    dataIndex: "name",
    key: "name",
    align: "center",
    children: [
      {
        title: "",
        dataIndex: "attr1",
        key: "attr1",
        align: "center",
        width: 200,
      },
    ],
  },
  {
    title: "商品价格",
    dataIndex: "price",
    width: 100,
    align: "center",
  },

  {
    title: "尺寸(长*宽*高)(mm)",
    dataIndex: "size",
    width: 160,
    slots: {
      customRender: "size",
    },
    align: "center",
  },
  {
    title: "商品效果图",
    dataIndex: "img",
    align: "center",
    slots: {
      customRender: "img",
    },
  },
];
export default {
  setup() {
    const form = reactive({
      goodsName: null,
      categoryId: null,
      sort: null,
      brandId: null,
      _id: null,
      goodsNo: null,
    });
    const parametr = reactive({
      classList: [],
      brandList: [],
    });
    const data = ref([]);
    const columns = ref(column);
    const mixMaxItem = ref([
      {
        spaceName: "",
        key: -1,
        mixList: [],
      },
    ]);
    //监听规格项数据变化
    watch(mixMaxItem.value, (newValue, oldValue) => {
      const attrColumns = columns.value[0].children;
      columns.value[0].children = watchMix(newValue, oldValue, attrColumns, data).columns;
      data.value =  watchMix(newValue, oldValue, attrColumns, data.value).data
    });
    // 添加大项
    const onAddMixItem = () => {
      const minMax = {
        spaceName: "",
        key: Math.random() * 1000,
        mixList: [],
      };
      if (mixMaxItem.value.length >= 4) {
        return message.warning("最多添加4项");
      }
      mixMaxItem.value.push(minMax);
    };
    //删除大项
    const onRemoveMixItem = (index) => {
      mixMaxItem.value.splice(index, 1);
    };
    //添加小项
    const onAddMaxValue = (index) => {
      const minMin = {
        mixName: "",
        key: Math.random() * 1000,
        isShowInp: true,
      };
      mixMaxItem.value[index].mixList.push(minMin);
    };
    //点击切换input输入
    const onCheckoutValue = (mixMin) => {
      mixMin.isShowInp = true;
    };
    //失焦隐藏 input
    const onBlurMixValue = (mixMin) => {
      mixMin.isShowInp = false;
    };
    //删除规格值
    const onRemoveMinValue = (minList, i) => {
      minList.splice(i, 1);
    };

    const filterOptionPartent = (input, option) => {
      return option.children[0].children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    return {
      data,
      columns,
      rules,
      form,
      mixMaxItem,
      onAddMixItem,
      onRemoveMixItem,
      onAddMaxValue,
      onCheckoutValue,
      onBlurMixValue,
      onRemoveMinValue,
      ...toRefs(parametr),
      filterOptionPartent,
    };
  },
};
</script>

<style scoped lang="less">
.goods-info {
  .info-title {
    font-weight: bold;
    font-size: 16px;
    margin: 10px 0px;
  }
}
.mix-containter {
  .mix-title {
    font-weight: bold;
    font-size: 16px;
    margin: 10px 0px;
  }
  .mix-item {
    padding: 0px 15px;
    .item-bar {
      .bar-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        background-color: #f5f7fa;
        padding: 0px 15px;
        .nav-lf {
          display: flex;
          align-items: center;
          p {
            min-width: 80px;
            margin: 0 !important;
          }
        }
      }
      .bar-value {
        padding: 20px 80px;
        .value-box {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }
        .value {
          margin-right: 10px;
          margin-bottom: 8px;

          .txt {
            position: relative;
            padding: 0px 20px;
            border-color: #eceef1;
            display: inline-block;
            border-width: 1px;
            border-style: solid;
            line-height: 30px;
            -webkit-box-shadow: none;
            box-shadow: none;
            color: #5e6166;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            height: 30px;
            font-size: 12px;
            left: 0px;
            text-align: center;
            cursor: pointer;
            .ico {
              position: absolute;
              top: -15px;
              right: -6px;
              cursor: pointer;
              display: none;
            }
            &:hover .ico {
              display: block;
            }
          }
        }
      }
    }
  }
 
}
 .mix-table{
    margin-top: 20px;
  }
</style>
