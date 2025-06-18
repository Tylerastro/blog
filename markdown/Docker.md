---
title: "DockerFile"
date: "2025-05-12"
tags:
  - Docker
  - Dockerfile
---

應用程式容器化已經是現在不可或缺的技術之一，這篇文章想要紀錄Dockerfile的攥寫技巧以及該注意的事項。

# Dockerfile

## A good start

Dockerfile是一個文字檔，沒有副檔名，但純就叫做`Dockerfile`。
使用上平鋪直敘，也非yaml格式，剛接觸可能會有些不習慣。

- Dockerfile必須用FROM指令開頭
- Docker會依照順序執行指令
- WORKDIR會指向工作目錄，影響到後面`RUN`, `CMD`等指令

一個好的開始就從FROM開始定義，指向我們需要的工作目錄，安裝需要的函式庫

```Dockerfile
FROM python:3.12
WORKDIR /usr/local/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
```

---

然而如果我們需要切換不同工作目錄，WORKDIR可以重新指向，影響後面的指令執行位置。

## SHELL & EXEC form

接下來我們要了解如何在dockerfile裡面寫下指令。
根據官方我們有兩種寫法Shell form 以及 Exec form

### shell form

shell form: `INSTRUCTION command param1 param2`
在使用shell form的時候，寫法就像在使用終端機一樣，增加了可讀性

```bash
RUN source $HOME/.bashrc && \
echo $HOME
```

### exec form

