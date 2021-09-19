<template>
  <a-row>
    <a-col :span="24">
      <a-card>
        <div class="back">
          <a-button type="primary" @click="router.back()">返回</a-button>
        </div>
        <div class="ueditor">
          <vue-ueditor-wrap
            v-model="form.mixDetail"
            :config="config"
          ></vue-ueditor-wrap>
        </div>
        <div class="save">
          <a-button type="primary" @click="save">保存</a-button>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { setGoodsDetails, getGoodsDetails } from "@/api/commodityCenter";
import { message } from "ant-design-vue";
import config from "@/config/ueditorConfig";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const form = reactive({
      mixDetail: null,
      id: route.query.id,
    });
    onMounted(() => {
      getGoodsDetails(route.query.id).then((res) => {
        form.mixDetail = res.data.mixDetail;
      });
    });

    const save = () => {
      setGoodsDetails(form).then((res) => {
        if (res.code == 1) {
          message.success("操作成功");
        }
      });
    };
    return {
      form,
      config,
      router,
      save,
    };
  },
};
</script>

<style lang="less" scoped>
.ueditor {
  margin: 30px 0px;
}
.save {
  text-align: center;
}
</style>