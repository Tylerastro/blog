---
title: whisper
tags:
  - Python
  - Youtube
categories:
  - Notes
date: 2024-08-10 15:13:54
---

原文章在 Medium 上：[Effortless YouTube Transcriptions: Combining yt-dlp and Whisper](https://medium.com/@tylerastro/effortless-youtube-transcriptions-combining-yt-dlp-and-whisper-2098ff0511cd)

## Whisper

[Whisper](https://github.com/openai/whisper) 是 OpenAI 在 2021 年推出的翻譯模型，在 2022 年釋出開源版本。

> Whisper is a general-purpose speech recognition model. It is trained on a large dataset of diverse audio and is also a multitasking model that can perform multilingual speech recognition, speech translation, and language identification.

因為強大的翻譯能力，我們可以拿來做影片的逐字稿。

## 素材

需要翻譯用的素材當然就需要音檔，如果沒有音檔需要從 YouTube 上下載，可以使用[yt-dlp](https://tylerastro.github.io/2024/02/28/ytdlp/)來下載。 記得選擇 format 的時候可以挑選音檔即可，可以加快下載時間。

## 使用

安裝以及使用上相當簡相當，但需要注意的是如果沒有 GPU，速度上會慢上許多，此時就會建議使用 Google Colab 來執行。
文末會提供一個 Colab 來執行。

### 安裝

`pip install -U openai-whisper;{copy:true}` 即可安裝
安裝完後，可以到[Whisper](https://github.com/openai/whisper)查看要使用哪個模型。
目前官方提供的模型有

- tiny
- tiny.en
- base
- base.en
- small
- small.en
- medium
- medium.en
- large

en 結尾的是針對英文加強模型，也是只能使用在英文上，使用較小的模型即可達到不錯的效果。

### 使用

```js
import whisper

model = whisper.load_model("large") # 選擇你的模型名稱
result = model.transcribe("path/to/your/file")
```

```python
model.transcribe(name, verbose=verbose, word_timestamps=time_stamp, task=task)
在Transcribe底下，可以帶verbose, word_timestamps和task參數。
- verbose: 會顯示目前已經完成的逐字稿
- word_timestamps: 會顯示每個字的時間戳記
- task 可以帶入`translate`，把非英文的語音轉成英文，但這項功能會導致timestamp無法正確顯示
```

## Colab

底下是簡易的 Colab 執行筆記本，選擇好需要翻譯的影片網址，然後一路執行即可。

[Colab](https://colab.research.google.com/drive/1d5_A0szd4XkLoe4rK-TbumAO_9vc2oEK?usp=sharing)
