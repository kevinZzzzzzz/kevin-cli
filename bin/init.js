#!/usr/bin/env node
//  指定脚本运行的环境是node并且运行的时候添加node命令作为前缀

const { Command } = require("commander");
const chalk = require('chalk')
const figlet  = require('figlet')
const pkg = require("../package.json");
const {Creator} = require('../lib/create')
const program = new Command();
// console.log(process.argv);
console.log(
  "\r\n" +
  chalk.green(figlet.textSync("kevinzzz-cli", {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 160,
      whitespaceBreak: true,
    }))
);
program
  .description(pkg.description, "项目描述")
  .version(pkg.version, "-v, --version", "查看版本")
  .option("--desc", '项目描述', () => {
    console.log("项目描述：", pkg.description)
  })
  .usage("<command> [options]")

program
  .command("config [value]") // config 命令
  .description("inspect and modify，检查和修改配置")
  .option("-g, --get <key>", "get value by key")
  .option("-s, --set <key> <value>", "set option[key] is value")
  .option("-d, --delete <key>", "delete option by key")
  .action((value, keys) => {
    // value 可以取到 [value] 值，keys会获取到命令参数
    console.log(value, keys);
  });

program.command('create [name]')
  .description("创建项目，添加描述信息")
  .option("-f, --force")
  .action((projectName, cmd) => {
    // console.log(projectName, cmd, '==========')
    const creator = new Creator(projectName, cmd)
    creator.create()
  })


program.showHelpAfterError('(add --help for additional information)');
program.parse(process.argv);

