const path = require("path");

module.exports = {
  publicPath: "",
  outputDir: "docs",
  assetsDir: "static",
  // 将entry指向examples
  pages: {
    index: {
      entry: "demo/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  // 为packages目录添加babel-loader处理
  chainWebpack: config => {
    config.module
      .rule("js")
      .use("babel")
      .loader("babel-loader")
      .tap(options => {
        return options;
      }),
      config.module
        .rule("vue")
        .use("iview-loader")
        .loader("iview-loader")
        .tap(options => {
          console.log(options);
          return {
            prefix: false
          };
        });
  },
  configureWebpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: "vue-loader"
        },
        {
          loader: path.resolve(__dirname, "./md-loader/index.js")
        }
      ]
    });
  },
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        /*sass-loader 8.0语法 */
        //prependData: '@import "~@/styles/variables.scss";',

        /*sass-loader 9.0写法，感谢github用户 shaonialife*/
        additionalData(content, loaderContext) {
          const { resourcePath, rootContext } = loaderContext;
          const relativePath = path.relative(rootContext, resourcePath);
          if (
            relativePath.replace(/\\/g, "/") !==
            "demo/assets/styles/variables.scss"
          ) {
            return '@import "demo/assets/styles/variables.scss";' + content;
          }
          return content;
        }
      }
    }
  }
};
