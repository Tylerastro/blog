---
title: "Docker vs VM"
date: "2025-09-23"
tags:
  - Docker
  - Dockerfile
  - VM
  - OS
draft: true
---

# Docker vs. 虛擬機器 (VM)

想像一下你要為自己找個地方住，你有兩種選擇：

  * **虛擬機器 (VM) 就像一棟獨立的房子**：

      * 你有自己完整的土地（硬體）、獨立的水電瓦斯系統（作業系統核心）、牆壁和屋頂。
      * 你可以完全自由地裝潢內部（安裝任何你想要的作業系統和軟體）。
      * **優點**：完全獨立、隔離性極強，安全性高。
      * **缺點**：蓋一棟房子成本高、耗時長（啟動慢）、佔用大量土地和資源（硬碟、記憶體）。

  * **Docker 容器 (Container) 就像一棟公寓大樓裡的一間公寓**：

      * 你和其他住戶共享大樓的地基和主要管線（主機的作業系統核心）。
      * 但你有自己獨立的房間、門鎖和家具（應用程式和它的依賴函式庫）。
      * **優點**：資源共享，建造快速（秒級啟動），輕量且高效。
      * **缺點**：雖然有隔離，但畢竟共享基礎設施，隔離性不如獨立房子。

# 架構上的核心差異

## 虛擬機器 (Virtual Machine)

VM 透過一個稱為 **Hypervisor**（虛擬化管理程序）的軟體層，在實體硬體上模擬出一個完整的虛擬硬體環境（CPU、記憶體、硬碟、網卡等）。然後，你可以在這個虛擬硬體上安裝一個 **Guest OS** 。

**架構圖：**

```
+----------------------------------------+
|              你的應用程式 A              |
|----------------------------------------|
|            函式庫 (Bins/Libs)           |
|----------------------------------------|
|             客座作業系統 (Guest OS)      |
+========================================+  <-- VM 1
|             虛擬硬體                    |
+----------------------------------------+
|              Hypervisor                |
+----------------------------------------+
|             主機作業系統 (Host OS)       |
+----------------------------------------+
|               實體硬體                  |
+----------------------------------------+
```

## Docker 容器 (Container)

Docker 採用的是 **作業系統層級的虛擬化**。它不模擬硬體，而是透過 Docker 引擎直接與**主機的作業系統核心**進行溝通，為每個應用程式建立一個隔離的執行環境（稱為容器）。

**架構圖：**

```
+------------------+  +------------------+
|    應用程式 A     |  |    應用程式 B     |
|------------------|  |------------------|
|  函式庫 (Bins/Libs) |  |  函式庫 (Bins/Libs) |
+==================+  +==================+  <-- Container 1 & 2
|                  Docker 引擎                 |
+----------------------------------------------+
|               主機作業系統 (Host OS)          |
+----------------------------------------------+
|                     實體硬體                  |
+----------------------------------------------+
```

  * **關鍵字**：作業系統層級的虛擬化。
  * **重點**：所有容器共享同一個主機的作業系統核心。

## 主要差異比較表

| 特性 | 虛擬機器 (Virtual Machine) | Docker 容器 (Container) |
| :--- | :--- | :--- |
| **啟動速度** | 分鐘等級 | 秒級或毫秒級 |
| **資源消耗** | 高（GB 等級的記憶體和硬碟） | 低（MB 等級的記憶體和硬碟） |
| **隔離性** | 強（完全的作業系統隔離） | 弱（共享主機核心，行程級隔離） |
| **大小** | 巨大（通常為數 GB 到數十 GB） | 輕量（通常為數十 MB 到數百 MB） |
| **效能** | 較低（因為有 Hypervisor 和 Guest OS 的額外開銷） | 接近原生（直接在主機核心上執行） |
| **跨平台** | 非常好（可以在 Mac 上跑 Windows VM） | 有限（Linux 容器需在 Linux 核心上執行） |

# 底層實作邏輯：Linux 核心的四大功臣

## 網路命名空間 (Network Namespaces)

