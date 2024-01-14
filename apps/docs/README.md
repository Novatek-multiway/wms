# wms-doc

A static site base on [dumi](https://d.umijs.org).

## 开发

```bash
# 安装依赖
$ npm install

# 启动本地服务
$ npm start

# 打包项目
$ npm run build
```

## git 提交规范

```sh
feat(docs): "commit message"
```

## 目录结构介绍

### 静态资源目录public

具体示例如下：

```txt
public
|   logo.png
|   logo_origin.png
|   
+---en-US
|   \---guides
+---zh-CN
|   \---guides
|       +---chapter1
|       |       20230708135310.png
|       |       20230711103057.png
|       |       PAD20230711140410.png
|       |       PC20230711112020.png
|       |       PDA20230711140916.png
|       |       TV20230711142640.png
|       |       
|       +---chapter2
|       +---chapter3
|       +---chapter4
|       \---chapter5
|   \---qa
\---zh-TW
    \---guides

```

划分规则：

1. 一级目录根据语言环境划分，例如zh-CN（中文）、en-US（英文）；
2. 二级目录根据模块划分（页面顶部菜单）,例如guides（WMS2.0说明文档）、qa（常见问题）（可选）；
3. 三级目录根据模块内的具体章节划分，部分公共文件也可以直接放在跟目录下（可选）；

### 文档目录docs

具体示例如下：

```txt
docs
|   index.en-US.md
|   index.md
|   index.zh-TW.md
|   
+---guides
|       chapter1.md
|       chapter2.md
|       chapter3.md
|       chapter4.md
|       chapter5.md
|       index.md
|       
\---qa
        index.md
```

- `index.md`为文档的首页、入口文件；
- `index.en-US.md`为英文环境下的首页、入口文件，多语言只需要在文档名后面接上多语言标识符（下文JSON中的id）的后缀即可；

```json
[
  { "id": "zh-CN", "name": "中文" },
  { "id": "en-US", "name": "English" },
  { "id": "zh-TW", "name": "繁体" },
]
```

- 具体章节下文档顶部代码的含义

```Markdown
---
title: WMS2.0说明文档       //  左侧导航的标题
order: 1                   //  左侧导航的顺序，数字越小越靠前
nav:
  title: WMS2.0说明文档     // 顶部导航的标题
  order: 1                 // 顶部导航的顺序，数字越小越靠前
---
```

**nav字段指定顶部时才需要**
