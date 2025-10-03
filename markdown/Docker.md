---
title: "Docker：入門概念"
date: "2025-05-12"
tags:
  - Docker
  - Dockerfile
---

應用程式容器化是現代軟體開發不可或缺的技術。透過 Docker，可以將環境打包成映像檔 (Image)。而 `Dockerfile` 就是用來定義如何建置這個映像檔的藍圖。這篇文章旨在紀錄 Dockerfile 的撰寫技巧、核心概念與最佳實踐。

# Open Container Initiative (OCI)

容器化技術最早源於1979年Keith Tantlinger所提出，這邊的容器是字面上的**容器**，也就是貨運上所看到的貨櫃。
直到2000年，FreeBSD Jails被FreeBSD團隊提出，FreeBSD Jails 不僅隔離了**檔案系統**，還隔離了**網路、使用者和行程**，創造了一個更完整的「_**監獄**_」環境

容器化技術的成功可以歸功於Namespaces (命名空間)
Namespaces 負責**隔離**。它能讓容器內的行程擁有自己獨立的視圖，彷彿它在一個獨立的作業系統中運行。例如：

- PID namespace: 容器內的行程有自己獨立的行程編號 (PID 1)。
- NET namespace: 擁有獨立的網路設備、IP 地址和路由表。
- MNT namespace: 擁有獨立的掛載點和檔案系統。

近一步的發展要到2006年，Google提出Cgroups

Cgroups 負責 **「資源限制與管理」** 。它能限制一個容器可以使用的 CPU、記憶體、硬碟 I/O 等資源，確保容器之間不會互相搶佔資源，避免單一容器耗盡主機所有資源。

---

在Docker出現之前，靠著Namespaces以及Cgroups的操控，就可以達到容器化。缺點在於過程繁瑣及複雜。

而這也成為Docker成為現在主流的原因之一，Docker在於它將複雜的底層技術抽象化，提供舒適的開發者體驗，讓容器化從少數系統管理員的專屬工具，變成了所有開發者都能輕易上手的標準技術。

## OCI 規範

為了建立一個開放且標準化的容器生態系統，OCI 制定了三大核心規範，為容器的生命週期提供了清晰的定義，確保了不同工具之間的互通性。

### 執行階段規範 (Runtime Specification)

OCI 執行階段規範（runtime-spec）定義了容器該如何 **「運行」**。它詳細描述了一個被稱為「OCI Runtime Bundle」的標準檔案系統結構，其中必須包含：

* `config.json`: 這是一個核心設定檔，裡面定義了容器的所有運行參數，例如要執行的命令、環境變數、掛載點、以及前面提到的 Namespaces 和 Cgroups 等資源限制。
* **根檔案系統 (Root Filesystem)**: 一個目錄，包含了容器內部所需的所有檔案與目錄結構。

此規範確保了任何符合 OCI 標準的容器執行引擎（如 runc、crun）都能夠讀取這個 Bundle，並以相同且可預測的方式啟動和管理容器。這意味著，只要您建立了一個符合規範的容器，它就可以在任何支援 OCI 的平台上（例如 Docker、Podman 或 Kubernetes）無縫運行。

### 映像檔規範 (Image Specification)

OCI 映像檔規範（image-spec）定義了容器映像檔的 **「打包格式」**。一個符合 OCI 標準的映像檔主要由以下幾個部分組成：

* **映像檔清單 (Image Manifest)**: 一個 `JSON` 檔案，用來描述映像檔的整體結構，包含了對設定檔和各個檔案系統圖層 (Layers) 的引用（通常是透過其內容的雜湊值）。
* **映像檔設定檔 (Image Config)**: 一個 `JSON` 檔案，包含了映像檔的元數據（Metadata），例如映像檔的作者、建立時間、以及預設的執行參數（如 `config.json` 的內容）。
* **檔案系統圖層 (Filesystem Layers)**: 一系列經過壓縮的檔案系統變更集（通常是 tar 檔案）。容器的根檔案系統是由這些圖層堆疊組合而成的，這種分層設計使得映像檔的儲存和傳輸更有效率。

