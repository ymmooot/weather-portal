const { rule } = require("postcss");

module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-vue",
    "stylelint-config-recess-order",
  ],
  overrides: [
    {
      files: ["*.css", "**/*.css"],
      extends: ["stylelint-config-recommended-scss"],
    },
    {
      files: ["*.vue", "**/*.vue"],
      extends: [
        "stylelint-config-recommended-scss",
        "stylelint-config-recommended-vue",
      ],
    },
  ],
};
