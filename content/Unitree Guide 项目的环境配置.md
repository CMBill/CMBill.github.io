## 0 系统环境

* ~~Ubuntu 18.04 LTS (bionic)~~
* Ubuntu 20.04.6 LTS (Focal Fossa)

18.04 的 Ubuntu 软件版本过于老旧，多个依赖无法满足版本要求，多种软件无法运行。

## 1 安装 ROS 1

在 Ubuntu 20.04 上即 ROS Noetic，与 ROS 2 的安装类似。

### 1.1 设置 sources.list

可以改为自己常用的镜像站。

```bash
sudo sh -c 'echo "deb https://mirrors.cernet.edu.cn/ros/ubuntu/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
```

### 1.2 设置密钥

```bash
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
```

### 1.3 安装

此处安装桌面完整版。

```bash
sudo apt update
sudo apt install ros-noetic-desktop-full
```

### 1.4 设置环境

```bash
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

### 1.5 构建工厂依赖

```bash
sudo apt install python3-rosdep python3-rosinstall python3-rosinstall-generator python3-wstool build-essential
```

### 1.6 初始化 rosdep

```bash
sudo rosdep init
rosdep update
```

## 2 安装更高版本的 cmake

> 如果使用 Ubuntu 18.04 版本，可能需要手动安装更高版本的 cmake，20.04 版本则应该不需要。

  unitree_guide 项目以及其需要的 lcm 项目都需要更高版本的 cmake，但是 Ubuntu 18.04 提供的 cmake 是 3.10 版本，无法满足我们的需求，因此需要另外下载 cmake。

cmake 官网直接提供了打包好的二进制文件，无法直接覆盖安装 deb 包。因此我们将其下载下来后，使用 `update-alternatives`​ 命令来新建一条指向其的命令。

例如下载 3.30.5 版本的 cmake，将其解压至 `~/progs/cmake-3.30.5-linux-x86_64`​ 文件夹下，即 cmake 路径为

```bash
~/progs/cmake-3.30.5-linux-x86_64/bin/cmake
```

使用`update-alternatives`​ 命令：

```bash
sudo update-alternatives --install /usr/bin/cmake cmake /home/bill/progs/cmake-3.30.5-linux-x86_64/bin/cmake 1 --force
```

之后使用 `cmake`​ 即调用 3.30.5 版本的 cmake 了。

## 3 编译安装 lcm

### 3.1 下载源码

https://github.com/lcm-proj/lcm/

### 3.2 安装依赖

```bash
sudo apt-get install build-essential libglib2.0-dev python-dev
```

### 3.3 编译及安装

```bash
mkdir build
cd build
cmake ..
make
sudo make install
```

最后使用 `lcm-tester`​ 检查是否安装成功。

如果出现报错 `error while loading shared libraries: liblcm.so.1: cannot open shared object file: No such file or directory`​，则运行

```bash
sudo ldconfig -v
```

后再检查一次。

## 4 编译安装

### 4.1 下载软件包

根据官方文档（[宇树科技 文档中心 (unitree.com)](https://support.unitree.com/home/zh/Algorithm_Practice/quickstart)）下载代码包。

### 4.2 编译

在工作空间目录下运行

```bash
catkin_make
```

如果报错未找到 `move_base_msgs`​ 包，则先运行

```bash
sudo apt-get install ros-melodic-move-base-msgs
```

‍
