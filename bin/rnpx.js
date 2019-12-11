#!/usr/bin/env node
const pkg = require("../package.json");
const cwdPath = process.cwd();
const path = require('path');
const fs = require("fs");
const gulp = require("gulp");
const replace = require('gulp-replace');
const rename = require("gulp-rename");
const markdown = require("./markdown.js");
var program = require('commander');
const log = require("./log.js");
const util = require("./util.js");
const api = require("./api.js");

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