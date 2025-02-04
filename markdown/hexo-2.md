---
title: Hexo token update
tags:
  - Basics
categories:
  - Notes
date: 2023-04-02 18:57:27
preview: 在上一篇[Github.io個人網站架設](https://tylerastro.github.io/2021/07/27/Github-io個人網站架設/)中提到在config裡面設定的部分，在Github對於權限更改，廢除使用username以及password的方式，而改使用token作為驗證方式。
---


在上一篇[Github.io個人網站架設](https://tylerastro.github.io/2021/07/27/Github-io個人網站架設/)中提到在config裡面設定的部分，在Github對於權限更改，廢除使用username以及password的方式，而改使用token作為驗證方式。

在github裡面的settings，使用Personal token來產生一組金鑰，接著在config裡面改用環境變數帶入金鑰。
接著更改你的環境變數，如果是使用bash則在.bashrc裡新增`export HEXO="TOKEN"`

```bash
# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: git
  repo: https://github.com/Tylerastro/Tylerastro.github.io
  branch: main
  github-token: $HEXO

```


然而我想提出的是如果是Apple用戶，很大機率使用Keychain的服務作為金鑰儲存，如果以上方法失敗，可以到Keychain手動更改github的密碼，挑選kind為internet的密碼做更改，就可以成功更新金鑰密碼了。