#!/usr/bin/env node
const pkg = require("../package.json");
var program = require('commander');

/**
 * 创建项目
 * @param {String} value 项目名/项目描述
 */
var createProject = function (value) {
   console.log("测试成功")
}

program
    // 版本号
    .version(pkg.version)
    .option('-v', '版本号', function () {
        console.log(pkg.version)
    });

program
    .command('create')
    .alias('c')
    .description('创建项目')
    .action(function (value) {
        createProject(value);
    });

program.parse(process.argv)