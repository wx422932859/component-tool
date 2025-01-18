# component-tool

## 介绍

基于原生 js 的组件化开发工具

## 软件架构

src 源码

## 使用说明

-   运行 npm run docs 可以自动生成说明文档，需要全局安装 jsdoc 依赖
    npm install -g jsdoc
-   提交的时候不要提交以下文件夹
    node_modules // 执行
    docs // 执行 npm run docs 会自动生成
    test // 用于本地功能测试

## 安装依赖

    若 npm install 报错，请使用 yarn install

## 版本记录

### V1.1.4（2024-09-29）

优化文件上传，增加文件类型：pdf、xlsx、docx、zip、7z、rar

### V1.1.5（2024-11-25）

优化水印功能，增加防隐藏属性

### V1.1.6（2024-12-17）

处理导出的时候参数值带单引号的情况

### V1.1.7（2024-01-14）

新增固定单元格组件 FixedTableCell
