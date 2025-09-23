---
title: "Dockerfile：入門概念"
date: "2025-05-12"
tags:
  - Docker
  - Dockerfile
---

應用程式容器化是現代軟體開發不可或缺的技術。透過 Docker，可以將環境打包成映像檔 (Image)。而 `Dockerfile` 就是用來定義如何建置這個映像檔的藍圖。這篇文章旨在紀錄 Dockerfile 的撰寫技巧、核心概念與最佳實踐。

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