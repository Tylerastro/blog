---
title: Github.io個人網站架設
categories:
- Notes
tags: Hexo
date: 2021-07-27 15:23:19
preview: 一切的啟發源自看到[白噪音](https://wn86.github.io/2021/01/04/test/#more)的Blog架設，雖然她沒有往後更新，不過持續在[Twitch](https://www.twitch.tv/cantbackdown86)開台，是個蠻有趣的人。之後也嘗試在Medium寫文章，但是Medium推廣Membership的制度，讓我很不開心，我寫文章大都是為了筆記或者分享，而不是要盈利，付費文章我很認同，但是Medium上很常點閱到標題寫的很好，但是內容乏善可陳，然後還要扣我free member-only stories。
---


# 前言

一切的啟發源自看到[白噪音](https://wn86.github.io/2021/01/04/test/#more)的Blog架設，雖然她沒有往後更新，不過持續在[Twitch](https://www.twitch.tv/cantbackdown86)開台，是個蠻有趣的人。之後也嘗試在Medium寫文章，但是Medium推廣Membership的制度，讓我很不開心，我寫文章大都是為了筆記或者分享，而不是要盈利，付費文章我很認同，但是Medium上很常點閱到標題寫的很好，但是內容乏善可陳，然後還要扣我free member-only stories。
Medium上文章仍會持續更新，但兩邊內容不會做同步處理。


<!--more-->

# 使用Github建立靜態網頁

Google就會有很多相關教學，我把我相關的經驗寫下，希望對剛加入的人有幫助。

---

## 什麼是Git/GitHub?

Git是版本控制系統，假設今天Google有個企劃叫做Google Care，目的是研發軟體可以影像辨識人體健康疾病，而有10個人在負責寫程式，而在分工下，必須記錄這檔案被誰編輯，更改了哪些地方，或者做了哪些檔案處理，Git就是負責記錄的軟體。
如果有興趣了解更多，可以參考[為你自己學 Git](https://gitbook.tw)，我並沒有買，不過網站上的內容足以應付日常需求。



GitHub是全球最大的程式碼倉庫，你可以存放代碼在上面，或者與其他開發者一同開發程式。我們建立個人網站基於GitHub所提供的服務上，所以需要GitHub的帳號。

## GitHub Pages

[GitHub Pages](https://pages.github.com)官網上已經有提供基本的講解，這一部分只是翻譯成中文，然後一步一步照做而已

1. 建立倉庫(Create your repository)

![Create your repository](/Github-io個人網站架設/Create.png)
在建立倉庫的頁面，記得一定要輸入跟你帳戶(Owner)一樣的名稱，例如我的名稱是`Tylerastro`，那我的倉庫名稱(Repository name)就要是`tylerastro.github.io`
建立完成後，要改subdomain name都是可以的

2. 建立Pages

在建立完成倉庫後，進到倉庫的設定頁面
在左邊選取Pages，進到裡面的設定，在Theme chooser裡面選想要的主題之後，就可以在https://[username].github.io/ 看到你的網站了。

完成後，頁面應該會像這樣，顯示出你的網址，網址裡面就會是你剛剛所選的主題
![Page setting](/Github-io個人網站架設/Settings.png)

# 使用第三方套件管理GitHub Pages

要使用的套件包含：Node.js, Git
安裝Node.js，在終端機上輸入`npm install -g hexo-cli`
之後建立資料夾，建構要寫部落格的環境。

```
hexo init [name]  # 初始化Blog資料夾
cd name           # 進入Blog資料架   #cd = change directory
npm install       # 安裝Hexo
npm install hexo-deployer-git --save  # 安裝 git 套件
```

環境這樣就建立完成了
---
接下來要建立與Github Pages的連結，畢竟現在只有在上面有個倉庫，本機端有個資料夾環境，兩者並沒有關聯。
那我們就需要進到_config.yml這個檔案進行參數的修改，主要要修改兩項，我建議使用vim或者Textedit等簡單軟體操作即可

1. 在URL底下，修改url: [your url]，把在建立倉庫pages的網址貼上去

2. 連動你的git，在最底下的deployment

```
# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: git
  repo: [url of your repository]
  branch: master  # 在你的倉庫頁面上會有寫分支名稱，通常是main或是master
```

之後進行存擋就完成連結囉！


## 第一次更新

一切準備就緒，我們試著把原本的GitHub Pages做一次更新，我們在終端機裡面輸入
```
hexo g       # g for generate, 你也可以輸入 hexo generate
hexo server  
```
之後可以在瀏覽器貼上`http://localhost:4000`，看看當前的部落格外觀，若確定沒問題，可以在終端機輸入

`hexo d  # d for deploy`
那檔案就會被輸出至你的GitHub repository，之後在你的網站上就可以看到更新完後的版本，上傳完後可能會需要等待一些時間才會看到變動。


![Welcom to Hexo](/Github-io個人網站架設/Hexo.png)


## 常用指令

```
hexo clean     # 清除生成檔案 
hexo generate  # 產生Blog檔案
hexo server    # 開啟伺服器預覽
hexo deploy    # 上傳至GitHub

hexo new [layout] [Title]      # 新增新文章 layout 可以選post/page/draft
hexo publish [layout] [Title]  # 移動或發布文章
```
更多指令跟內容可以參照[官網](https://hexo.io/zh-tw/)

下一篇內容會關於我所使用到的外掛以及喜歡的主題，這篇先到這裡。À bientôt.


