---
title: Yt-dlp 存擋不再錯過
tags:
  - Python
  - Basics
  - Youtube
categories:
  - Notes
date: 2024-02-28 00:17:45
---


[本文專案來源](https://github.com/yt-dlp/yt-dlp?source=post_page-----a4b8889ba1e0--------------------------------)

# 簡介

這篇文將帶過如何快速使用Yt-dlp來下載Youtube上影片或是直播內容，避免閱讀繁瑣的說明書

# 安裝

不論你是任何作業系統，我都建議使用Python搭配pip作為環境使用。
本文將在MacOS底下操作，如有遇到任何問題，可以參照官方手冊。

> 創造你的環境，不論使用conde env或是virtualenv，確保使用Python3.8+

`conda create --name yt-dlp python=3.11`
接著 `pip install yt-dlp`

完成安裝後，`yt-dlp --version` 確認當前版本。

---


<!--more-->

如果你也是Mac用戶，建議在安裝步驟也安裝ffmpeg，`brew install ffmpeg`。
如果你是其他系統用戶，可以參考官方文件[ffmpeg download](https://ffmpeg.org/download.html)


# 使用

## 快速上手

### 顯示選項

下載也可以選擇要走Full HD、720p等選項
使用`yt-dlp --list-formats [Youtube url]` 會看到可以使用的影像和音檔規格。

### 使用檔案下載

當然你也可以準備一個文字檔案，裡面放好要下載的網址

```
# urls.txt
Url1
Url2
Url3

```

接著使用`yt-dlp --no-abort-on-error -f "bv*+ba/b" --batch-file urls.txt  --no-overwrites --write-thumbnail --write-all-thumbnails`
來接力下載預設好的內容。

- `--no-abotr-error`會避免失敗後，結束整個urls檔案的下載
- `-f`會指定要下載的格式，之前安裝ffmpeg是為了要把影像跟音訊兩檔案做結合步驟 
- `--batch-file` 指定來源檔案
- `--no-overwrites`會避免複寫任何檔案，避免是下載過，或是剛好命名相同
- `--write-all-thumbnails`會將封面圖下載，all的選項會包括webp, png, jpeg等格式都下載

> 多數情況我會使用`yt-dlp --no-abort-on-error -f “bv*+ba/b” --batch-file url.txt --no-overwrites --write-thumbnail --write-all-thumbnails` 算是準備一個檔案就可以輕鬆操作。

# 進階使用
## 直播內容

`yt-dlp --live-from-start --wait-for-video 30 [url]`

- `--live-from-start`會將直播從頭下載，大部分應該會選用這選項
- `--wait-for-video` 有時候直播尚未開始，可以選用，程式會間隔每[]秒確認直播開始沒

## 日期選擇

在下載影片清單時，可以使用`--datebefore DATE`或是`--dateafter DATE`來指定影片的區間。
DATE的格式為`YYYYMMDD`，再丟網址時，可以再透過`--yes-playlist`或是`--no-playlist`來進一步控制是否下載影片清單全部內容

# TL;DR

多數情況下面這條指令可以解決，若有多個影片也只是新增文字檔案裡面而已。

`yt-dlp --no-abort-on-error -f "bv*+ba/b" --batch-file url.txt --no-overwrites --write-thumbnail --write-all-thumbnailsb
`

---

若是下載直播檔案，則使用
`yt-dlp --live-from-start --wait-for-video 15 [url]`
`wait-for-video`可以選用，如果是還沒開始串流的影片的話。




