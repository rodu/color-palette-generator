const template = `
  <div class="messenger alert alert-warning" v-if="messageContent">
    {{messageContent}}
    <button
      type="button"
      class="close"
      @click="dismiss()"
      data-dismiss="alert"
      aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
`;

const props = ['message'];

const data = () => {
  return {
    messageContent: ''
  };
};

const watch = {
  message({ content }) {
    this.messageContent = content;
  }
};

const methods = {
  dismiss() {
    this.messageContent = '';
  }
};

Vue.component('messenger', {
  props,
  data,
  watch,
  template,
  methods,
});
