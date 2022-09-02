<template>
  <a-row>
    <a-col :span="24">
      <a-card>
        <!-- 商品基本信息 -->
        <div class="goods-info">
          <div class="back">
            <a-button type="primary" @click="router.back()">返回</a-button>
          </div>
          <div class="info-title">商品基本信息</div>
          <a-form ref="formRef" :model="form" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-form-item ref="goodsName" label="商品名称" name="goodsName">
              <a-input placeholder="商品名称" style="width: 220px" v-model:value="form.goodsName" />
            </a-form-item>

            <a-form-item label="商品分类" ref="categoryId" name="categoryId">
              <a-select v-model:value="form.categoryId" placeholder="商品分类" style="width: 220px" :allowClear="true" show-search :filter-option="filterOptionPartent">
                <a-select-option v-for="c in classList" :key="c._id" :value="c._id">{{ c.name }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="商品品牌" ref="brandId" name="brandId">
              <a-select v-model:value="form.brandId" placeholder="商品品牌" style="width: 220px" :allowClear="true" show-search :filter-option="filterOptionPartent">
                <a-select-option v-for="c in brandList" :key="c._id" :value="c._id">{{ c.name }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="商品货号" ref="goodsNo" name="goodsNo">
              <a-input placeholder="商品货号" style="width: 220px" v-model:value.trim="form.goodsNo" />
            </a-form-item>
            <a-form-item label="产地" ref="placeOrigin" name="placeOrigin">
              <a-input placeholder="产地" style="width: 220px" v-model:value.trim="form.placeOrigin" />
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
                  <a-input v-model:value="mixMax.spaceName" :allowClear="true" size="small" />
                </div>
                <div class="nav-lr">
                  <a @click="onRemoveMixItem(index)">删除</a>
                </div>
              </div>
              <div class="bar-value">
                <div class="value-box">
                  <div class="value" v-for="(mixMin, i) in mixMax.mixList" :key="mixMin.key">
                    <div class="inp-txt" v-if="mixMin.isShowInp">
                      <a-input @blur="onBlurMixValue(mixMin)" v-model:value.trim="mixMin.specValue" :style="{ width: '120px', marginRight: '10px' }" />
                      <span class="ico" @click="onRemoveMinValue(mixMax.mixList, i)">
                        <CloseCircleOutlined />
                      </span>
                    </div>
                    <span class="txt" v-else @click="onCheckoutValue(mixMin)">
                      {{ mixMin.specValue }}
                      <span class="ico" @click="onRemoveMinValue(mixMax.mixList, i)">
                        <CloseCircleOutlined />
                      </span>
                    </span>
                  </div>
                </div>
                <div class="add-value">
                  <a @click="onAddMaxValue(index)">添加规格值+</a>
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
          <a-table bordered :columns="columns"  size="small" :pagination="false" :dataSource="data" :scroll="{x:1200}">
            <template #bodyCell="{ column, text,record }">
              <template v-if="column.dataIndex === 'price'">
                <a-input-number :max="1000000" :min="1" v-model:value="record.price" />
              </template>
              <template v-if="column.dataIndex === 'skuName'">
                <a-input v-model:value.trim="record.skuName" />
              </template>
              <template v-if="column.dataIndex === 'weight'">
                <div class="weight">
                  <a-input-number v-model:value="record.weight" :max="1000000" :min="1" />
                </div>
              </template>
              <template v-if="column.dataIndex === 'goodsType'">
                <a-radio-group v-model:value="record.goodsType" name="radioGroup">
                  <a-radio :value="1">普通商品</a-radio>
                  <a-radio :value="2">秒杀商品</a-radio>
                  <a-radio :value="3">团购商品</a-radio>
                </a-radio-group>
              </template>
              <template v-if="column.dataIndex === 'designSketch'">  
                  <div class="design-img">
                    <a-upload :multiple="true" list-type="picture-card" name="file" v-model:file-list="record.designSketch" :before-upload="(e, fileList) => onBeforeUpload(e, fileList, record)" :customRequest="(e) => onCustomRequest(e, record)">
                      <div v-if="record.designSketch.length < 8">
                        <plus-outlined />
                        <div class="ant-upload-text">上传</div>
                      </div>
                    </a-upload>
                  </div>
              </template>
            </template>
          </a-table>
        </div>
        <div class="save-submit">
          <a-button type="primary" @click="onSaveSubmit">保存</a-button>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { reactive, ref, toRefs, watch, onMounted, toRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { watchMix } from "./mixDataWatch"; //处理数据变化方法
const rules = {
  goodsName: [
    {
      required: true,
      message: "请输入",
      trigger: ["change", "blur"],
      type: "string"
    },
    {
      message: "商品名称长度由0-18位组成",
      min: 0,
      max: 18,
      trigger: ["change", "blur"],
      type: "string"
    }
  ],
  categoryId: [
    {
      required: true,
      message: "请选择",
      trigger: ["change", "blur"],
      type: "string"
    }
  ],
  brandId: [
    {
      required: true,
      message: "请选择",
      trigger: ["change", "blur"],
      type: "string"
    }
  ],
  goodsNo: [
    {
      required: true,
      message: "请输入",
      trigger: ["change", "blur"],
      type: "string"
    },
    {
      message: "字符长度限制20",
      min: 0,
      max: 20,
      trigger: ["change", "blur"],
      type: "string"
    }
  ],
  placeOrigin: [
    {
      required: true,
      message: "请输入",
      trigger: ["change", "blur"],
      type: "string"
    },
    {
      message: "字符长度限制20",
      min: 0,
      max: 20,
      trigger: ["change", "blur"],
      type: "string"
    }
  ]
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
        dataIndex: "specValue1",
        align: "center",
        width: 200
      }
    ]
  },
  {
    title: "SKU名称",
    dataIndex: "skuName",
    width: 180,
    align: "center"
  },
  {
    title: "商品价格",
    dataIndex: "price",
    width: 100,
    align: "center"
  },

  {
    title: "重量(g)",
    dataIndex: "weight",
    width: 160,
    align: "center"
  },
  {
    title: "类型",
    dataIndex: "goodsType",
    width: 160,
    align: "center"
  },
  {
    title: "商品效果图",
    dataIndex: "designSketch",
    align: "center"
  }
];
import {
  imgBatchUpload,
  getBrandList,
  getClassList,
  addGoods,
  editGoods,
  getEditGoodsInfo
} from "@/api/commodityCenter";
export default {
  setup() {
    const form = reactive({
      goodsName: null,
      categoryId: null,
      brandId: null,
      goodsId: null,
      goodsNo: null,
      placeOrigin: null
    });
    const parametr = reactive({
      classList: [],
      brandList: [],
      beforeImgFile: [],
      afterImgFile: [],
      brandList: [],
      classList: []
    });

    const data = ref([]);
    const formRef = ref();
    const columns = ref(column);
    const route = useRoute();
    const router = useRouter();

    const mixMaxItem = ref([
      {
        spaceName: "",
        key: -1,
        mixList: []
      }
    ]);

    //页面加载获取数据
    onMounted(async () => {
      form.goodsId = route.query.goodsId;
      await getBrandAndClassList();
      if (form.goodsId) {
        await getEditGoodsInfo(form.goodsId).then(res => {
          if (res.code == 1) {
            const spaceInfo = res.data.spaceInfo;
            data.value = res.data.mixList.map(v => {
              v.designSketch = v.designSketch.map(d => {
                return {
                  uid: d,
                  name: d,
                  status: "done",
                  url: d
                };
              });
              return v;
            });
            mixMaxItem.value= ref(spaceInfo.spaceValueList).value
            Object.assign(form, {
              goodsName: spaceInfo.goodsName,
              categoryId: spaceInfo.categoryId,
              brandId: spaceInfo.brandId,
              goodsId: spaceInfo.goodsId,
              goodsNo: spaceInfo.goodsNo,
              placeOrigin: spaceInfo.placeOrigin
            });
          }
        });
      }
    });

    //监听规格项数据变化
    watch( mixMaxItem.value,(newValue, oldValue) => {
        const attrColumns = columns.value[0].children;
        const result = watchMix(newValue, oldValue, attrColumns, data.value);
        columns.value[0].children = result.column;
        data.value = result.data;
      },
      {
        immediate: false
      }
    );
    // 添加大项
    const onAddMixItem = () => {
      const minMax = {
        spaceName: "",
        key: Math.random() * 1000,
        mixList: []
      };
      if (mixMaxItem.value.length >= 3) {
        return message.warning("最多添加3项");
      }
      mixMaxItem.value.push(minMax);
    };
    //删除大项
    const onRemoveMixItem = index => {
      mixMaxItem.value.splice(index, 1);
    };
    //添加小项
    const onAddMaxValue = index => {
      let minMin=reactive({
        specValue: "",
        key: Math.random() * 1000,
        isShowInp: true
      })
      mixMaxItem.value[index].mixList.push(minMin);
    };
    //点击切换input输入
    const onCheckoutValue = mixMin => {
      mixMin.isShowInp = true;
    };
    //失焦隐藏 input
    const onBlurMixValue = mixMin => {
      mixMin.isShowInp = false;
    };
    //删除规格值
    const onRemoveMinValue = (minList, i) => {
      minList.splice(i, 1);
    };

    //上传图片前检测
    const onBeforeUpload = (file, fileList, record) => {
      return new Promise(async (reslove, reject) => {
        const isJpgOrPng =
          file.type === "image/jpeg" || file.type === "image/png";
        const isLt2M = file.size / 1024 / 1024 < 2;
        parametr.beforeImgFile.push(file);
        if (!isJpgOrPng || !isLt2M) {
        } else {
          parametr.afterImgFile.push(file);
        }
        // 判断批量上传图格式是否符合要求
        //符合要求的数量 和已上传的数量不能超过 8
        if (
          parametr.afterImgFile.length > 8 ||
          parametr.afterImgFile.length + record.designSketch.length > 8
        ) {
          parametr.beforeImgFile = [];
          parametr.afterImgFile = [];
          return message.error("效果图最多上传八张");
        }

        if (parametr.beforeImgFile.length == fileList.length) {
          if (parametr.afterImgFile.length == fileList.length) {
            return reslove();
          }
          parametr.beforeImgFile = [];
          parametr.afterImgFile = [];
          return message.error("图片格式jpg/png!，图片大小限制2MB!");
        }
      });
    };
    //图片上传
    const onCustomRequest = (file, record) => {
      const formData = new FormData();
      parametr.afterImgFile.forEach(v => {
        formData.append("file", v);
      });

      imgBatchUpload(formData).then(res => {
        const imgArr = res.data;
        const addImg = imgArr.map(v => {
          let file = {
            uid: v.path,
            name: v.path,
            status: "done",
            url: v.path
          };
          return file;
        });

        record.designSketch = record.designSketch
          .concat(addImg)
          .filter(v => v.status == "done");
        parametr.beforeImgFile = [];
        parametr.afterImgFile = [];
      });
    };
    //保存提交
    const onSaveSubmit = () => {
      formRef.value.validate().then(() => {
        if (mixMaxItem.value.length == 0) {
          return message.warning("请添加规格项");
        }
        const specValueRule = mixMaxItem.value.every(v => v.spaceName != "");
        if (!specValueRule) {
          return message.warning("请填写规格项名称");
        }
        console.log(data.value)
        //价格是否输入验证
        const priceRule = data.value.every(v =>{
           
          return  v.price != "" && v.price != null
        });
            
        if (!priceRule) {
          return message.warning("请填写商品价格");
        }
        //重量验证
        const weightRule = data.value.every(
          v => v.weight != "" && v.weight != null
        );
        if (!weightRule) {
          return message.warning("请填写商品重量");
        }

        //效果图验证
        const designSketchRule = data.value.every(
          v => v.designSketch.length != 0
        );
        if (!designSketchRule) {
          return message.warning("请上传商品效果图");
        }

        const submitData = {
          mixInfo: form,
          mixList: data.value,
          spaceValueList: mixMaxItem.value
        };
        //编辑保存
        if (form.goodsId) {
          editGoods(submitData).then(res => {
            if (res.code == 1) {
              message.success("操作成功");
            }
          });
          return;
        }
        //新增保存保存
        addGoods(submitData).then(res => {
          if (res.code == 1) {
            message.success("操作成功");
            router.back();
          }
        });
      });
    };
    //获取品牌  分类
    const getBrandAndClassList = () => {
      getBrandList().then(res => {
        parametr.brandList = res.data;
      });
      getClassList().then(res => {
        parametr.classList = res.data.filter(v => v.partentId != null);
      });
    };
    const filterOptionPartent = (input, option) => {
      return (
        option.children[0].children
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    };
    return {
      data,
      columns,
      rules,
      form,
      mixMaxItem,
      formRef,
      router,
      onAddMixItem,
      onRemoveMixItem,
      onAddMaxValue,
      onCheckoutValue,
      onBlurMixValue,
      onRemoveMinValue,
      ...toRefs(parametr),
      onCustomRequest,
      onSaveSubmit,
      onBeforeUpload,
      getBrandAndClassList,
      filterOptionPartent
    };
  }
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
          .inp-txt {
            position: relative;
            padding: 0px 20px;
            display: inline-block;
            line-height: 30px;
            -webkit-box-shadow: none;
            box-shadow: none;
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
              right: 25px;
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
.mix-table {
  margin-top: 20px;
  .size {
    display: flex;
    align-items: center;
    color: red;
  }
  /deep/ .ant-input-number-handler-wrap {
    display: none;
  }
  /deep/ .ant-upload-list-picture-card .ant-upload-list-item-info::before {
    left: 0;
  }
}
.save-submit {
  height: 71px;
  background-color: #ffff;
  line-height: 71px;
  text-align: center;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
}
</style>
