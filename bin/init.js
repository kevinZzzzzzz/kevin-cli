#!/usr/bin/env node
//  指定脚本运行的环境是node并且运行的时候添加node命令作为前缀

const { Command } = require('commander');
const pkg = require('../package.json')
console.log('hello,' + pkg.commandName)

const program = new Command();

program
  .version(pkg.version, '-v, --version', 'display version for kevin-cli')
  .usage('<command> [options]');