這個規範讓不同的容器工具（例如 Docker、Buildah、Kaniko）能夠以標準化的方式建立、推送 (push) 和拉取 (pull) 映像檔，確保了映像檔在不同工具和平台之間的可攜性。

### 分發規範 (Distribution Specification)

OCI 分發規範（distribution-spec）定義了容器映像檔 **「如何儲存與分發」** 的標準 API。這個規範主要針對容器倉庫 (Container Registry) 的行為進行了標準化，例如：

* 如何透過 API 上傳 (push) 映像檔的各個圖層和清單。
* 如何透過 API 下載 (pull) 映像檔。
* 如何進行身份驗證與授權。

遵循此規範的容器倉庫（如 Docker Hub, Google Container Registry (GCR), Harbor）可以被任何符合標準的客戶端工具存取。這為容器映像檔的全球分發和共享提供了一個穩定、可靠的基礎設施。

# Docker vs Podman

當我們整天講容器化，Docker已經快變成容器化代名詞了，但我們必須知道容器化技術像前面所說，是遵循OCI，透過Namespaces存取以及Cgroups控制，達成容器化。而Docker只是達成的其中一個手段。

再更深入了解Docker與其他工具的差別前，我們先看看Docker啟動時，他會在背景程序做哪些事情。

## Docker Engine 的核心：Client-Server 架構

要理解 Docker，首先必須認識其核心——**Docker Engine**。它並不是一個單一的程式，這個架構主要由三個部分組成：

*  **Docker 守護行程 (Daemon)**:

   * 這是一個名為 `dockerd` 的持續性背景程序，也是 Docker 的「大腦」與權力核心。
   * 當你的系統開機後，`dockerd` 就會以 `root` 高權限啟動並在背景監聽。
   * 它負責處理所有繁重的工作：管理映像檔、建立與執行容器、設定網路、掛載儲存卷等。基本上，所有與容器生命週期相關的操作都由它一手包辦。

*  **REST API**:

   * `dockerd` 會對外提供一個標準化的 REST API 接口。這套 API 定義了客戶端可以如何與守護行程溝通並命令它執行任務。

*  **Docker 命令列介面 (CLI)**:

   * 這是我們最熟悉的 `docker` 指令。當你在終端機輸入 `docker run` 或 `docker ps` 時，`docker` CLI 並不會自己去執行容器。
   * 相反地，它會將你的指令打包成一個 API 請求，然後發送給在本機上運行的 `dockerd`。`dockerd` 收到請求後，才會執行對應的操作，並將結果回傳給 CLI 顯示。

這個 Client-Server 架構是 Docker 設計的基石，但也正是這個**中央化的 `dockerd` 守護行程**，成為了它與 Podman 最根本的區別。

## Podman：無守護行程 (Daemonless) 架構

Podman (Pod Manager) 的出現，旨在提供一個更符合傳統 Linux/UNIX 哲學的容器管理工具。它最大的特點就是**無守護行程 (Daemonless)**。

Podman 認為，不需要一個永遠在背景以 `root` 權限運行的中央程序來管理容器。

  * 當你執行 `podman run` 時，Podman 會直接從你的 Shell 程序中建立一個子程序來執行容器。
  * 這個過程與你執行 `ls` 或 `cp` 等任何其他 Linux 指令的模式完全相同。
  * 對於需要在背景運行的容器（使用 `-d` 參數），Podman 會啟動一個名為 `conmon` 的超輕量級監控程序來作為容器的「監護人」，而 `podman` 指令本身則會退出。

因為兩者都完全遵循 OCI 規範，所以用 Docker 建構的映像檔可以在 Podman 上完美運行，反之亦然。它們共享相同的標準，但用截然不同的架構來實現它。

### 核心差異比較