exec form需要傳入一組JSON array，必須注意使用double quotes (")而非single quotes(')
使用exec form的好處在於傳入值，避免了字串的清理，舉例來說空格、引號、萬用字元(*)、重新導向(>)等等

相對這也意味著沒有使用shell情況下，若導入環境變數`$HOME`在exec form並不會被轉成實際路徑，而是會以純文字`$HOME`被執行。


---

總結來說，使用 Exec 形式可以在不需要 Shell 特性的情況下，確保指令及其引數能夠精確地傳遞給要執行的程式，避免了 Shell 在執行前對指令字串進行的可能難以預測的處理

## ENV & ARG

`ENV`是拿來宣告環境變數，並且會保持到最終映像檔中，`ENV key=val key=val`另外ENV宣告也支援多變數在同一行。
ENV宣告開始，後續指令都可以吃到該變數，引用方式為`$variable_name` 或 `${variable_name}`

---

ARG (Argument)：用於定義建構時期(build time)變數。可以在使用 docker build 命令時透過 --build-arg 傳遞數值來覆寫預設值。ARG 變數不會持久儲存在最終的映像檔中。
ENV (Environment)：用於設定環境變數。這些變數會被應用於 Dockerfile 中後續的大部分指令，並且會持久儲存在最終的映像檔中，在容器執行時可用。

---

```Dockerfile
# 使用 ARG 來定義 Python 版本作為建構時變數
ARG PYTHON_VERSION=3.9

# FROM 指令設定Base Image
FROM python:${PYTHON_VERSION}-slim

# 使用 ENV 設定環境變數
ENV APP_HOME=/app \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    TZ=Asia/Taipei
```

### Why ARG not working

另外需要注意到的是ARG在每一次`FROM`指令之後都會被重設，也就是說在上面這個範例，如果要在ENV階段在讀取PYTHON_VERSION會讀取不到，必須重新宣告`ARG PYTHON_VERSION`才會繼承已經宣告的值。

### Cautions

ENV會將變數寫入environment variable，也就是如果用docker inspect能夠看到變數值。
換句話說，ENV不適合放置API key等敏感資訊，如果映像檔流出，等同把密鑰都流出了。

## ADD & COPY

`ADD`跟`COPY`兩者功用很像，都是將目標檔案傳入映像檔中，我們在這邊仔細看看兩者微小的差異在哪裡。

### COPY

建議上會使用COPY優先，因為功能單純可預測，把檔案複製到目標位置。
像是把底下的requirements.txt複製到先前設置的WORKDIR。
```
COPY requirements.txt .
```

雖然這寫法很常見，但官方建議使用`bind`的方法，這樣檔案不會保存進去最終映像檔中，只會暫時性的掛載上去。
```CMD
RUN --mount=type=bind,source=requirements.txt,target=/tmp/requirements.txt \
    pip install --requirement /tmp/requirements.txt
```

### ADD

ADD功能更強大，但也就更無法預測結果，因為ADD指令會自動解壓縮，並且接受URL進行下載。使用上的方法為`ADD src dest`並接受多個src以及wildcard。

- 如果src是一個本地端檔案或目錄，則會複製到目標位置
- 如果src是一個本地端壓縮檔，則會解壓縮到目標位置
- 如果src是一個網址，則會將將網址檔案下載到目標位置
- 如果src是一個git repo，則會將repo clone到目標位置


在2013有討論串討論這項功能，甚至2024年仍然還有相關討論是否自動解壓縮，或是不同的壓縮格式。
[ADD in Dockerfile copy the file instead of decompressing it #2369](https://github.com/moby/moby/issues/2369)



## RUN

在了解兩種指令撰寫形式（Shell 與 Exec）後，我們可以開始使用 `RUN` 指令來對映像檔進行變更。`RUN` 用於**執行指令並在映像上建立新的層 (layer)**，這些變更會被快取，以加速後續建置流程。

### 指令範例與最佳實踐

例如：

```dockerfile
RUN apt-get update && apt-get dist-upgrade -y && rm -rf /var/lib/apt/lists/*
```

這行指令示範了常見的升級作業，並遵循以下最佳實踐：

* **結合 `update` 和 `install`** 以避免快取錯誤。
* 使用 `&&` 串聯指令，並可搭配 `\` 拆成多行，提高可讀性。
* 安裝完後**清除快取**以減少映像大小。

### Shell vs Exec 形式

* **Shell 形式**：預設使用 `/bin/sh -c`，支援變數替換、管道指令與 here-document。

  * 可使用反斜線換行，提升可讀性。
  * 適合需要 shell 功能的場景，例如 `apt-get` 安裝、設定環境變數等。
* **Exec 形式**：避免 shell 處理，採用 JSON 陣列語法。

  * 不支援變數替換，需顯式呼叫 shell，如：

    ```dockerfile
    RUN ["sh", "-c", "echo $HOME"]
    ```
  * 適用於對執行指令安全性或字串解析較敏感的情境。

### 常見使用情境分類

#### 1. 安裝軟體

```dockerfile
RUN apt-get update && \
    apt-get install -y curl git && \
    rm -rf /var/lib/apt/lists/*
```

* **結合安裝與清理**，減少映像體積。
* 可指定版本號提升穩定性，如：`s3cmd=1.1.*`。

#### 2. 建立內部檔案

```dockerfile
RUN echo "export PATH=\"$PATH:/custom/bin\"" >> /etc/profile.d/custom_path.sh
```

* 透過 Shell 形式寫入配置，常用於環境變數設定。

#### 3. 執行多行腳本

```dockerfile
RUN <<EOF
#!/bin/bash
set -e
mkdir -p /app/logs
echo "初始化完成"
EOF
```

* 使用 here-documents 管理複數行邏輯，語意更清晰。


#### 4. 使用快取與掛載

```dockerfile
RUN --mount=type=cache,target=/root/.cache \
    pip install -r requirements.txt
```

* 建立快取點以加速重複建置。

### 進階選項

#### --mount

* `type=bind`：掛載主機檔案進建置容器。
* `type=cache`：建立快取資料夾。
* `type=tmpfs`：使用記憶體掛載暫存資料。
* `type=secret`：注入敏感資訊（如私鑰）。
* `type=ssh`：提供 Git 或 CI/CD 存取權。

#### --network

* `default`：預設網路環境。
* `none`：完全隔離的無網路模式。
* `host`：使用主機網路，常見於需要存取內部服務的建置情境。

#### --security

* `sandbox`：預設安全模式。
* `insecure`：允許需要提權的操作，需明確授權。

### 快取失效策略

* `RUN` 層快取不會自動失效。
* 可使用 `docker build --no-cache` 強制重建。
* `COPY` 和 `ADD` 的變動會影響快取是否生效。
* 使用 `ARG` 傳遞變數時，只要值變動也會導致 `RUN` 快取失效。

### 使用環境變數

* 使用 `ENV` 宣告的變數可用於 `RUN` 指令中：

```dockerfile
ENV APP_HOME=/app
RUN mkdir -p $APP_HOME/logs
```

* 使用 Shell 形式才能正常替換變數；Exec 形式需透過 `sh -c` 手動呼叫 shell。


