<script lang="ts">
import { h } from "vue";

export default {
  name: "HtmlComment",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  render() {
    return h("span", {
      innerHTML: `<!-- ${this.text} -->`,
    });
  },
};
</script>