| 特性         | Docker                                                                                      | Podman                                                                                                   |
|:-------------|:--------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------|
| **核心架構** | **守護行程 (Daemon)** 一個中央 `dockerd` 程序管理所有容器，所有 `docker` 指令都與它通訊。 | **無守護行程 (Daemonless)** 每個指令都是獨立程序，直接建立容器程序，無中央管理者。                    |
| **安全性**   | **`root` 依賴**`dockerd` 預設以 `root` 權限運行，成為潛在的單點安全風險。               | **預設無根 (Rootless)** 從設計之初就為無根模式優化，可讓普通使用者安全地管理容器，大幅提升安全性。    |
| **系統整合** | **自有管理機制**使用 `--restart=always` 等自有策略管理容器生命週期。                    | **與 Systemd 深度整合** 可輕易為容器產生 `systemd` 服務檔，讓容器像標準的系統服務一樣被管理。         |
| **生態系**   | **All-in-One 平台** Docker 是一個集成了建構、執行、網路等功能的龐大平台。                | **模組化工具集** 專注於容器執行，常與 `Buildah`(建構映像)、`Skopeo`(操作倉庫)等專業工具搭配。        |


* Docker：如果開發者，`Docker Desktop` 提供了無與倫比的便利性和整合體驗。其龐大的社群、豐富的文件和成熟的生態系，使其成為入門和快速開發的首選。
* Podman：如果是SRE/DevOps或需要在 Linux 伺服器上部署正式環境，Podman 的優勢就非常突出。其無守護行程的輕量架構、以安全為核心的無根模式、以及與 `systemd` 的無縫整合，使其成為一個更穩定、更安全、更符合 Linux 管理哲學的伺服器端容器引擎。


# 映像檔分層 (Layers) 與快取 (Cache)

在深入指令之前，必須先理解 Docker 最核心的設計：**分層**。

Dockerfile 中的每一條指令（如 `FROM`, `RUN`, `COPY`）都會在前一層的基礎上，建立一個新的**唯讀層 (read-only layer)**。當你建置映像檔時，Docker 會依序執行這些指令。如果某個指令和其內容（例如 `COPY` 的來源檔案）沒有變更，Docker 會直接使用上次建置時的快取層，而不是重新執行，這大大加速了建置過程。

這個特性導出一個原則：**將變動最不頻繁的指令放在最前面，變動最頻繁的指令放在最後面。**

```dockerfile
WORKDIR /app

# 1. 複製變動最少的 requirements.txt
COPY requirements.txt .
# 2. 安裝依賴套件。只有在 requirements.txt 變更時，這一步才會重新執行
RUN pip install --no-cache-dir -r requirements.txt
# 3. 最後才複製變動最頻繁的應用程式原始碼
COPY . .

CMD ["python", "app.py"]
````

# Dockerfile 基礎指令

Dockerfile 是一個沒有副檔名的純文字檔，就叫做 `Dockerfile`。

  * `FROM`：必須是 Dockerfile 的第一條指令，用來指定基礎映像檔 (Base Image)。
  * `WORKDIR`：設定工作目錄，後續的 `RUN`, `CMD`, `COPY`, `ADD` 等指令都會在這個目錄下執行。
  * `COPY`：複製檔案或目錄到映像檔中。
  * `RUN`：在映像檔建置過程中執行的指令，例如安裝套件。

```dockerfile
FROM python:3.12
WORKDIR /usr/local/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
```

若需切換目錄，可以再次使用 `WORKDIR` 指令，它會影響後續指令的執行位置。

# SHELL vs EXEC form

根據官方文件，我們有兩種方式可以撰寫指令：

## Shell form

`INSTRUCTION command param1 param2`

寫法就像在終端機輸入指令一樣，直觀且可讀性高。Shell form 會透過 `/bin/sh -c` (在 Linux) 或 `cmd /S /C` (在 Windows) 來執行，因此可以使用環境變數、管線 (`|`) 等 Shell 特性。

```dockerfile
RUN source $HOME/.bashrc && \
    echo $HOME
```

## Exec form

`INSTRUCTION ["executable", "param1", "param2"]`

需要傳入一組 JSON 陣列，並且**必須使用雙引號 (`"`)** 而非單引號。

使用 Exec form 的好處是它不會經過 Shell 解析，可以避免非預期的字串處理（如空格、引號、萬用字元 `*`）。這也意味著環境變數如 `$HOME` 不會被自動展開，它會被當作純文字 `$HOME` 傳遞。

