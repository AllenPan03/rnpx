# rnpx
快速开始你的react项目，webpack+react项目工程化CLI工具，为了提高开发效率和开发体验，避免繁琐的操作，规范项目结构和文档。

# 安装
```
npm install rnpx -g
```
#### 创建项目
```node
rnpx c 项目名/项目描述
```

#### md 文档操作 （v1.0.3+）

```node
rnpx md --update
```
```node
rnpx md -U
```

1. 之前没有md文档的可以用这个生成文档
2. 文档根据目录内容生成
3. v2.1.0之后点的版本，对入口和组件的操作会同步更新文档

## 生成目录结构说明
```node
project
│   README.md
│   .babelrc     // babel配置文件
│   .gitignore   // 忽略提交配置
│   package.json  
│   postcss.config.js  // postcss配置文件
│   webpack.config.js  // webpack配置文件
└─src
│   │   api        // 接口, rnpx api 可生成接口
│   │   commons     // 公共模块
│   │   components // 项目共用组件
│   │   entries         // 项目入口
│   │   images        // 项目共用图片
│   │   utils        // 辅助函数库
│   │   reducers      // redux reducers
│   │   styles           // 项目共用样式
└─static            // 静态资源（不会被编译）
```
