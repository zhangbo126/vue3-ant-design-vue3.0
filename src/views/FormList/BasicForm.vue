<script>
import { h } from "vue";
import { Input } from "ant-design-vue";
export default {
  setup() {},

  data() {
    return {
      liTree: [
        {
          name: "ZHANG_666",
          age: 22,
        },
        {
          name: "ZHANG_666",
          age: 22,
        },
      ],
    };
  },
  methods: {
    renderInput(name) {
      return h(Input, { onInput: ($event) => (name = $event.target.value) });
    },
  },
  render() {
    const style = {
      width: "120px",
    };

    return h(
      "ul",
      this.liTree.map((v) => {
        return h("li", { targe: 2, style, class: "li" }, v.name, [
          this.renderInput(v.name),
        ]);
      })
    );
  },

  created() {},
};
</script>

<style></style>