```dockerfile
# $HOME 不會被展開
RUN ["echo", "$HOME"]

# 若要使用 Shell 功能，必須明確呼叫 Shell
RUN ["sh", "-c", "echo $HOME"]
```

總結來說，當你不需要 Shell 的特性時，優先使用 Exec form 可以讓指令的行為更精確、可預測。

# ENV & ARG

`ENV` 和 `ARG` 都可用於設定變數，但它們的生命週期和作用域完全不同。

* `ARG` (Argument): 建置時期 (build-time) 變數。

    * 僅在 `docker build` 過程中存在。
    * 可以透過 `--build-arg <varname>=<value>` 在建置時傳遞。
    * **不會**被儲存在最終的映像檔中。
    * 注意：`ARG` 變數在 `FROM` 指令後會失效，若要繼續使用，必須重新宣告。

* `ENV` (Environment): 執行時期 (run-time)環境變數。

    * 在 `docker build` 過程中設定。
    * 會被永久寫入映像檔中，在容器執行時依然可用。
    * `ENV key=val` 支援單行宣告多個變數。

```dockerfile
# 使用 ARG 來定義 Python 版本作為建構時變數
ARG PYTHON_VERSION=3.12

# FROM 指令設定 Base Image
FROM python:${PYTHON_VERSION}-slim

# 在 FROM 之後 ARG 會失效，若要給後續指令使用需重新宣告
ARG PYTHON_VERSION

# 使用 ENV 設定環境變數，這些變數在容器執行時依然存在
ENV APP_HOME=/app \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    TZ=Asia/Taipei
```


> `ENV` 會將變數值寫入映像檔中，任何人只要取得映像檔，就能透過 `docker inspect` 看到這些值。**因此，絕對不要使用 `ENV` 來儲存 API Keys、密碼等敏感資訊！**

# ADD vs COPY

`ADD` 和 `COPY` 功能相似，但行為有所不同。

## COPY

**永遠優先使用 `COPY`**。它的功能單純、可預測：就是將指定的檔案或目錄從建置上下文 (build context) 複製到映像檔的指定路徑。

```dockerfile
COPY requirements.txt .
COPY src/ /usr/local/app/src/
```

## ADD

`ADD` 是 `COPY` 的超集，但它的額外功能可能導致非預期的行為：

  * **自動解壓縮：** 如果來源檔是本地的壓縮檔（如 `.tar.gz`, `.zip`），`ADD` 會自動將其解壓縮到目標位置。
  * **支援 URL：** 來源可以是 URL，`ADD` 會下載檔案到目標位置。

這些「智慧」功能使得 `ADD` 的行為變得難以預測。例如，你可能只是想複製一個 `.tar.gz` 檔案，但它卻被自動解開了。因此，除非你**明確需要**自動解壓縮的功能，否則請堅持使用 `COPY`。

# RUN

