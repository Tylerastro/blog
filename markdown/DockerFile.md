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



ARG (Argument)：用於定義建構時期變數。您可以在使用 docker build 命令時透過 --build-arg 旗標傳遞數值來覆寫預設值。ARG 變數不會持久儲存在最終的映像檔中。
ENV (Environment)：用於設定環境變數。這些變數會被應用於 Dockerfile 中後續的大部分指令，並且會持久儲存在最終的映像檔中，在容器執行時可用。

## RUN

在了解兩種寫指令的形式之後，我們可以開始撰寫`RUN`的指令，`RUN`會在IMAGE上添加新的layer，也就是`RUN`的指令會被保存，並且被快取起來。









