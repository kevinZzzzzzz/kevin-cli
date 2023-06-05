#!/usr/bin/env node
//  指定脚本运行的环境是node并且运行的时候添加node命令作为前缀

const { Command } = require("commander");
const program = new Command();
const pkg = require("../package.json");
// console.log(process.argv);

program
  .description(pkg.description, "项目描述")
  .version(pkg.version, "-v, --version", "查看版本")
  .option("--desc", '项目描述', () => {
    console.log("项目描述：", pkg.description)
  })
  .usage("<command> [options]")
  .command('create <name>')
  .action((source, destination) => {
    console.log(source, destination, '==========')
  })


program.showHelpAfterError('(add --help for additional information)');
program.parse(process.argv);

