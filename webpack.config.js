 
// 引用nodejs的path模块
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
 
module.exports = {
    mode: 'development',//开发环境
    entry : path.join(__dirname,'src/js/','app.js'),// 打包入口
    output:{
        path:path.join(__dirname,'dist'),// 打包结束的位置
        filename :'bundle.js' // 指定的打包后文件名称
    },
    module:{//配置模板
        rules:[//规则设置
            {
                test: /\.js$/,//只对js文件生效
                loader: "babel-loader",// 转换es6
                include:path.join(__dirname,"src/js/"),//处理src内的文件
                exclude:/node_modules/ //不处理node_modules内的文件
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // 将 JS 字符串生成为 style 节点
                  'style-loader',
                  // 将 CSS 转化成 CommonJS 模块
                  'css-loader',
                  // 将 Sass 编译成 CSS
                  {
                    loader: 'postcss-loader',
                    options: {
                      postcssOptions: { // 或直接引用config文件路径：'config': './path/to/postcss.config.js'
                        plugins: [require('autoprefixer')],
                        config: path.resolve(__dirname, 'postcss.config.js'), // 引入PostCSS配置文件
                      },
                    }
                  },
                  'sass-loader',
                ],
              }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.join(__dirname,"src","index.html"),// 打包入口
            filename : "index.html"// 指定的打包后文件名称
        })
    ],
    devServer:{
        port: 5000,
        static : path.join(__dirname,"dist")
    }
 
}