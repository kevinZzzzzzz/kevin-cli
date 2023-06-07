const path = require("path");
const fs = require("fs-extra");
const Inquirer = require("inquirer");
const chalk = require("chalk");

const { getKevinVueCliInfo } = require("../http/api");

class Creator {
  constructor(filename, option) {
    this.filename = filename;
    this.option = option;
  }
  async create() {
    // console.log(this.filename, this.option);

    // 获取当前工作目录
    const cwd = process.cwd();
    // 拼接得到项目目录
    const targetDirectory = path.join(cwd, this.filename);
    // console.info(cwd, targetDirectory);

    if (fs.existsSync(targetDirectory)) {
      if (this.option.force) {
        // 判断是否使用 -f 或者 --force 参数
        await fs.remove(targetDirectory); // 删除原来存在的文件
      } else {
        let { isOverwrite } = await new Inquirer.prompt([
          {
            name: "isOverwrite",
            type: "list",
            message: "目标文件已存在，请选择一下操作",
            choices: [
              {
                name: "覆盖",
                value: 1,
              },
              {
                name: "取消",
                value: 0,
              },
            ],
          },
        ]);
        if (!!isOverwrite) {
          await fs.remove(targetDirectory); // 删除原来存在的文件
          // this.getRepoInfo();
          this.downloadTemplate(targetDirectory)
        } else {
          console.log(chalk.red("已取消"));
          return;
        }
      }
    } else {
      this.downloadTemplate(targetDirectory)
      // this.getRepoInfo();
    }
  }
  // 导入模板
  async downloadTemplate(pathname) {
    await fs.mkdir(pathname); // 先创建文件目录
    // 复制文件
    let targetPath = path.join(__dirname, '../template/vue-ts-vite')
    await fs.copy(targetPath, pathname)
    console.log(`\r\n ${chalk.green(`${this.filename}创建成功`)}`)
    console.log(`\r\n ${chalk.green(`cd ${this.filename}`)}`)
    console.log(chalk.green('\r\n npm install or yarn add or pnpm install'))
    console.log(chalk.green('\r\n npm run dev or yarn dev or pnpm dev'))
  }
  async getRepoInfo() {
    let repoList = await getKevinVueCliInfo();// 提取仓库名
    // const repos = repoList.map((item) => item.name);
    console.log(repoList);
  }
}

module.exports = {
  Creator,
};
