<script lang="ts">
import { h } from "vue";

export default {
  name: "HtmlComment",
  props: {
    text: {
      type: String,
      required: true,
    },
    showDev: {
      type: Boolean,
      default: false,
    },
  },
  render() {
    // @ts-expect-error Because vite/client is not imported in deno
    if (this.showDev && import.meta.env.MODE === "development") {
      return h("span", {
        innerHTML: this.text,
      });
    }
    return h("span", {
      innerHTML: `<!-- ${this.text} -->`,
    });
  },
};
</script>
