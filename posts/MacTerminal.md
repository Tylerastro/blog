---
title: MacOS Terminal
date: 2021-11-06 21:13:40
categories:
  - Notes
tags: 
  - MacOS
  - iTerm2
  - Terminal
---


在原始Terminal開發許久後，終於走向iTerm2的懷抱...
本篇文章含有大量沒碰過的知識面，瀏覽多方文章後寫下，希望成為自己的知識，~~如果換了筆電也可以快速回復設定~~。

![Final result](Final.png)

# Homebrew / wget

在安裝調教電腦之前，下載的工具要有，[Homebrew](https://brew.sh/index_zh-tw)，Homebrew 可以幫你安裝許多原本在MacOS上面沒有，但是很有用的東西，在官網上有詳細的說明了。
在安裝完homebrew之後，我們也可以安裝在linux系統上常看到的wget:`brew install wget`

當我們有工具之後，就可以準備調教自己的介面了💻

<!--more-->

# iTerm2

> 根據官方說法：身為Terminal的替代品以及iTerm的下一代，如果你花很多時間在終端機裡，你會發現iTerm2可以幫助你完成許多小事情。

對於剛接觸的人大概就會覺得iTerm2就是更帥的terminal而已，就像是我😂

## 安裝

<s>安裝iTerm2很簡單，如果接著前面有安裝好homebrew，那只需要在終端機輸入`brew cask install iterm2`即可安裝。</s>

> 2022.4.22 cask 已經deprecated 現在改使用`brew install --cask iterm2`

如果沒有homebrew，也可以在官網上面下載安裝檔，回來進行安裝。
剛裝完回來應該會發現怎麼醜醜的，沒有大家的好看，不要緊張，我們還需要再多安裝oh-my-zsh來美化一下。

## iTerm2 Font設定

在走到下一步之前，我們還需要在iTerm2裡面做設定，首先是字體，因為在不少主題裡面會運用到圖案，這些圖案在原本字體裡面是不存在的，比如說python, github等等的圖示，所以我們需要額外安裝字體。
```
git clone git://github.com/powerline/fonts ~/.powerline_fonts
cd ~/.powerline_fonts
./install.sh
```
安裝完也記得在Preference > Profile > Text > Font 去改字體設定，

## iTerm2 Color設定

在Preference > Profile > Color 底下有color presets，大量模板可以在[iTerm2-Color-Schemes repo](https://github.com/mbadolato/iTerm2-Color-Schemes#installation-instructions)找到，建議將整個clone下來，之後在color presets選取import，在資料夾底下的schemes挑喜歡的import。

我使用的是Tomorrow Night Eighties, 另外我覺得Solarized light也不錯，不過在淺色的訊息就可能看不到。

----

# oh-my-zsh

Oh-my-zsh 是一個zsh的framework，可以讓你的terminal看起來更舒適，更像專業的coder!

## 安裝

由於MacOS原生就是用zsh，所以這裡沒有特別安裝zsh。

```
# 安裝 zsh
brew install zsh

# 預設 zsh
sudo sh -c "echo $(which zsh) >> /etc/shells" 
chsh -s $(which zsh)

# 切換預設shell

chsh -s /bin/bash

chsh -s /usr/loacl/bin/zsh
```


安裝方法很簡單，在[oh-my-zsh](https://ohmyz.sh/#install)官網裡就有指令，看你是要用哪種方式安裝

```
# 擇一方式安裝即可
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
```

安裝完我們的步驟就快完成了

接下來就是要選擇好想要的主題，原本`/Users/tyler/.oh-my-zsh/themes`底下就已經安裝好許多主題，如果沒有打開隱藏檔案，`cmd + shift + .`即可開啟及關閉。 要改變主題以及細節，到`/Users/tyler/.zshrc`底下，`ZSH_THEME="robbyrussell"`，更改後方名稱即可。

但大部分人不會滿足於預配的主題會在外面找其他主題，底下也提供其他人推薦的spaceship, common, etc. 我個人最喜歡的是[powerlevel10k](https://github.com/romkatv/powerlevel10k#oh-my-zsh)，在過程中會自動幫你安裝字體，調整顯示方式等等，安裝方式在GitHub上面有。

 ```
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

# set
ZSH_THEME="powerlevel10k/powerlevel10k" in ~/.zshrc.
```
如果後來對於顯示還是不滿意，也可以直接`p10k configure`進行設定。



# Common commands

- To install oh-my-zsh 
```
wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh
sh install.sh
```
- To uninstall oh-my-zsh `uninstall_oh_my_zsh`
- Keep Conda environment `conda activate base`
- disable conda environment `conda deactivate`
- disable default conda environment `conda config --set auto_activate_base false`
- Apply zshrc setting `source ~/.zshrc`
- Search fonts `brew search nerd`
- install fonts `brew install [font_name]`


# References

- [spaceship theme repo](https://github.com/spaceship-prompt/spaceship-prompt)
- [powerlevel10k theme repo](https://github.com/romkatv/powerlevel10k#oh-my-zsh)
- [common theme repo](https://github.com/jackharrisonsherlock/common)
- [[Mac Setup] 讓你的開發速度大躍進的好工具們](https://medium.com/@jinghua.shih/mac-setup-讓你的開發速度大躍進-cd07fa327aaf)
- [macOS Setup Guide](https://sourabhbajaj.com/mac-setup/)
- [教練！我想要可愛的 iTerm2！](https://angela52799.medium.com/教練-我想要可愛的-iterm2-d9b598d8d087)
- [oh-my-zsh external themes repo wiki](https://github.com/ohmyzsh/ohmyzsh/wiki/External-themes)
- [iTerm2 設定與常用快捷鍵](https://myapollo.com.tw/zh-tw/iterm2-shortcut-keys/)
- [超簡單！十分鐘打造漂亮又好用的 zsh command line 環境](https://medium.com/statementdog-engineering/prettify-your-zsh-command-line-prompt-3ca2acc967f)
- [iTerm2](https://iterm2.com/features.html)
- [如何讓 Terminal 看起來好用又好看｜iTerms 2 + Oh-my-zsh 全攻略](https://medium.com/數據不止-not-only-data/macos-的-terminal-大改造-iterms-oh-my-zsh-全攻略-77d5aae87b10)