這是實現**隔離**的基石。當你啟動一個 Docker 容器時，Docker 會為它建立一個獨立的「網路命名空間」。

  * **作用**：每個網路命名空間都像一個獨立的網路小世界，它有自己**獨立的網路堆疊 (Network Stack)**，包括：
      * 網路介面卡 (e.g., `lo`, `eth0`)
      * 路由表 (Routing Table)
      * 防火牆規則 (iptables)
      * 通訊埠號碼空間 (Port Numbers)
  * **結果**：容器 A 在 80 埠上執行的服務，與容器 B 在 80 埠上執行的服務**完全不會衝突**，因為它們位於不同的命名空間，就像兩戶人家都有自己的「客廳」，互不干擾。

## 虛擬乙太網路對 (Virtual Ethernet Pair, `veth`)

命名空間實現了隔離，但隔離的空間要如何與外界連接呢？這就要靠 `veth` 了。

  * **作用**：`veth` 就像一條虛擬的「網路線」，它永遠是**成對出現**的。你可以把它的一端插在一個網路命名空間（例如容器內），另一端插在另一個命名空間（例如主機上）。
  * **Docker 的作法**：當一個容器啟動時，Docker 會：
    1.  在容器的網路命名空間裡建立一個虛擬網卡，通常叫做 `eth0`。
    2.  在主機的根網路命名空間裡建立一個對應的虛擬網卡，例如 `veth_xxx`。
    3.  這兩個網卡就形成了一對 `veth`，從一端發送的網路封包會立即在另一端出現。

## 虛擬網橋 (Linux Bridge)

現在每個容器都有一條「網路線」連到主機上了，但這些容器之間要如何溝通？答案是把這些線接到一個共同的「虛擬交換器」上。

  * **作用**：Linux 橋接器在核心層級運作，功能類似於一個實體的 L2 網路交換器 (Switch)。
  * **Docker 的作法**：
    1.  Docker 在主機上建立一個名為 `docker0` 的虛擬網橋。
    2.  所有容器連到主機的 `veth_xxx` 網卡，都會被「插」到這個 `docker0` 網橋上。
    3.  如此一來，所有接在同一個網橋上的容器，就構成了一個虛擬的區域網路 (LAN)，它們可以透過 IP 位址互相通訊。

## iptables (Netfilter)

`iptables` 是 Linux 核心內建的防火牆與網路位址轉譯 (NAT) 工具，它負責掌管容器的**對外連線**和**對外暴露**。

  * **對外連網 (容器 -\> 外部)**：

      * 當容器內的應用程式要訪問外部網路（例如 `google.com`）時，網路封包會從容器的 `eth0` -\> 主機的 `veth_xxx` -\> `docker0` 網橋。
      * 接著，主機的 `iptables` 規則會進行**來源網路位址轉譯 (Source NAT, SNAT)**，將封包的來源 IP 從「容器的內部 IP」改成「主機的公開 IP」，然後再透過主機的實體網卡 (`eth0`) 送出去。
      * 這與你家裡的 WiFi 路由器運作原理完全相同。

  * **對外暴露 (外部 -\> 容器)**：

      * 當你執行 `docker run -p 8080:80` 時，Docker 會設定一條 `iptables` 規則。
      * 這條規則會進行**目的網路位址轉譯 (Destination NAT, DNAT)**，它會監聽主機的 `8080` 埠。
      * 任何送到主機 `8080` 埠的流量，都會被 `iptables` 自動轉發到對應容器的內部 IP 和 `80` 埠。

-----

# 網路模式實戰

我們來看看 Docker 提供了哪些網路模式來應用這些技術。

> Containers have networking enabled by default, and they can make outgoing connections. A container has no information about what kind of network it's attached to, or whether their peers are also Docker workloads or not. A container only sees a network interface with an IP address, a gateway, a routing table, DNS services, and other networking details. That is, unless the container uses the none network driver.

根據官方文件闡述，容器本身有預設網路設定，容器本身並不知道這些接口是對到本機或是其他容器。

## Publish ports

開始前我們必須先知道要如何開啟這些接口

> By default, when you create or run a container using docker create or docker run, containers on bridge networks don't expose any ports to the outside world.

根據官方文件，Docker並不會主動打開接口，即使有default網路。

