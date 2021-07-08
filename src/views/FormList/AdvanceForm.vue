<template>
  <div>
    <s-modle></s-modle>

    <a-button type="primary" @click="showModal">打开弹框</a-button>
    <form-modal ref="form"></form-modal>
  </div>
</template>

<script>
const SModle = {
  data() {
    return {
      modalOpen: false,
    };
  },
  template: `
   <button @click="modalOpen = true">
        Open full screen modal! (With teleport!)
    </button>
       <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          I'm a teleported modal! 
          (My parent is "body")
          <button @click="modalOpen = false">
            Close
          </button>
        </div>
      </div>
    </teleport>
    `,
};
import FormModal from "./FormModal";
export default {
  setup() {},
  inject: ["publicInfo"],
  components: {
    "s-modle": SModle,
    FormModal,
  },
  data() {
    return {};
  },
  methods: {
    showModal() {
       this.$refs.form.show()
    },
  },
};
</script>

<style>
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>
