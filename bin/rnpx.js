#!/usr/bin/env node
const pkg = require("../package.json");
const program = require('commander');
const cwdPath = process.cwd();
const path = require('path');
const fs = require("fs");
const gulp = require("gulp");
const replace = require('gulp-replace');
const markdown = require("./markdown.js");
const log = require("./log.js");
const exec = require('child_process').exec;

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
    const projectPath = `${cwdPath}/${projectName}`
    console.log(projectPath)
    // 创建目录
    exec(`mkdir ${projectName}`);
    exec(`cd ${projectName}`);
    gulp.src(`${reactProjectPath}/**`)
        .pipe(replace('__name__', projectName))
        .pipe(replace('__description__', projectDisc))
        .pipe(replace('__pageTitle__', projectDisc))
        .pipe(gulp.dest(projectPath))
        .on("end", () => {
            log.success(`项目：${projectDisc} --创建完毕`);
            markdown.update(projectName);
        });

    // 复制隐藏文件
    gulp.src(`${reactProjectPath}/.babelrc`)
        .pipe(gulp.dest(projectPath));

    // 创建.gitignore
    const gitignoreText = fs.readFileSync(`${reactProjectPath}/gitignore.txt`);
    fs.writeFileSync(`${projectPath}/.gitignore`, gitignoreText, 'utf8');
    setTimeout(() => {
        fs.unlinkSync(`${projectPath}/gitignore.txt`);
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