`RUN` 指令用於在映像檔上執行命令並建立新的層。這些變更會被快取，以加速後續建置。

  * 串接指令與清理： 將多個指令用 `&&` 串接在同一個 `RUN` 中，並在結尾清除快取，可以有效減少映像檔的層數和大小。
  * 提高可讀性： 使用 `\` 進行換行。

```dockerfile
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        curl \
        git \
    && rm -rf /var/lib/apt/lists/*
```

## --mount

`--mount` 可以在建置過程中掛載檔案系統，而**不會**將這些檔案包含在最終的映像檔層中，非常適合處理快取和密鑰。

  * **掛載套件快取**以加速依賴安裝：
    ```dockerfile
    RUN --mount=type=cache,target=/root/.cache/pip \
        pip install -r requirements.txt
    ```
  * **掛載密鑰**以存取私有資源（例如 SSH key）：
    ```dockerfile
    RUN --mount=type=secret,id=mysecret,dst=/secrets/secret_file.txt \
        cat /secrets/secret_file.txt
    ```

# CMD vs ENTRYPOINT

這兩個指令決定了當容器啟動時，預設要執行的命令是什麼。

## CMD

`CMD` 用於為執行的容器提供**預設命令或參數**。

  * **特性：** 如果在 `docker run` 後面提供了其他命令，`CMD` 的內容會被**完全覆蓋**。
  * **用途：** 提供一個預設的執行行為。
  * **形式：** 推薦使用 Exec form `CMD ["executable", "param1"]`。

```dockerfile
# 容器啟動時預設執行 `python app.py`
CMD ["python", "app.py"]
```

  * `docker run <image>` -\> 執行 `python app.py`
  * `docker run <image> python manage.py shell` -\> `CMD` 被覆蓋，改執行 `python manage.py shell`

## ENTRYPOINT

`ENTRYPOINT` 則是將容器設定成一個**可執行檔**。

  * **特性：** `docker run` 後面提供的內容會被當作**參數**傳遞給 `ENTRYPOINT` 指令，而**不會**覆蓋它。
  * **用途：** 建立一個行為固定的容器，只接受不同的參數。
  * **形式：** 推薦使用 Exec form `ENTRYPOINT ["executable", "param1"]`。

```dockerfile
ENTRYPOINT ["ping", "-c", "3"]
CMD ["localhost"] # 提供預設參數
```

  * `docker run <image>` -\> 執行 `ping -c 3 localhost`
  * `docker run <image> google.com` -\> `CMD` 被覆蓋，執行 `ping -c 3 google.com`

# Best Practices

### 1\. 使用 `.dockerignore` 保持映像檔乾淨

在 Dockerfile 的同層目錄下建立一個 `.dockerignore` 檔案，語法類似 `.gitignore`。告訴 Docker 在建置時忽略哪些檔案或目錄。

**好處：**

  * **減小映像檔大小：** 避免打包 `.git`, `node_modules`, `*.log`, `*.md` 等不必要的檔案。
  * **加速建置：** 減少傳輸到 Docker Daemon 的上下文 (build context) 大小。
  * **避免快取失效：** 修改日誌或 README 不會導致 `COPY . .` 的快取失效。
  * **提升安全性：** 避免將 `.env`, `id_rsa` 等敏感檔案複製到映像檔。

### 2\. 提升安全性：使用非 Root 使用者

預設情況下，容器內的程序是以 `root` 使用者身分執行的，這存在安全風險。最佳實踐是建立一個專用的非 root 使用者來執行應用程式。

```dockerfile
FROM python:3.12-slim
WORKDIR /app

# 建立一個非 root 使用者和群組
RUN addgroup --system app && adduser --system --group app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

# 切換到新建立的使用者
USER app

CMD ["python", "app.py"]
```


# Python 應用程式範例

```dockerfile
# 1. 建置階段 (Builder Stage)
FROM python:3.12-slim AS builder

WORKDIR /usr/src/app

# 安裝編譯依賴，並建立虛擬環境
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc && \
    python -m venv /opt/venv

# 啟動虛擬環境
ENV PATH="/opt/venv/bin:$PATH"

# 複製並安裝 Python 套件
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


# 2. 正式環境階段 (Production Stage)
FROM python:3.12-slim

WORKDIR /usr/src/app

# 建立非 root 使用者
RUN addgroup --system app && adduser --system --group app

# 從 builder 階段複製虛擬環境
COPY --from=builder /opt/venv /opt/venv

# 複製應用程式原始碼
COPY . .

# 設定環境變數，讓 python 指向 venv
ENV PATH="/opt/venv/bin:$PATH"

# 切換使用者
USER app

# 設定容器啟動指令
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "my_project.wsgi"]
```


# Appendix

[什麼是容器化？](https://aws.amazon.com/tw/what-is/containerization/)\
[[Day2] 淺談 Container 實現原理, 以 Docker 為例(I)](https://ithelp.ithome.com.tw/m/articles/10216215)\
[[Day3] 淺談 Container 實現原理, 探討 OCI 實作](https://ithelp.ithome.com.tw/m/articles/10216880)\
[Introduction to Containerization: A Beginner’s Walkthrough](https://medium.com/@stefan.paladuta17/introduction-to-containerization-a-beginners-walkthrough-f5dc2508e16f)