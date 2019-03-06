const path = require('path');

module.exports = {
    plugins: [
      require("postcss-partial-import"),
      require("postcss-url"),
      require('autoprefixer'),
      require("postcss-nested")({}),
      require("postcss-custom-properties")({
        preserve: false,
      }),
      require("postcss-calc")({}),
      require('postcss-extend')(),
      require('postcss-utils')({}),
    ]
}
