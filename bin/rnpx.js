#!/usr/bin/env node
const pkg = require("../package.json");
const program = require('commander');
const cwdPath = process.cwd();
const path = require('path');
const fs = require("fs");
const gulp = require("gulp");
const replace = require('gulp-replace');
const rename = require("gulp-rename");
const markdown = require("./markdown.js");
const log = require("./log.js");
const util = require("./util.js");

/**
 * 创建项目
 * @param {String} value 项目名/项目描述
 */
var createProject = function (value) {
    if (!value || typeof value !== "string" || !value.split("/")[1]) {
        log.error("使用方式：rnpx c 项目名/项目描述");
        return;
    }
    // 复制整体目录
    const reactProjectPath = path.resolve(__dirname, "../tpl/reactProject/");
    const valueArr = value.split("/");
    const projectName = valueArr[0];
    const projectDisc = valueArr[1];
    gulp.src(`${reactProjectPath}/**`)
        .pipe(replace('__name__', projectName))
        .pipe(replace('__description__', projectDisc))
        .pipe(replace('__pageTitle__', projectDisc))
        .pipe(gulp.dest(`${cwdPath}`))
        .on("end", () => {
            log.success(`项目：${projectDisc} --创建完毕`);
            markdown.update();
        });

    // 复制隐藏文件
    gulp.src(`${reactProjectPath}/.babelrc`)
        .pipe(gulp.dest(`${cwdPath}`));

    // 创建.gitignore
    const gitignoreText = fs.readFileSync(`${reactProjectPath}/gitignore.txt`);
    fs.writeFileSync('.gitignore', gitignoreText, 'utf8');
    setTimeout(() => {
        fs.unlinkSync(`${cwdPath}/gitignore.txt`);
    }, 1000);
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