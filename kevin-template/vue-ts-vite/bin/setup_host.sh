#!/usr/bin/env sh
image_name=$(node -p -e "require('./package.json').name") # 表示镜像名称
version=$(node -p -e "require('./package.json').version") # 表示镜像版本
contianer_name=xxx # 运行的容器名称
host_port1=8881 # 本机端口1
container_port1=81 # 运行的容器端口1


version=$(node -p -e "require('./package.json').version") # 表示镜像版本
echo $version

docker rmi -f $image_name:$version

# read -p '是否需要跟新版本号(Y/N)：' update
# if [ "$update" == 'Y' ]
#   then
#   pnpm version patch
# fi
# version=$(node -p -e "require('./package.json').version") # 表示镜像版本
# echo $version

pnpm build:bloodSup
echo 'docker build...' # 构建镜像
docker build -t $image_name:$version -f Dockerfile .
echo 'docker rm...' # 清理同名容器
# 如果已经有同名的容器，删除掉
if [ "$(docker ps -aq -f name=$contianer_name)" ]; then
  echo 'docker rm ...'
  docker rm -f $contianer_name
fi
echo 'docker run...' # 启动容器
docker run -d --name $contianer_name -p $host_port1:$container_port1 $image_name:$version
echo 'Done!'
