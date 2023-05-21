<script>
import { ref, reactive, toRefs, onMounted, defineComponent } from "vue";

export default defineComponent({
  props: {
    lineClamp: {
      type: [String, Number],
      default: 1,
    },
  },
  setup(props, { slots,attrs }) {
    const {
      lineClamp: { value: lineClamp },
    } = toRefs(props);
    const tooltipElemt = ref(null);
    const ellipsis = ref(null);
    let tooltipStyle = {};
    const tooltipNode = (el) => {
      tooltipElemt.value = el;
    };
    onMounted(() => {
      //文本行高
      const lineHeight =
        getComputedStyle(tooltipElemt.value).lineHeight.replace("px", "") - 0;
      //文本占位高度
      const height = getComputedStyle(tooltipElemt.value).height.replace("px", "") - 0;
      ellipsis.value = height > lineClamp * lineHeight;
      const style = {
        height: `${lineHeight * lineClamp}px`,
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        webkitLineClamp: lineClamp,
        webkitBoxOrient: "vertical",
        cursor: "pointer",
      };
      tooltipStyle = ellipsis.value ? style : {};
    });
    //渲染有提示框的节点内容
    const renderEllipsisContent = () => {
      const slot = {
        title: () => <span>{slots.default()}</span>,
      };
      const aTooltip = (
        <a-tooltip  v-slots={slot}  props={attrs}>
          <div style={tooltipStyle} ref={tooltipNode}>
            {slots.default()}
          </div>
        </a-tooltip>
      );
      return aTooltip
    };
    // 渲染普通文本
    const renderTextNode = () => {
      return <div ref={tooltipNode}>{slots.default()}</div>;
    };

    return () => (ellipsis.value ? renderEllipsisContent() : renderTextNode());
  },
});
</script>