## 常見網路Drivers

### a. 預設橋接網路 (Default Bridge Network) - 最常見

這是 `docker run` 時的預設模式，它會使用我們上面提到的 `docker0` 網橋。

  * **容器間溝通**：

      * 同在 `docker0` 網路下的容器，可以**透過內部 IP 位址**互相溝通。
      * **缺點**：預設橋接網路不提供自動的 DNS 解析。你不能直接用容器名稱來溝通。

  * **範例**：

    ```bash
    # 啟動一個 nginx 容器
    docker run -d --name webserver nginx

    # 啟動一個 alpine 容器，並進入其 shell
    docker run -it --rm alpine sh

    # 在 alpine 容器內，先找到 webserver 的 IP
    # (假設查到是 172.17.0.2)
    # 然後 ping 它
    / # ping 172.17.0.2
    PING 172.17.0.2 (172.17.0.2): 56 data bytes
    64 bytes from 172.17.0.2: seq=0 ttl=64 time=0.152 ms
    ```

### b. 自定義橋接網路 (User-Defined Bridge Network) - **官方推薦**

這是Docker 應用的最常見方式。可以自己建立一個專用的虛擬網路。

  * **運作方式**：原理與預設橋接網路相同，但 Docker 會為你建立一個**新的專屬網橋**，而不是使用 `docker0`。
  * **優點**：
    1.  **自動 DNS 解析**：在同一個自定義網路中的容器，可以**直接使用容器名稱**作為主機名稱來互相溝通！Docker 內建了一個 DNS 伺服器來處理這件事。
    2.  **更好的隔離**：只有在同一個自定義網路中的容器才能互相通訊，提供了比預設網路更好的安全性。
  * **範例**：
    ```bash
    # 1. 建立一個自定義網路
    docker network create my-app-net

    # 2. 啟動一個後端資料庫容器，並將其加入網路
    docker run -d --network my-app-net --name database postgres

    # 3. 啟動一個應用程式容器，也加入該網路
    docker run -it --rm --network my-app-net alpine sh

    # 4. 在 alpine 容器內，直接 ping 容器名稱！
    / # ping database
    PING database (172.18.0.2): 56 data bytes
    64 bytes from 172.18.0.2: seq=0 ttl=64 time=0.183 ms
    # 它成功了！不需要再手動查 IP。
    ```

### c. 主機網路 (Host Network)

  * **運作方式**：`docker run --network host ...`。此模式下，容器將**不會擁有自己的網路命名空間**。它會直接共享主機的網路堆疊。
  * **優點**：網路效能最高，因為它移除了 NAT 帶來的額外處理層。
  * **缺點**：
      * 容器內應用程式監聽的埠會直接佔用主機的埠，容易發生埠衝突。
      * 犧牲了網路隔離性，安全性較低。
  * **適用場景**：對網路延遲極度敏感的高效能應用。

### d. 其他網路模式

  * **Overlay Network**：用於 Docker Swarm 或 Kubernetes 等多主機叢集環境，可以讓分佈在不同主機上的容器感覺像在同一個區域網路內，進行跨主機通訊。
  * **None Network**：`docker run --network none ...`。容器擁有自己的網路命名空間，但裡面只有一個迴環介面 (`lo`)，完全不與外界連接。適用於執行批次任務等不需要網路的場景。

### 總結方法
The following network drivers are available by default, and provide core networking functionality:

| Driver | Description |
|--------|-------------:|
| bridge | The default network driver. |
| host | Remove network isolation between the container and the Docker host. |
| none | Completely isolate a container from the host and other containers. |
| overlay | Overlay networks connect multiple Docker daemons together. |
| ipvlan | IPvlan networks provide full control over both IPv4 and IPv6 addressing. |
| macvlan | Assign a MAC address to a container. |


# Appendix

[AWS Docker 與 VM 之間有何區別？](https://aws.amazon.com/tw/compare/the-difference-between-docker-vm/)
[Networking overview](https://docs.docker.com/engine/network/)
[Day 24: 什麼是 veth pair?](https://ithelp.ithome.com.tw/articles/10306574)