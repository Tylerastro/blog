---
title: "重開/多Session無法吃到zsh-autosuggestions"
date: "2025-05-09"
tags:
  - oh my zsh
  - Bug Fix 
---

# tl;dr

狀況是裝完zsh-autosuggestions之後，只要重開terminal或是切tab會讀取不到過往歷史紀錄
那這篇文章可以解決這問題。

[Not remembering history past session#645](https://github.com/zsh-users/zsh-autosuggestions/issues/645)

# Issue

在設定新電腦時遇到zsh-autosuggestion無法讀到其他tab或過往紀錄。
查詢過issue後，zsh預設不會跨tab搜尋歷史，解決方法是在zshrc(bashrc)底下新增這段

```bash
# inside .zshrc
setopt APPEND_HISTORY
setopt SHARE_HISTORY
HISTFILE=$HOME/.zhistory
SAVEHIST=1000
HISTSIZE=999
setopt HIST_EXPIRE_DUPS_FIRST
setopt EXTENDED_HISTORY
```

重新啟動Terminal之後就會讀取到zhistory了
